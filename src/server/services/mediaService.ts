import { Types } from 'mongoose';
import { connectToDatabase } from '@/lib/mongodb';
import MediaAsset, { type MediaType, type MediaRefType } from '@/models/MediaAsset';

export interface RecordAssetInput {
  publicId: string;
  url: string;
  secureUrl: string;
  type?: MediaType | undefined;
  width?: number | undefined;
  height?: number | undefined;
  bytes?: number | undefined;
  folder?: string | undefined;
  refType?: MediaRefType | undefined;
  refId?: string | undefined;
}

export async function recordAsset(input: RecordAssetInput, userId?: string) {
  await connectToDatabase();
  const doc = await MediaAsset.create({
    publicId: input.publicId,
    url: input.url,
    secureUrl: input.secureUrl,
    type: input.type ?? 'image',
    width: input.width,
    height: input.height,
    bytes: input.bytes,
    folder: input.folder,
    refType: input.refType,
    refId: input.refId ? new Types.ObjectId(input.refId) : undefined,
    uploadedBy: userId ? new Types.ObjectId(userId) : undefined,
  });
  return doc.toObject();
}
