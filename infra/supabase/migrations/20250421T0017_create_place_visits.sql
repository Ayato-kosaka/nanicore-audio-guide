-- テーブル定義
CREATE TABLE place_visits (
    id TEXT PRIMARY KEY,
    user_id UUID NOT NULL,
    place_id TEXT NOT NULL,
    represent_guide_id TEXT,
    taken_photo_storage_path TEXT,
    prev_place_id TEXT,
    time_gap_minutes INTEGER,
    min_version_major INTEGER NOT NULL,
    max_version_major INTEGER NOT NULL,
    created_at TIMESTAMPTZ NOT NULL,
    updated_at TIMESTAMPTZ NOT NULL,
    lock_no INTEGER NOT NULL,
    FOREIGN KEY (place_id) REFERENCES ext_places(id),
    FOREIGN KEY (represent_guide_id) REFERENCES place_guides(id),
    FOREIGN KEY (prev_place_id) REFERENCES ext_places(id)
);

-- インデックス（用途に応じて）
CREATE INDEX idx_place_visits_user_id ON place_visits(user_id);
CREATE INDEX idx_place_visits_place_id ON place_visits(place_id);
CREATE INDEX idx_place_visits_represent_guide_id ON place_visits(represent_guide_id);
CREATE INDEX idx_place_visits_prev_place_id ON place_visits(prev_place_id);
CREATE INDEX idx_place_visits_min_version_major ON place_visits(min_version_major);
CREATE INDEX idx_place_visits_max_version_major ON place_visits(max_version_major);

-- テーブルコメント
COMMENT ON TABLE place_visits IS 'ユーザーによる場所訪問ログを記録するテーブル';

-- カラムコメント
COMMENT ON COLUMN place_visits.id IS '訪問ログの一意なID（UUID）';
COMMENT ON COLUMN place_visits.user_id IS '訪問したユーザーのID';
COMMENT ON COLUMN place_visits.place_id IS '訪問された場所ID';
COMMENT ON COLUMN place_visits.represent_guide_id IS '当該訪問時に利用されたガイドID';
COMMENT ON COLUMN place_visits.taken_photo_storage_path IS '撮影された写真の保存パス';
COMMENT ON COLUMN place_visits.prev_place_id IS '直前に訪問した場所ID（移動経路把握用）';
COMMENT ON COLUMN place_visits.time_gap_minutes IS '直前場所からの経過時間（分）';
COMMENT ON COLUMN place_visits.min_version_major IS '表示対象となる最小クライアントバージョン';
COMMENT ON COLUMN place_visits.max_version_major IS '表示対象となる最大クライアントバージョン';
COMMENT ON COLUMN place_visits.created_at IS '訪問ログ作成日時';
COMMENT ON COLUMN place_visits.updated_at IS '最終更新日時';
COMMENT ON COLUMN place_visits.lock_no IS '楽観ロック用バージョン番号';

-- RLS有効化
ALTER TABLE place_visits ENABLE ROW LEVEL SECURITY;

-- 認証ユーザーのみ SELECT を許可（自分のデータのみ）
CREATE POLICY "Authenticated users can get their own place_visits"
    ON place_visits
    FOR SELECT
    TO authenticated
    USING (auth.uid() = user_id);

-- 認証ユーザーのみ INSERT を許可（自分のデータのみ）
CREATE POLICY "Authenticated users can insert their own place_visits"
    ON place_visits
    FOR INSERT
    TO authenticated
    WITH CHECK (auth.uid() = user_id);

-- 認証ユーザーのみ UPDATE を許可（自分のデータのみ）
CREATE POLICY "Authenticated users can update their own place_visits"
    ON place_visits
    FOR UPDATE
    TO authenticated
    USING (auth.uid() = user_id)
    WITH CHECK (auth.uid() = user_id);

-- 他操作は許可しない（ポリシー定義なし = 拒否）
