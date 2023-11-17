import { S3Client } from "@aws-sdk/client-s3";
import config from "../../config";

export const s3Cient = new S3Client({
  region: config.aws.awsRegion as string,
  credentials: {
    accessKeyId: config.aws.awsAccessKeyId as string,
    secretAccessKey: config.aws.awsSecretAccessKey as string,
  },
});
