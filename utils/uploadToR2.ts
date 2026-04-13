import { PutObjectCommand } from "@aws-sdk/client-s3";
import { r2 } from "@/lib/r2";

export async function uploadToR2(file: File): Promise<string> {
  const extension = file.name.split(".").pop();
  const key = `reportes/${Date.now()}-${Math.random().toString(36).slice(2)}.${extension}`;
  const buffer = Buffer.from(await file.arrayBuffer());

  await r2.send(
    new PutObjectCommand({
      Bucket: process.env.CLOUDFLARE_R2_BUCKET_NAME!,
      Key: key,
      Body: buffer,
      ContentType: file.type,
    }),
  );

  return `${process.env.CLOUDFLARE_R2_PUBLIC_URL}/${key}`;
}
