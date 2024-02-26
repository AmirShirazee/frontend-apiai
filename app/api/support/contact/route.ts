import type { NextRequest } from "next/server";
import parseJSON from "@/shared/utils/parseJSON";
import emailServices, { sendEmail } from "@/shared/services/email.service";

export async function POST(req: NextRequest) {
  if (req.method !== "POST") {
    return new Response(null, {
      status: 405,
      headers: {
        Allow: "POST",
      },
    });
  }

  try {
    const formData = await parseJSON(req.body!);
    const inquiryEmail = emailServices.createHelpCenterInquiryEmail(
      "info@testopenapi.com",
      formData,
    );
    await sendEmail(inquiryEmail);

    return new Response(
      JSON.stringify({
        status: "success",
        message: "Your inquiry has been received and will be processed.",
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({
        status: "error",
        message: "An error occurred while processing your inquiry.",
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
