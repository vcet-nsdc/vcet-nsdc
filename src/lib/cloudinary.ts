import { v2 as cloudinary } from 'cloudinary';

let configured = false;

/** Returns a configured Cloudinary client, or throws if env is missing. */
export function getCloudinary() {
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;

  if (!cloudName || !apiKey || !apiSecret) {
    throw new Error('Cloudinary is not configured (CLOUDINARY_* env vars missing).');
  }

  if (!configured) {
    cloudinary.config({ cloud_name: cloudName, api_key: apiKey, api_secret: apiSecret });
    configured = true;
  }
  return cloudinary;
}

export interface SignedUpload {
  signature: string;
  timestamp: number;
  apiKey: string;
  cloudName: string;
  folder: string;
}

/**
 * Produce a signed upload payload the browser uses to upload DIRECTLY to
 * Cloudinary (the file never passes through our server).
 */
export function signUpload(folder: string): SignedUpload {
  const c = getCloudinary();
  const timestamp = Math.round(Date.now() / 1000);
  const signature = c.utils.api_sign_request(
    { timestamp, folder },
    process.env.CLOUDINARY_API_SECRET as string
  );
  return {
    signature,
    timestamp,
    apiKey: process.env.CLOUDINARY_API_KEY as string,
    cloudName: process.env.CLOUDINARY_CLOUD_NAME as string,
    folder,
  };
}
