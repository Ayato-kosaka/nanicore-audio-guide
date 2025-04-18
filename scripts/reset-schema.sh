#!/bin/bash

set -e
set -a
source functions/.env
set +a

if [ -z "$DB_SCHEMA" ]; then
  echo "❌ DB_SCHEMA is not set in functions/.env"
  exit 1
fi

echo "🧨 Dropping Table, FUNCTION, INDEX, ENUM: $DB_SCHEMA"

# 🚫 psql 用に `?pgbouncer=true` を除外
PSQL_DATABASE_URL=$(echo "$DATABASE_URL" | sed 's/[?&]pgbouncer=true//g')

psql "$PSQL_DATABASE_URL" <<EOF
-- 🔥 1. テーブル（依存も含めて CASCADE）
DO \$\$ DECLARE
    r RECORD;
BEGIN
    FOR r IN (
        SELECT tablename FROM pg_tables WHERE schemaname = '$DB_SCHEMA'
    ) LOOP
        EXECUTE format('DROP TABLE IF EXISTS %I.%I CASCADE', '$DB_SCHEMA', r.tablename);
    END LOOP;
END \$\$;

-- 🔥 2. 関数（引数なし限定）
DO \$\$ DECLARE
    r RECORD;
BEGIN
    FOR r IN (
        SELECT routine_name
        FROM information_schema.routines
        WHERE routine_schema = '$DB_SCHEMA'
    ) LOOP
        EXECUTE format('DROP FUNCTION IF EXISTS %I.%I() CASCADE', '$DB_SCHEMA', r.routine_name);
    END LOOP;
END \$\$;

-- 🔥 3. インデックス（明示的に）
DO \$\$ DECLARE
    r RECORD;
BEGIN
    FOR r IN (
        SELECT indexname
        FROM pg_indexes
        WHERE schemaname = '$DB_SCHEMA'
    ) LOOP
        EXECUTE format('DROP INDEX IF EXISTS %I.%I CASCADE', '$DB_SCHEMA', r.indexname);
    END LOOP;
END \$\$;

-- 🔥 4.ENUM 型を削除（対象スキーマ限定、CASCADE付き）
DO \$\$ DECLARE
    r RECORD;
BEGIN
    FOR r IN (
        SELECT t.typname
        FROM pg_type t
        JOIN pg_namespace n ON n.oid = t.typnamespace
        WHERE t.typtype = 'e'  -- ENUM 型
          AND n.nspname = '$DB_SCHEMA'
    ) LOOP
        EXECUTE format('DROP TYPE IF EXISTS %I.%I CASCADE', '$DB_SCHEMA', r.typname);
    END LOOP;
END \$\$;

EOF

echo "✅ Schema $DB_SCHEMA has been reset."
