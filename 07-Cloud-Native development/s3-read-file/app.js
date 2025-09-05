import {S3Client, GetObjectCommand} from "@aws-sdk/client-s3";
import dotenv from "dotenv";
dotenv.config();

// Configure the S3 client
const s3 = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
});

// Helper to convert stream to string
async function streamToString(stream) {
    return new Promise((resolve, reject) => {
        const chunks = [];
        stream.on("data", (chunk) => chunks.push(chunk));
        stream.on("error", reject);
        stream.on("end", () => resolve(Buffer.concat(chunks).toString("utf-8")));
    });
}

async function readFileFromS3(bucketName, key) {
    try {
        const command = new GetObjectCommand({
            Bucket: bucketName,
            Key: key,
        });

        const response = await s3.send(command);

        // response.Body is a stream
        const bodyContents = await streamToString(response.Body);

        console.log("File contents:\n", bodyContents);
        return bodyContents;
    } catch (err) {
        console.error("Error reading file from S3:", err);
    }
}

// Example usage
readFileFromS3(process.env.AWS_BUCKET_NAME, "questions.json");
