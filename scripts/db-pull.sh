#!/bin/bash

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
