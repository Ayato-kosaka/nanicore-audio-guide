-- ENUM型定義（データ取得元の種別）
CREATE TYPE ext_spots_source_type AS ENUM ('LANDMARK_DETECTION', 'WEB_DETECTION');

-- テーブル定義
CREATE TABLE ext_spots (
    id TEXT PRIMARY KEY,
    source_type ext_spots_source_type NOT NULL,
    title TEXT NOT NULL,
    image_url TEXT NOT NULL,
    landmark_latitude DOUBLE PRECISION NOT NULL,
    landmark_longitude DOUBLE PRECISION NOT NULL,
    is_recommendable BOOLEAN NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    lock_no INTEGER NOT NULL DEFAULT 0
);

-- インデックス（用途に応じて）
CREATE INDEX idx_ext_spots_landmark_latitude ON ext_spots(landmark_latitude);
CREATE INDEX idx_ext_spots_landmark_longitude ON ext_spots(landmark_longitude);

-- テーブルコメント
COMMENT ON TABLE ext_spots IS '外部API経由で登録される、観光地・絵画等そのもののマスタ';

-- カラムコメント
COMMENT ON COLUMN ext_spots.id IS 'スポットの一意なサロゲートID（Google Vision APIのentityIdやmidを利用）';
COMMENT ON COLUMN ext_spots.source_type IS 'データ取得元の種別（例：VisionAPI, Wikipedia）';
COMMENT ON COLUMN ext_spots.title IS 'スポット名（多言語対応なし）';
COMMENT ON COLUMN ext_spots.image_url IS 'スポット画像のURL（外部公開用）';
COMMENT ON COLUMN ext_spots.landmark_latitude IS 'スポットの緯度（Google Visionのランドマーク情報）';
COMMENT ON COLUMN ext_spots.landmark_longitude IS 'スポットの経度（Google Visionのランドマーク情報）';
COMMENT ON COLUMN ext_spots.is_recommendable IS 'レコメンド対象とするかのフラグ';
COMMENT ON COLUMN ext_spots.created_at IS 'スポットの作成日時';
COMMENT ON COLUMN ext_spots.lock_no IS '楽観ロック用バージョン番号';
