-- テーブル定義
CREATE TABLE spot_guides (
    id TEXT PRIMARY KEY,
    spot_id TEXT NOT NULL,
    language_tag TEXT NOT NULL,
    title TEXT NOT NULL,
    manuscript TEXT NOT NULL,
    audio_storage_path TEXT NOT NULL,
    tags TEXT[] NOT NULL,
    price_amount NUMERIC(10,2) NOT NULL,
    currency TEXT,
    recommendation_weight INTEGER NOT NULL,
    min_version_major INTEGER NOT NULL,
    max_version_major INTEGER NOT NULL,
    created_user UUID NOT NULL,
    created_at TIMESTAMPTZ NOT NULL,
    created_request_id TEXT NOT NULL,
    lock_no INTEGER NOT NULL,
    FOREIGN KEY (spot_id) REFERENCES ext_spots(id)
);

-- インデックス
CREATE INDEX idx_spot_guides_spot_id ON spot_guides(spot_id);
CREATE INDEX idx_spot_guides_language_tag ON spot_guides(language_tag);
CREATE INDEX idx_spot_guides_recommendation_weight ON spot_guides(recommendation_weight);

-- テーブルコメント
COMMENT ON TABLE spot_guides IS '各スポットに対する多言語対応の音声ガイド情報を格納するテーブル';

-- カラムコメント
COMMENT ON COLUMN spot_guides.id IS 'ガイドの一意なID（UUID）';
COMMENT ON COLUMN spot_guides.spot_id IS '紐づくスポットID';
COMMENT ON COLUMN spot_guides.language_tag IS 'ガイドの言語タグ（IETF BCP 47準拠、例：en-US, ja-JP）';
COMMENT ON COLUMN spot_guides.title IS 'ガイドタイトル（UI上での表示名）';
COMMENT ON COLUMN spot_guides.manuscript IS 'ガイドの本文テキスト';
COMMENT ON COLUMN spot_guides.audio_storage_path IS '音声ファイルの保存パス（Text-to-Speechなどで生成）';
COMMENT ON COLUMN spot_guides.tags IS 'ガイドに付与されるジャンル・属性タグ';
COMMENT ON COLUMN spot_guides.price_amount IS 'ガイドの価格（税抜き、通貨単位なし）';
COMMENT ON COLUMN spot_guides.currency IS 'ガイドの通貨コード（ISO 4217）';
COMMENT ON COLUMN spot_guides.recommendation_weight IS 'レコメンドロジック用の重みスコア';
COMMENT ON COLUMN spot_guides.min_version_major IS '表示対象となる最小クライアントバージョン';
COMMENT ON COLUMN spot_guides.max_version_major IS '表示対象となる最大クライアントバージョン';
COMMENT ON COLUMN spot_guides.created_user IS 'ガイド作成者（デフォルト生成ガイドの場合は usr_id_for_system）';
COMMENT ON COLUMN spot_guides.created_at IS 'ガイド作成日時';
COMMENT ON COLUMN spot_guides.created_request_id IS 'このガイドを作成した処理単位のトレースID';
COMMENT ON COLUMN spot_guides.lock_no IS '楽観ロック用バージョン番号';
