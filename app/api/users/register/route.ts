import sanitize from "mongo-sanitize";
import { NextRequest } from "next/server";
import parseJSON from "@/shared/utils/parseJSON";
import { validateRegisterInput } from "@/shared/models/validations/user.validation";
import UserService from "@/shared/services/user.service";
import { generateToken } from "@/shared/utils/generateToken";
import TokenService from "@/shared/services/token.service";
import EmailService from "@/shared/services/email.service";
import connectDB from "@/db/mongo";

export async function POST(req: NextRequest) {
  if (req.method !== "POST") {
    return new Response(null, {
      status: 405,
      headers: {
        Allow: "POST",
      },
    });
  }

  const requestBody = await parseJSON(req.body!);

  await connectDB();

  // Validate Register input
  const { error } = validateRegisterInput(requestBody);
  if (error) {
    return new Response(JSON.stringify({ message: error.details[0].message }), {
      status: 400,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  let sanitizedInput = sanitize<{
    username: string;
    password: string;
    email: string;
  }>(requestBody);

  try {
    let user = await UserService.findUserBy(
      "username",
      sanitizedInput.username.toLowerCase(),
    );

    if (user) {
      return new Response(
        JSON.stringify({
          message: "Username already taken. Please choose a different username",
        }),
        {
          status: 400,
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
    }

    user = await UserService.findUserBy(
      "email",
      sanitizedInput.email.toLowerCase(),
    );

    if (user) {
      return new Response(
        JSON.stringify({
          message:
            "Email is already registered. Please choose a different email",
        }),
        {
          status: 400,
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
    }

    const newUser = UserService.createUser(sanitizedInput);
    await UserService.setUserPassword(newUser, newUser.password);

    newUser.token = generateToken(newUser._id);

    await UserService.saveUser(newUser);
    const verificationToken = TokenService.createToken();

    TokenService.setUserId(verificationToken, newUser._id);
    await TokenService.saveToken(verificationToken);

    const verificationEmail = EmailService.createVerificationEmail(
      newUser.email,
      verificationToken.token,
    );

    try {
      await EmailService.sendEmail(verificationEmail);
      return new Response(
        JSON.stringify({
          message:
            "A verification email has been sent. Please check your spam folder if you do not see it in your inbox.",
          _id: newUser._id,
        }),
        {
          status: 200,
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
    } catch (error) {
      await UserService.deleteUserById(newUser._id);

      return new Response(
        JSON.stringify({
          message: `Impossible to send an email to ${newUser.email}, try again. Our service may be down.`,
        }),
        {
          status: 503,
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
    }
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({
        message: "An unexpected error occurred",
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
  }
}
