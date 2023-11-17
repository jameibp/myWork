import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { s3Cient } from "./client";
import { PutObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3";

const S3Service = {
  getPutUrl: async (key: string, contentType: string) => {
    const command = new PutObjectCommand({
      Bucket: "mywork-portal-test",
      Key: key,
      ContentType: contentType,
    });
    const url = await getSignedUrl(s3Cient, command, { expiresIn: 300 });
    return url;
  },
  getReadUrl: async (key: string) => {
    const command = new GetObjectCommand({
      Bucket: "mywork-portal-test",
      Key: key,
    });
    const url = await getSignedUrl(s3Cient, command);
    return url;
  },
};

export default S3Service;
