-- ENUM型定義（データ取得元の種別）
CREATE TYPE ext_places_vision_detection_type AS ENUM ('LANDMARK_DETECTION', 'WEB_DETECTION');

-- テーブル定義
CREATE TABLE ext_places (
    id TEXT PRIMARY KEY,
    vision_detection_type ext_places_vision_detection_type,
    title TEXT NOT NULL,
    image_url TEXT,
    landmark_latitude DOUBLE PRECISION,
    landmark_longitude DOUBLE PRECISION,
    is_recommendable BOOLEAN NOT NULL,
    created_at TIMESTAMPTZ NOT NULL,
    lock_no INTEGER NOT NULL
);

-- インデックス（用途に応じて）
CREATE INDEX idx_ext_places_landmark_latitude ON ext_places(landmark_latitude);
CREATE INDEX idx_ext_places_landmark_longitude ON ext_places(landmark_longitude);

-- テーブルコメント
COMMENT ON TABLE ext_places IS '外部API経由で登録される、観光地・絵画等そのもののマスタ';

-- カラムコメント
COMMENT ON COLUMN ext_places.id IS '場所の一意なサロゲートID（Google Vision APIのentityIdやmidを利用）';
COMMENT ON COLUMN ext_places.vision_detection_type IS 'データ取得元の種別（Google Vision の feature type.）';
COMMENT ON COLUMN ext_places.title IS '場所名（多言語対応なし）';
COMMENT ON COLUMN ext_places.image_url IS '場所画像のURL（外部公開用）';
COMMENT ON COLUMN ext_places.landmark_latitude IS '場所の緯度（Google Visionのランドマーク情報）';
COMMENT ON COLUMN ext_places.landmark_longitude IS '場所の経度（Google Visionのランドマーク情報）';
COMMENT ON COLUMN ext_places.is_recommendable IS 'レコメンド対象とするかのフラグ';
COMMENT ON COLUMN ext_places.created_at IS '場所の作成日時';
COMMENT ON COLUMN ext_places.lock_no IS '楽観ロック用バージョン番号';

-- RLS 有効化
ALTER TABLE ext_places ENABLE ROW LEVEL SECURITY;
