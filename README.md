# VERITAS: Autonomous Market Intelligence with Citation-Verified Financial Research

A multi-agent AI financial intelligence platform built with React 19, TypeScript, Express, Tailwind CSS, and Google Gemini.

---

## Prerequisites

Before running the project on your laptop, ensure you have:

1. **Node.js**: Version **18.x** or **20+** (Recommended: Node 20 LTS or Node 22).
   - Check version in terminal: `node -v`
   - Download if needed: [nodejs.org](https://nodejs.org/)
2. **npm** (comes bundled with Node.js) or **pnpm** / **yarn** / **bun**.
3. **VS Code** (or any preferred code editor).
4. **Google Gemini API Key** (Free):
   - Get one from [Google AI Studio](https://aistudio.google.com/app/apikey).

---

## Step-by-Step Setup in VS Code

### 1. Open the Project in VS Code
- Open VS Code.
- Go to **File** → **Open Folder...** (or `Cmd + O` on Mac / `Ctrl + K Ctrl + O` on Windows).
- Select the unzipped project folder `veritas`.

### 2. Configure Environment Variables (`.env`)
Create a new file named `.env` in the root folder (next to `package.json`):

```bash
# In your terminal or by creating a new file in VS Code:
touch .env
```

Paste the following inside `.env`:

```env
PORT=3000
GEMINI_API_KEY="your_actual_gemini_api_key_here"
```

> **Note**: Even if you test without a key or offline, VERITAS includes fallback data (pre-indexed SEC 10-K filings, Okapi BM25 engine, live Yahoo Finance and EDGAR proxies, and heuristic verification).

### 3. Open the Integrated Terminal in VS Code
- In VS Code, press `` Ctrl + ` `` (Windows/Linux) or `` Cmd + ` `` (Mac), or click **Terminal** → **New Terminal**.

### 4. Install Dependencies
Run:

```bash
npm install
```

### 5. Start the Development Server
Run:

```bash
npm run dev
```

This starts the unified Express backend (`server.ts`) which simultaneously serves:
- The **REST API** endpoints (`/api/pipeline/*`, `/api/data/*`, `/api/benchmark/*`, `/api/agent/*`)
- The **Vite React Dev Server** with Hot Module Replacement (HMR)

### 6. Open in Your Browser
Visit:
👉 **[http://localhost:3000](http://localhost:3000)**

---

## Available Scripts

| Command | Description |
| :--- | :--- |
| `npm run dev` | Runs the full-stack development server on `http://localhost:3000` via `tsx server.ts`. |
| `npm run build` | Builds the client application for production in `/dist`. |
| `npm start` | Starts the production server using the Express server. |
| `npm run lint` | Runs TypeScript type checking (`tsc --noEmit`). |

---

## Troubleshooting & Tips

### Port 3000 Already in Use
If port 3000 is occupied by another application, either stop the process using port 3000, or edit `.env`:
```env
PORT=3005
```
Then rerun `npm run dev` and open `http://localhost:3005`.

### Windows PowerShell Execution Policy Error
If PowerShell says `running scripts is disabled on this system` when running `npm`:
1. Open PowerShell as Administrator and run:
   ```powershell
   Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned
   ```
2. Or use the Command Prompt (`cmd`) tab inside VS Code instead of PowerShell.

### Firewall Notification
When running `npm run dev` for the first time, your OS (macOS or Windows Defender) may show a prompt asking to allow Node.js network access. Click **Allow**.
