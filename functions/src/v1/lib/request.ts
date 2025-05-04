import { Request } from "firebase-functions/v2/https";
import { Response } from "express";
import { ZodIssue } from "zod";
import { logBackendEvent } from "./logger";

/**
 * 🛑 リクエストのバリデーションエラーをログに記録し、HTTP 400エラーとリクエストIDを返す。
 *
 * @param req - Expressのリクエストオブジェクト
 * @param res - Expressのレスポンスオブジェクト
 * @param requestId - トレースID
 * @param functionName - 処理中だった関数名
 * @param userId - ユーザーID（認証済みユーザー）
 * @param zodIssues - Zodのエラー内容
 */
export const handleInvalidRequest = ({
	req,
	res,
	requestId,
	functionName,
	userId,
	zodIssues,
}: {
	req: Request;
	res: Response;
	requestId: string;
	functionName: string;
	userId: string;
	zodIssues: ZodIssue[];
}): void => {
	logBackendEvent({
		event_name: "invalidRequest",
		error_level: "error",
		function_name: functionName,
		user_id: userId,
		payload: {
			payload: Object.keys(req.query).length ? req.query : req.body,
			zodIssues: zodIssues.map((issue) => ({
				code: issue.code,
				message: issue.message,
				path: issue.path,
			})),
		},
		request_id: requestId,
	});
	res.status(400).json({ error: "Invalid request", zodIssues, requestId });
};
