#!/bin/bash

set -a
source functions/.env
set +a

if [ -z "$DB_SCHEMA" ]; then
  echo "❌ DB_SCHEMA is not set in functions/.env"
  exit 1
fi

echo "🧨 Dropping schema: $DB_SCHEMA"
psql "$DATABASE_URL" <<EOF
DROP SCHEMA IF EXISTS $DB_SCHEMA CASCADE;
CREATE SCHEMA $DB_SCHEMA;
EOF

echo "✅ Schema $DB_SCHEMA has been reset."
