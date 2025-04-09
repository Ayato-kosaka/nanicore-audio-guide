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

This project is built with [TurboRepo](https://turbo.build/) and uses a monorepo structure.  
It manages `expo` (mobile app), `functions` (Cloud Functions), `shared` (types and schemas), and `e2e` (end-to-end tests) as separate workspaces.

---

### Prerequisites

- **Node.js v18.x** (recommended)
- **pnpm v8+** (managed via [Corepack](https://nodejs.org/api/corepack.html))

> ⚠️ **Note:** `npm` v10 is not fully compatible with TurboRepo in some setups.  
> To avoid install errors, we recommend using `pnpm`.

---

### 1. Clone the repository

```bash
git clone https://github.com/Ayato-kosaka/nanicore-audio-guide.git
cd nanicore-audio-guide
```

---

### 2. Enable Corepack & Install Dependencies

```bash
corepack enable
pnpm install
```

> `pnpm-workspace.yaml` handles all workspace packages. No need to install dependencies manually in each subfolder.

---

### 3. Add environment variables

Download the shared `.env` file from Google Drive:

👉 [Download .env from Google Drive](https://drive.google.com/drive/folders/1ajijkGh9hBy5OkSvDE2TCOEmDvzMNm1M?usp=sharing)

Then place it in the project root:

```
/nanicore-audio-guide/.env
```

---

### 4. Start Development Server

```bash
pnpm dev
```

| Workspace | Description |
|-----------|-------------|
| `expo/` | Launches the Expo Dev Server |
| `functions/` | Starts Firebase Emulator and watch mode |
| `e2e/` | Not included by default (run manually or in CI) |

---

## 🔧 Common Commands

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start development servers |
| `pnpm lint` | Run ESLint across all packages |
| `pnpm typecheck` | Run TypeScript checks across all packages |
| `pnpm build` | Build all packages for production |

---

## 📄 License

MIT

---

## お問い合わせ

不具合報告や提案などは [Issues](https://github.com/Ayato-kosaka/nanicore-audio-guide/issues) よりお願いします。

