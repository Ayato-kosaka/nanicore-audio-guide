-- reactions テーブルの RLS ポリシー追加
-- 認証ユーザーのみ SELECT を許可（自分のデータのみ）
CREATE POLICY "Authenticated users can get their own reactions"
    ON reactions
    FOR SELECT
    TO authenticated
    USING (auth.uid() = user_id);