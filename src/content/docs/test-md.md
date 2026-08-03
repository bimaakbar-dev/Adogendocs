---
slug: "markdown"
title: "Markdown"
description: "Typography deskripsi menggunakan markdown"
order: 9
pubDate: 2026-06-25T17:00
lastUpdated: 2026-06-25T17:00
category: "Typography"
seo:
  title: "Markdown"
  description: "Typography deskripsi menggunakan markdown"
---

# Heading level 1

## Heading level 2

### Heading level 3

#### Heading level 4

##### Heading level 5

###### Heading level 6

## Paragraf biasa.

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Integer facilisis, nisl sed tincidunt varius, ligula erat fermentum nisi, non pretium velit magna nec lectus. Curabitur ut sem vel augue pulvinar volutpat sit amet sed risus.

> Donec faucibus, risus vel luctus tincidunt, justo sapien placerat nibh, sed gravida lorem lectus non sapien. Variasi tanpa metadata seperti ini penting untuk memastikan renderer tetap stabil meskipun tidak memiliki source maupun author tambahan.
>
> <cite>Ini cite</cite>

## Daftar (List)

### Daftar tak berurutan (unordered)

- Item pertama dengan deskripsi yang sedikit lebih panjang untuk membantu testing spacing, wrapping text, dan alignment marker pada daftar unordered.
- Item kedua yang juga memiliki isi lebih panjang agar rendering multiline dapat terlihat dengan lebih jelas pada berbagai ukuran layar.
  - Sub item A dengan tambahan teks untuk memastikan nested list tetap memiliki indentation dan vertical rhythm yang konsisten.
  - Sub item B yang digunakan untuk menguji tampilan marker, spacing antar item, dan line-height pada nested unordered list.
- Item ketiga dengan kombinasi teks yang lebih panjang untuk membantu debugging typography dan layout pada prose content custom.

### Daftar berurutan (ordered)

1. Langkah satu dengan penjelasan tambahan yang dibuat lebih panjang untuk membantu testing alignment angka, spacing antar item, dan wrapping text pada ordered list custom.
2. Langkah dua dengan isi yang sedikit lebih kompleks agar rendering multiline dan vertical rhythm pada daftar berurutan dapat terlihat lebih jelas.
3. Sub langkah 2.1 dengan tambahan konten untuk memastikan nested ordered list tetap memiliki indentation dan numbering yang konsisten.
4. Sub langkah 2.2 yang digunakan untuk menguji tampilan marker angka, line-height, serta spacing antar nested item.
5. Langkah tiga dengan paragraf yang lebih panjang untuk membantu debugging typography, numbering style, dan keseluruhan layout prose pada berbagai ukuran layar.

### Task list

- [x] Selesai dan sudah diuji untuk memastikan styling checkbox aktif, alignment icon, serta typography pada task list berjalan dengan baik di dalam prose custom.
- [ ] Belum selesai karena masih digunakan untuk testing spacing, wrapping text, dan interaksi visual antara checkbox dengan konten multiline yang lebih panjang.
- [ ] Sedang dikerjakan sambil melakukan debugging terhadap vertical rhythm, nested spacing, serta konsistensi rendering task list pada berbagai ukuran layar dan mode tema.

## Tabel

| Header 1                                                                                                           | Header 2                                                                                              | Header 3                                                                                                  |
| ------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------- |
| Baris 1 kolom 1 dengan isi yang lebih panjang untuk membantu testing wrapping text dan alignment pada tabel custom | Baris 1 kolom 2 digunakan untuk menguji spacing horizontal serta vertical rhythm antar cell           | Baris 1 kolom 3 berfungsi untuk memastikan typography dan overflow content tetap stabil                   |
| Baris 2 kolom 1 memiliki konten tambahan agar rendering multiline di dalam tabel dapat terlihat lebih jelas        | Baris 2 kolom 2 digunakan untuk debugging border, padding, dan line-height pada berbagai ukuran layar | Baris 2 kolom 3 membantu memastikan seluruh layout tabel tetap konsisten saat konten lebih panjang        |
| Baris 3 kolom 1 digunakan untuk testing kombinasi teks panjang dengan responsive table wrapper                     | Baris 3 kolom 2 membantu memeriksa alignment vertikal antar cell dan konsistensi ukuran typography    | Baris 3 kolom 3 dipakai untuk validasi overflow, scroll horizontal, dan rendering akhir pada prose custom |

## Code block

```astro
---
// src/components/mdx/CodeBlock.astro
import Icon from "@/components/ui/icons/Icon.astro"; // [!code ++]

interface Props {
  title?: string; // [!code --]
}

const { title = "" } = Astro.props; // [!code highlight]
---
```
## Details

<details>
  <summary>Judul details klik disini untuk melihat isi</summary>
  ini isi Details yang dibuat lebih panjang untuk membantu testing rendering accordion, spacing internal, animation open/close, serta konsistensi typography pada prose custom di berbagai ukuran layar dan mode tema.
</details>

## Horizontal Rule
---

***

## Gambar

### Gambar default

![c0desk1](/org/c0desk1-og.webp)

### Gambar dengan caption

![c0desk1](/org/c0desk1-og.webp)

<small>Caption dan gambar di atas dipakai untuk memastikan alignment caption, typography, spacing vertikal, serta perilaku layout media tetap konsisten ketika digunakan bersama elemen markdown lainnya seperti paragraf, heading, maupun list.
</small>

## Footnote
Artikel ini menggunakan beberapa footnote untuk memberikan penjelasan tambahan tanpa mengganggu alur utama pembahasan[^1]. Sistem seperti ini sering dipakai pada dokumentasi teknis, artikel akademik, maupun blog dengan konten panjang agar referensi tetap rapi dan mudah dibaca[^2].

Selain itu, footnote juga berguna untuk menyisipkan konteks tambahan, sumber referensi, atau catatan kecil yang tidak terlalu penting jika dimasukkan langsung ke paragraf utama[^3]. Pada implementasi MDX atau Markdown modern, footnote biasanya dirender menjadi daftar referensi otomatis di bagian bawah halaman[^4].

Contoh lain penggunaan footnote dapat ditemukan pada pembahasan API, changelog, maupun catatan kompatibilitas browser yang sering membutuhkan detail tambahan tanpa memenuhi isi utama artikel[^5].

[^1]: Footnote pertama berisi penjelasan dasar mengenai penggunaan catatan kaki dalam dokumen Markdown.
[^2]: Beberapa parser Markdown menggunakan sintaks footnote bawaan, sementara lainnya memerlukan plugin tambahan seperti remark-gfm atau remark-footnotes.
[^3]: Footnote sering membantu menjaga tampilan artikel tetap bersih dan lebih nyaman dibaca pada layar kecil.
[^4]: Pada sebagian tema blog, footnote dapat diberi animasi scroll atau backlink menuju posisi referensi awal.
[^5]: Dalam workflow dokumentasi modern, footnote kadang dipakai untuk informasi deprecated, edge cases, atau catatan implementasi khusus.

## Strikethrough
~~Teks ini dicoret~~ untuk membantu testing styling strikethrough, ketebalan garis, alignment dengan typography utama, serta konsistensi rendering inline markdown pada berbagai ukuran layar dan mode tema.

## Highlight
Ini paragraph dengan <mark>mark</mark> digunakan untuk membantu testing background highlight, border accent, spacing inline, serta konsistensi typography pada prose custom di berbagai ukuran layar.

## Escaping karakter
Ini tidak miring karena \*backslash\*. Contoh ini digunakan untuk membantu testing escaped markdown character, rendering literal symbol, serta memastikan parser markdown tidak mengubah karakter tertentu menjadi elemen formatting otomatis.

## HTML inline
Ini paragraf dengan <span class="custom-inline">HTML langsung</span> yang digunakan untuk membantu testing rendering HTML inline, inheritance typography, spacing, dan kompatibilitas styling custom di dalam prose markdown.

## Abbreviation
<abbr title="World Health Organization">WHO</abbr> adalah organisasi kesehatan yang digunakan di sini untuk membantu testing tooltip abbreviation, border style, hover interaction, serta rendering elemen inline HTML di dalam prose custom.

## Sample Output
<samp>Error: file not found (404)</samp> digunakan untuk membantu testing typography elemen sample output, background styling, border radius, spacing inline, serta konsistensi rendering elemen terminal-style di dalam prose custom.

## Time element
<time datetime="2026-05-19">19 Mei 2026</time> digunakan untuk membantu testing styling elemen time, typography inline, spacing antar elemen, serta rendering semantic HTML pada prose custom di berbagai ukuran layar dan mode tema.

## Meter
<meter value="0.6">60%</meter>

60% digunakan untuk membantu testing rendering elemen meter, alignment inline, ukuran default browser styling, serta kompatibilitas typography pada prose custom di berbagai ukuran layar dan mode tema.

## Progress
<progress value="70" max="100">70%</progress>

70% digunakan untuk membantu testing elemen progress, tinggi komponen bawaan browser, alignment vertikal, serta rendering semantic HTML pada prose custom.

## Inline quote
<q>Ini kutipan pendek di dalam paragraf</q> digunakan untuk membantu testing styling elemen inline quote, typography quotation mark bawaan browser, spacing inline, serta kompatibilitas rendering semantic HTML pada prose custom.

## Variable
Rumus luas persegi: <var>s</var><sup>2</sup> digunakan untuk membantu testing styling elemen variable, alignment superscript, typography matematika inline, serta kompatibilitas semantic HTML pada prose custom di berbagai ukuran layar dan mode tema.

## Small text
<small>Hak cipta, disclaimer, atau catatan kaki digunakan untuk membantu testing typography small text, ukuran font kecil, line-height, serta konsistensi rendering elemen semantic HTML pada prose custom di berbagai ukuran layar dan mode tema.
Selain itu, teks kecil seperti ini juga berguna untuk memastikan alignment inline, opacity visual, dan spacing tetap stabil ketika digunakan bersama paragraf biasa, link, maupun elemen markdown lainnya.</small>

## Insert dan Delete
Ini <ins>teks ditambahkan</ins> dan ini ~~teks dihapus~~. Contoh ini digunakan untuk membantu testing styling elemen insert dan delete, termasuk underline, strikethrough, spacing inline, serta konsistensi typography pada prose custom di berbagai ukuran layar dan mode tema.

## Citation
<cite>Judul Buku atau Karya</cite> digunakan untuk membantu testing styling elemen citation, typography italic bawaan browser, spacing inline, serta kompatibilitas semantic HTML pada prose custom di berbagai ukuran layar dan mode tema.

## Keyboard Input
Tekan <kbd>Ctrl + C</kbd> untuk menyalin. Contoh ini digunakan untuk membantu testing styling elemen keyboard input, border, shadow, spacing inline, serta konsistensi typography pada prose custom di berbagai ukuran layar dan mode tema.

## Superscript dan Subscript
H<sub>2</sub>O dan E = mc<sup>2</sup> digunakan untuk membantu testing alignment superscript dan subscript, typography matematika inline, spacing vertikal, serta kompatibilitas semantic HTML pada prose custom di berbagai ukuran layar dan mode tema.

Selain itu, contoh seperti CO<sub>2</sub>, NH<sub>3</sub>, dan x<sup>10</sup> juga berguna untuk memastikan rendering elemen subscript maupun superscript tetap konsisten ketika digunakan bersama `inline code`, variable, atau elemen markdown lainnya di dalam paragraf panjang.

## Definition List
<dl>
  <dt>Term 1</dt>
  <dd>
    Definisi term 1 yang dibuat sedikit lebih panjang untuk membantu testing spacing, indentation, typography, dan alignment antara definition term dengan definition description pada prose custom.
  </dd>
  <dt>Term 2</dt>
  <dd>
    Definisi term 2 digunakan untuk memastikan rendering definition list tetap konsisten ketika memiliki konten multiline, wrapping text, maupun kombinasi elemen inline seperti **strong**, *italic*, dan `inline code`.
  </dd>
</dl>

## Bidirectional text
<div dir="rtl">
Teks ini terbaca dari kanan ke kiri digunakan untuk membantu testing rendering bidirectional text, alignment RTL, spacing inline, serta kompatibilitas semantic HTML pada prose custom di berbagai ukuran layar dan mode tema.
</div>

## Ruby annotation
<ruby>漢字<rt>かんじ</rt></ruby> digunakan untuk membantu testing rendering ruby annotation, alignment furigana, spacing vertikal, serta kompatibilitas semantic HTML pada prose custom di berbagai ukuran layar dan mode tema.