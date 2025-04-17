#!/bin/bash

set -e
set -a
source functions/.env
set +a

if [ -z "$DB_SCHEMA" ]; then
  echo "❌ DB_SCHEMA is not set in functions/.env"
  exit 1
fi

TEMPLATE="functions/prisma/schema.template.prisma"
TARGET="functions/prisma/schema.prisma"

if [ ! -f "$TEMPLATE" ]; then
  echo "❌ Template not found: $TEMPLATE"
  exit 1
fi

echo "📄 Generating schema.prisma with schema: $DB_SCHEMA"
sed "s/__SCHEMA__/${DB_SCHEMA}/g" "$TEMPLATE" > "$TARGET"

echo "🔄 Running prisma db pull"
pnpx prisma db pull --schema "$TARGET"

echo "🧬 Running prisma generate"
pnpx prisma generate --schema "$TARGET"

EXPO_ENV="expo/.env"

# EXPO_PUBLIC_SUPABASE_URL を読み込んでプロジェクトID抽出
EXPO_PUBLIC_SUPABASE_URL=$(grep '^EXPO_PUBLIC_SUPABASE_URL=' "$EXPO_ENV" | cut -d '=' -f2-)

if [ -z "$EXPO_PUBLIC_SUPABASE_URL" ]; then
  echo "❌ EXPO_PUBLIC_SUPABASE_URL is not set in expo/.env"
  exit 1
fi

PROJECT_ID=$(echo "$EXPO_PUBLIC_SUPABASE_URL" | sed -E 's|https?://([a-z0-9]+)\.supabase\.co.*|\1|')

if [ -z "$PROJECT_ID" ]; then
  echo "❌ Could not extract PROJECT_ID from EXPO_PUBLIC_SUPABASE_URL"
  exit 1
fi

echo "📦 Extracted Supabase Project ID: $PROJECT_ID"
echo "🧬 Generating Supabase types..."
pnpx supabase gen types typescript --project-id "$PROJECT_ID" --schema $DB_SCHEMA > shared/supabase/database.types.ts

echo "✅ Supabase types generated at shared/supabase/database.types.ts"

echo "🛠️ Running converter generation for shared..."
pnpm --filter shared run generate:converters
echo "✅ Converters generated"

echo "✅ All done!"
