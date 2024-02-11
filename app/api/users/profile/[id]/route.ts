import { NextRequest } from 'next/server';
import User from '@/shared/models/user.model';
import { EditorSettings } from '@/utils/useUserData';
import parseJSON from '@/shared/utils/parseJSON';
import { generateToken } from '@/shared/utils/generateToken';

type EditorSettingsKeys = keyof EditorSettings;
type UserUpdateFields = {
  hasUnreadNotifications?: boolean;
  username?: string;
  email?: string;
  password?: string;
  editorSettings?: Partial<EditorSettings>;
};
export async function PUT(req: NextRequest) {
  if (req.method !== 'PUT') {
    return new Response(null, {
      status: 405,
      headers: {
        Allow: 'PUT',
      },
    });
  }

  if (!req.body) {
    return new Response(JSON.stringify({ message: 'No request body' }), {
      status: 400,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
  const requestBody: UserUpdateFields = await parseJSON(req.body);
  console.log('requestBody', requestBody);

  try {
    const userId = req.nextUrl.pathname.split('/').pop();
    const user = await User.findById(userId);

    if (!user) {
      return new Response(JSON.stringify({ message: 'User not found' }), {
        status: 404,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }

    user.username = requestBody.username || user.username;
    user.email = requestBody.email || user.email;
    if ('hasUnreadNotifications' in requestBody) {
      user.hasUnreadNotifications = requestBody.hasUnreadNotifications!;
    }

    // Update editor settings
    if (requestBody.editorSettings) {
      Object.entries(requestBody.editorSettings).forEach(([key, value]) => {
        if (key in user.editorSettings) {
          const settingKey = key as EditorSettingsKeys;
          user.editorSettings[settingKey] = value as never;
        }
      });
    }

    const updatedUser = await user.save();

    return new Response(
      JSON.stringify({
        message: 'User updated successfully',
        user: {
          didUpload: updatedUser.didUpload,
          id: updatedUser._id,
          username: updatedUser.username,
          email: updatedUser.email,
          isAdmin: updatedUser.isAdmin,
          editorSettings: updatedUser.editorSettings,
          token: generateToken(updatedUser._id),
          hasUnreadNotifications: updatedUser.hasUnreadNotifications,
        },
      }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ message: 'Internal Server Error' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}
