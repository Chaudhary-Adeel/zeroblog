# ZeroBlog

Minimal Go + React blog project (Fiber backend + React frontend bundled with esbuild).

Overview
- Backend: `main.go` using Fiber, serving views and static assets from `public/`.
- Frontend: `frontend/Application.tsx` -> bundled to `public/assets/Application.js` by `esbuild.js`.

Project structure

```
/ (project root)
├─ esbuild.js              # esbuild build script
├─ go.mod
├─ main.go                 # Fiber server (renders views and serves public/)
├─ package.json            # npm scripts + deps for frontend build
├─ scripts/
│  └─ dev.sh               # helper script to run CompileDaemon
├─ frontend/
│  ├─ Application.tsx      # React entry
│  └─ style.scss
├─ public/
│  └─ assets/
│     ├─ Application.js    # bundled frontend JS
│     └─ style.css
└─ views/
   └─ index.html           # server-rendered HTML (mounts React)
```

Quick dev

1) Frontend build (bundles `frontend` into `public/assets`):

```bash
npm run dev
```

2) Run Go server (dev watcher recommended):

- Make `scripts/dev.sh` executable and run it (requires `CompileDaemon` installed):

```bash
chmod +x scripts/dev.sh
./scripts/dev.sh
```

- Or run CompileDaemon directly if GOPATH/bin is on PATH:

```bash
CompileDaemon -command="go run main.go" -exclude-dir=frontend,node_modules,public,views
```

Planned work (Multitenant + RBAC)

- Goal: Add multitenant blog system in Go + React with RBAC per tenant.
- High-level TODOs are tracked in the repo task list.
