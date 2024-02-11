import { NextRequest } from 'next/server';
import TestFile from '@/shared/models/testfile.model';
import { getObjectFromS3 } from '@/shared/utils/s3';
import { bucketNameForTestFiles } from '@/shared/types/s3';

export async function GET(req: NextRequest) {
  if (req.method !== 'GET') {
    return new Response(null, {
      status: 405,
      headers: {
        Allow: 'GET',
      },
    });
  }

  try {
    const userId = req.nextUrl.pathname.split('/').pop();
    const testFile = await TestFile.findOne({ user: userId }).sort({ createdAt: -1 }).exec();

    if (!testFile) {
      return new Response(JSON.stringify({ message: 'No tests found for this user.' }), {
        status: 404,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }

    const testFileContent = await getObjectFromS3(bucketNameForTestFiles, testFile.s3Key);

    return new Response(JSON.stringify({ code: testFileContent }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error: any) {
    console.error(error);
    return new Response(JSON.stringify({ message: error.message }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}
