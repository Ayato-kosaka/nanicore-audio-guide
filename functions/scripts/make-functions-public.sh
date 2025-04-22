#!/bin/bash

set -e

REGION="us-central1"

echo "📦 Cloud Run サービス一覧を取得中（region: $REGION）..."
SERVICES=$(gcloud run services list --platform managed --region "$REGION" --format="value(metadata.name)")

echo "✅ 公開対象サービス:"
echo "$SERVICES"
echo

for SERVICE in $SERVICES; do
  echo "🔄 $SERVICE に roles/run.invoker を付与中..."

  gcloud run services add-iam-policy-binding "$SERVICE" \
    --region "$REGION" \
    --member="allUsers" \
    --role="roles/run.invoker" \
    --quiet

  echo "✅ $SERVICE 公開完了"
done

echo "🎉 すべての関数がパブリックになりました。"
