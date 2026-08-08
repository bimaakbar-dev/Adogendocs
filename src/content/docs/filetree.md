---
slug: "filetree"
title: "Filetree"
description: "Halaman untuk menguji tampilan filetree dengan berbagai variasi."
category: "Playground"
lastUpdated: 2026-08-08T00:00:10Z
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
:::filetree
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
:::
```

:::filetree
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
:::

### 2. Dengan Highlight (**bold**)

```md
:::filetree
- src/
  - components/
    - **Header.astro**
  - pages/
    - **index.astro** # halaman utama
- **package.json**
- README.md
:::
```

:::filetree
- src/
  - components/
    - **Header.astro**
  - pages/
    - **index.astro** # halaman utama
- **package.json**
- README.md
:::

### 3. Dengan Komentar (# dan //)

```md
:::filetree
- src/
  - lib/
    - utils.ts # utility functions
    - api.ts // API client
  - styles/
    - global.css # styles utama
- .env // environment variables
- tsconfig.json # TypeScript config
:::
```

:::filetree
- src/
  - lib/
    - utils.ts # utility functions
    - api.ts // API client
  - styles/
    - global.css # styles utama
- .env // environment variables
- tsconfig.json # TypeScript config
:::

### 4. Dengan Placeholder (...)

```md
:::filetree
- src/
  - components/
    - Header.astro
    - ...
  - pages/
    - ...
- ...
:::
```

:::filetree
- src/
  - components/
    - Header.astro
    - ...
  - pages/
    - ...
- ...
:::

### 5. Nested Folder (Bersarang)

```md
:::filetree
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
:::
```

:::filetree
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
:::

## 6. Filetree Depth Test

```md
:::filetree
- level-0-root-file.txt
- level-0-root-folder/
  - level-1-file.md
  - level-1-folder/
    - level-2-file.js
    - level-2-folder/
      - level-3-file.ts
      - level-3-folder/
        - level-4-file.astro
        - level-4-folder/
          - level-5-file.css
          - level-5-folder/
            - level-6-file.json
            - ...
- src/
  - components/
    - ui/
      - Button.astro
      - Card.astro
      - forms/
        - Input.astro
        - Select.astro
        - ...
    - layout/
      - BaseLayout.astro
  - pages/
    - docs/
      - getting-started/
        - index.astro
        - installation.astro
        - configuration/
          - index.astro
          - advanced/
            - custom-theme.astro
            - ...
- package.json
- **README.md** # highlight di root
:::
```

:::filetree
- level-0-root-file.txt
- level-0-root-folder/
  - level-1-file.md
  - level-1-folder/
    - level-2-file.js
    - level-2-folder/
      - level-3-file.ts
      - level-3-folder/
        - level-4-file.astro
        - level-4-folder/
          - level-5-file.css
          - level-5-folder/
            - level-6-file.json
            - ...
- src/
  - components/
    - ui/
      - Button.astro
      - Card.astro
      - forms/
        - Input.astro
        - Select.astro
        - ...
    - layout/
      - BaseLayout.astro
  - pages/
    - docs/
      - getting-started/
        - index.astro
        - installation.astro
        - configuration/
          - index.astro
          - advanced/
            - custom-theme.astro
            - ...
- package.json
- **README.md** # highlight di root
:::

### 7. Kombinasi Semua Fitur

```md
:::filetree
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
:::
```

:::filetree
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
:::

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
