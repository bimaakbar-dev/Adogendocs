---
slug: "filetree"
title: "Filetree"
description: "Halaman untuk menguji tampilan filetree dengan berbagai variasi."
category: "Playground"
lastUpdated: 2026-08-08T00:00:00Z
order: 1
draft: false
seo:
  title: "Filetree Test"
  description: "Testing filetree directive."
  noIndex: true
---

## Filetree Test

Halaman ini berisi berbagai contoh **filetree** untuk menguji:

- Folder (dengan dan tanpa isi)
- File (dengan berbagai ekstensi)
- Highlight (`**bold**`)
- Komentar (`#` dan `//`)
- Placeholder (`...`)
- Nested folder (bersarang)

---

### 1. Struktur Dasar

```md
::filetree
- src/
  - components/
    - Header.astro
    - Footer.astro
  - pages/
    - index.astro
    - blog/
      - [...slug].astro
- package.json
- astro.config.mjs
- README.md
::
```

::filetree
- src/
  - components/
    - Header.astro
    - Footer.astro
  - pages/
    - index.astro
    - blog/
      - [...slug].astro
- package.json
- astro.config.mjs
- README.md
::

### 2. Dengan Highlight (**bold**)

```md
::filetree
- src/
  - components/
    - **Header.astro**
  - pages/
    - **index.astro** # halaman utama
- **package.json**
- README.md
::
```

::filetree
- src/
  - components/
    - **Header.astro**
  - pages/
    - **index.astro** # halaman utama
- **package.json**
- README.md
::

### 3. Dengan Komentar (# dan //)

```md
::filetree
- src/
  - lib/
    - utils.ts # utility functions
    - api.ts // API client
  - styles/
    - global.css # styles utama
- .env // environment variables
- tsconfig.json # TypeScript config
::
```

::filetree
- src/
  - lib/
    - utils.ts # utility functions
    - api.ts // API client
  - styles/
    - global.css # styles utama
- .env // environment variables
- tsconfig.json # TypeScript config
::

### 4. Dengan Placeholder (...)

```md
::filetree
- src/
  - components/
    - Header.astro
    - ...
  - pages/
    - ...
- ...
::
```

::filetree
- src/
  - components/
    - Header.astro
    - ...
  - pages/
    - ...
- ...
::

### 5. Nested Folder (Bersarang)

```md
::filetree
- src/
  - components/
    - ui/
      - Button.astro
      - Card.astro
    - layout/
      - BaseLayout.astro
  - pages/
    - docs/
      - getting-started/
        - index.astro
        - installation.astro
    - blog/
      - [...slug].astro
- public/
  - images/
    - logo.svg
    - favicon.ico
::
```

::filetree
- src/
  - components/
    - ui/
      - Button.astro
      - Card.astro
    - layout/
      - BaseLayout.astro
  - pages/
    - docs/
      - getting-started/
        - index.astro
        - installation.astro
    - blog/
      - [...slug].astro
- public/
  - images/
    - logo.svg
    - favicon.ico
::

### 6. Kombinasi Semua Fitur

```md
::filetree
- src/
  - **components/** # folder utama
    - ui/
      - Button.astro
      - **Card.astro** # komponen utama
    - layout/
      - BaseLayout.astro // layout dasar
      - ...
  - pages/
    - docs/
      - **index.astro** # halaman docs utama
      - getting-started/
        - index.astro
        - installation.astro // panduan install
        - ...
- package.json
- **astro.config.mjs** # config utama
- .env // environment
::
```

::filetree
- src/
  - **components/** # folder utama
    - ui/
      - Button.astro
      - **Card.astro** # komponen utama
    - layout/
      - BaseLayout.astro // layout dasar
      - ...
  - pages/
    - docs/
      - **index.astro** # halaman docs utama
      - getting-started/
        - index.astro
        - installation.astro // panduan install
        - ...
- package.json
- **astro.config.mjs** # config utama
- .env // environment
::

## Catatan Testing
Fitur Status
- [x] Folder (/) ✅
- [x] File (berbagai ekstensi) ✅
- [x] Highlight (**bold**) ✅
- [x] Komentar (# dan //) ✅
- [x] Placeholder (...) ✅
- [x] Nested (bersarang) ✅
- [ ] Ikon ekstensi ⏳ (isi variable CSS)
- [ ] Hover (border & ikon) ⏳ (test interaksi)