#!/bin/bash

set -a
source functions/.env
set +a

if [ -z "$DB_SCHEMA" ]; then
  echo "❌ DB_SCHEMA is not set"
  exit 1
fi

if [ $# -eq 0 ]; then
  echo "❌ No migration files specified."
  echo "Usage: DB_SCHEMA=dev bash scripts/apply-migration.sh file1.sql file2.sql ..."
  exit 1
fi

for FILE in "$@"; do
  if [ ! -f "$FILE" ]; then
    echo "❌ File not found: $FILE"
    exit 1
  fi

  echo "📄 Applying: $FILE (schema: $DB_SCHEMA)"
  psql "$DATABASE_URL" <<EOF
CREATE SCHEMA IF NOT EXISTS $DB_SCHEMA;
SET search_path TO $DB_SCHEMA;
\i $FILE
EOF
done
