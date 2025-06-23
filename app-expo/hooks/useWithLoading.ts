import { useCallback, useState } from "react";

/**
 * 🎯 非同期処理にローディング状態を付与するカスタムフック。
 *
 * - `withLoading(fn)` に非同期関数を渡すと、実行中は `isLoading` が true になる。
 * - ボタンの二重押し防止やスピナー表示の制御に使用。
 *
 * @example
 * const { isLoading, withLoading } = useWithLoading();
 * const handleSubmit = withLoading(async () => { ... });
 *
 * <Button onPress={handleSubmit} disabled={isLoading} />
 *
 * @returns ローディング状態と処理ラッパー関数を返す
 */
export const useWithLoading = () => {
	const [isLoading, setIsLoading] = useState(false);

	/**
	 * 与えられた非同期処理をラップし、前後でローディング状態を制御する。
	 *
	 * @param fn - 実行したい Promise ベースの非同期関数
	 * @returns ラップされた async 関数
	 */
	const withLoading = useCallback(
		<Args extends any[], ReturnType>(
			fn: (...args: Args) => Promise<ReturnType>
		): ((...args: Args) => Promise<ReturnType>) => {
			return async (...args: Args): Promise<ReturnType> => {
				setIsLoading(true);
				try {
					return await fn(...args);
				} finally {
					setIsLoading(false);
				}
			};
		},
		[]
	);

	return { isLoading, withLoading };
};
