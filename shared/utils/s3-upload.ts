import { PutObjectCommand, PutObjectCommandOutput } from '@aws-sdk/client-s3';
import { s3Client } from '@/shared/utils/s3-client';

// Define an interface for the function parameters
interface UploadFileParams {
  Filename: string;
  Body: string | Blob | Buffer | Uint8Array | ReadableStream<any>; // Adjust based on your input types
  CacheControl?: string; // Optional parameter
}

// The function is async, so it returns a Promise. Specify the type of data it resolves to.
export const uploadFile = async ({
  Filename,
  Body,
  CacheControl = 'max-age=15557000, stale-if-error=31536000',
}: UploadFileParams): Promise<PutObjectCommandOutput | void> => {
  let Key = Filename;

  const bucketParams = {
    Bucket: process.env.AWS_S3_BUCKET,
    Key,
    Body,
    CacheControl,
  };

  try {
    const data = await s3Client.send(new PutObjectCommand(bucketParams));

    if (!data) {
      throw new Error('Error uploading file');
    }
    return data;
  } catch (error) {
    console.error(error);
  }
};
