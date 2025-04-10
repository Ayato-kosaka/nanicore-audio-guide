-- Create table: m_spots
CREATE TABLE IF NOT EXISTS m_spots (
  id TEXT PRIMARY KEY,
  source_type TEXT,
  title TEXT,
  image_url TEXT NOT NULL,
  landmark_latitude DOUBLE PRECISION NOT NULL,
  landmark_longitude DOUBLE PRECISION NOT NULL,
  is_recommendable BOOLEAN,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  lock_no INTEGER NOT NULL
);

-- Index on landmark_latitude
CREATE INDEX IF NOT EXISTS idx_m_spots_latitude ON m_spots (landmark_latitude);

-- Index on landmark_longitude
CREATE INDEX IF NOT EXISTS idx_m_spots_longitude ON m_spots (landmark_longitude);
