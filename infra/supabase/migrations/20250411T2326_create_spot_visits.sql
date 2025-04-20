-- テーブル定義
CREATE TABLE spot_visits (
    id TEXT PRIMARY KEY,
    user_id UUID NOT NULL,
    spot_id TEXT NOT NULL,
    represent_guide_id TEXT,
    taken_photo_storage_path TEXT,
    prev_spot_id TEXT,
    time_gap_minutes INTEGER,
    min_version_major INTEGER NOT NULL,
    max_version_major INTEGER NOT NULL,
    created_at TIMESTAMPTZ NOT NULL,
    updated_at TIMESTAMPTZ NOT NULL,
    lock_no INTEGER NOT NULL,
    FOREIGN KEY (spot_id) REFERENCES ext_spots(id),
    FOREIGN KEY (represent_guide_id) REFERENCES spot_guides(id),
    FOREIGN KEY (prev_spot_id) REFERENCES ext_spots(id)
);

-- インデックス（用途に応じて）
CREATE INDEX idx_spot_visits_user_id ON spot_visits(user_id);
CREATE INDEX idx_spot_visits_spot_id ON spot_visits(spot_id);
CREATE INDEX idx_spot_visits_represent_guide_id ON spot_visits(represent_guide_id);
CREATE INDEX idx_spot_visits_prev_spot_id ON spot_visits(prev_spot_id);

-- テーブルコメント
COMMENT ON TABLE spot_visits IS 'ユーザーによるスポット訪問ログを記録するテーブル';

-- カラムコメント
COMMENT ON COLUMN spot_visits.id IS '訪問ログの一意なID（UUID）';
COMMENT ON COLUMN spot_visits.user_id IS '訪問したユーザーのID';
COMMENT ON COLUMN spot_visits.spot_id IS '訪問されたスポットID';
COMMENT ON COLUMN spot_visits.represent_guide_id IS '当該訪問時に利用されたガイドID';
COMMENT ON COLUMN spot_visits.taken_photo_storage_path IS '撮影された写真の保存パス';
COMMENT ON COLUMN spot_visits.prev_spot_id IS '直前に訪問したスポットID（移動経路把握用）';
COMMENT ON COLUMN spot_visits.time_gap_minutes IS '直前スポットからの経過時間（分）';
COMMENT ON COLUMN spot_visits.min_version_major IS '表示対象となる最小クライアントバージョン';
COMMENT ON COLUMN spot_visits.max_version_major IS '表示対象となる最大クライアントバージョン';
COMMENT ON COLUMN spot_visits.created_at IS '訪問ログ作成日時';
COMMENT ON COLUMN spot_visits.updated_at IS '最終更新日時';
COMMENT ON COLUMN spot_visits.lock_no IS '楽観ロック用バージョン番号';
