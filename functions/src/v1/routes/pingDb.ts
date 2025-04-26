import { prisma } from '../lib/prisma';
import { onRequest } from 'firebase-functions/v2/https';


export const pingDb = onRequest(async (req, res) => {
    const start = Date.now();
    try {
        // 超単純なクエリ：適当なテーブルのレコード1件だけ取る
        const result = await prisma.spot_guides.findFirst({
            select: { id: true },
        });

        const duration = Date.now() - start;
        console.log(`DB ping took ${duration}ms`);

        res.status(200).json({
            message: 'DB ping success',
            result,
            durationMs: duration,
        });
    } catch (error) {
        console.error('DB ping error', error);
        res.status(500).json({ error: String(error) });
    }
});
