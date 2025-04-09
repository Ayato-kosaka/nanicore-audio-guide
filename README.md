# なにこれオーディオガイド
*ワンショットで観光地や絵画がわかる、音声ガイド付きカメラアプリ*

[App Store](#) | [Google Play](#) | [Web版はこちら](#)

---

## 特徴・機能一覧

GitHub IssuesにてPBI（Product Backlog Item）単位で管理しています。  
以下のリンクから `pbi` ラベル付きチケットをご確認ください。

▶︎ [PBI一覧を見る](https://github.com/Ayato-kosaka/nanicore-audio-guide/issues?q=label%3Apbi)

バッチリ整ってますね！  
以下に、**「セットアップ（for Dev）」** と **「ライセンス」** の英訳を用意しました。英語READMEの一部や英語ドキュメントでそのまま使えるように、自然なトーンで書いています。

---

## 🛠 Setup (for Dev)

This project uses a [TurboRepo](https://turbo.build/) monorepo structure.  
It manages `expo` (mobile app), `functions` (API), and `shared` (shared types/validation) in a unified workspace.

---

### Prerequisites

- Node.js v20+
- `npm` v10+

> Note: No global installation is required. All CLIs like `turbo`, `firebase-tools`, and `supabase` can be run via `npx`.

---

### 1. Clone the repository

```bash
git remote clone https://github.com/Ayato-kosaka/nanicore-audio-guide.git
cd nanicore-audio-guide
```

---

### 2. Install dependencies

```bash
npm install
```

TurboRepo will automatically install dependencies for `expo/`, `functions/`, and other workspaces.

---

### 3. Get the environment variable file

The `.env` file is stored in Google Drive.  
Please download it from the following link:  
👉 [Download .env from Google Drive](https://drive.google.com/drive/folders/1ajijkGh9hBy5OkSvDE2TCOEmDvzMNm1M?usp=sharing)

After downloading, place it at the project root:

```
/nanicore-audio-guide/.env
```

---

### 4. Start development server

```bash
npx turbo run dev
```

| Package | Description |
|---------|-------------|
| `expo/` | Starts the Expo Dev Server for app development |
| `functions/` | Not automatically started in dev (run separately if needed) |
| `e2e/` | Not included in development startup (used in CI or manually) |

> Defined in `turbo.json`, the `dev` task maps to each package’s respective dev script (e.g., `expo dev`).

---

## 🔧 Commonly Used Scripts

| Command | Description |
|---------|-------------|
| `npx turbo run dev` | Start the Expo app development server |
| `npx turbo run lint` | Run lint across packages |
| `npx turbo run typecheck` | TypeScript type checking |
| `npx turbo run build` | Production build |

---

## 📄 License

MIT

---

## お問い合わせ

不具合報告や提案などは [Issues](https://github.com/Ayato-kosaka/nanicore-audio-guide/issues) よりお願いします。

