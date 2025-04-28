
import * as fs from 'fs/promises';
import path from 'path';
import { bucket, generateSignedUrl } from '../lib/storage';

export async function setupGoogleCredentials() {
    if (!process.env.GOOGLE_APPLICATION_CREDENTIALS && process.env.FUNCTIONS_DEV_GCP_SERVICE_ACCOUNT_BASE64) {
        const decoded = Buffer.from(process.env.FUNCTIONS_DEV_GCP_SERVICE_ACCOUNT_BASE64, 'base64').toString('utf-8');
        const credentialsDir = path.resolve(__dirname, '../../../.tmp/credentials');
        const credentialsPath = path.join(credentialsDir, 'service-account.json');

        await fs.mkdir(credentialsDir, { recursive: true });
        await fs.writeFile(credentialsPath, decoded, 'utf8');

        process.env.GOOGLE_APPLICATION_CREDENTIALS = credentialsPath;
        console.log(`🔑 GOOGLE_APPLICATION_CREDENTIALS has been set: ${credentialsPath}`);
    }
}

export const outputJson = async (data: any, filename: string) => {
    const outputDir = path.resolve(__dirname, '../outputs');
    await fs.mkdir(outputDir, { recursive: true });
    const filePath = path.join(outputDir, filename);
    await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf8');
    console.log(`✅ Results written to: ${filePath}`);
};

export const importJson = async (filename: string) => {
    const outputDir = path.resolve(__dirname, '../outputs');
    const filePath = path.join(outputDir, filename);
    const rawJson = await fs.readFile(filePath, 'utf8');
    const rawResults = JSON.parse(rawJson);
    return (rawResults);
};

export const fetchImagesFromGCS = async (dirPath: string): Promise<string[]> => {
    const [files] = await bucket.getFiles({ prefix: dirPath });
    return Promise.all(files
        .filter(file => file.name.match(/\.(jpg|jpeg|png)$/i))
        .map(file => generateSignedUrl(file.name)));
};

export const execute = async (fn: () => Promise<any>) => {
    await setupGoogleCredentials();
    await fn();
}