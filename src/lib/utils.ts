export const resizeImage = (file: File, maxWidth = 1024): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target?.result as string;
      img.onload = () => {
        const canvas = document.createElement("canvas");
        let width = img.width;
        let height = img.height;
        if (width > maxWidth) {
          height = (maxWidth / width) * height;
          width = maxWidth;
        }
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        ctx?.drawImage(img, 0, 0, width, height);
        const dataUrl = canvas.toDataURL("image/jpeg", 0.7);
        resolve(dataUrl);
      };
      img.onerror = reject;
    };
    reader.onerror = reject;
  });
};

export const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
};

export const validateImageSize = (file: File, maxSizeMB = 10): boolean => {
  const maxSizeInBytes = maxSizeMB * 1024 * 1024;
  return file.size <= maxSizeInBytes;
};

export const exportBatchToCSV = (dataList: any[]) => {
  const clean = (str: string) =>
    str.replace(/\n/g, " ").replace(/"/g, '""').trim();

  const headers = "Filename,Title,Keywords,Category,Releases";
  const rows = dataList
    .map((item) => {
      const fName = clean(item.filename);
      const title = clean(item.title).substring(0, 200);
      const keywords = clean(item.keywords)
        .split(",")
        .map((k: string) => k.trim())
        .filter((k: string) => k !== "")
        .join(", ");
      const category = item.category || "3";
      const releases = clean(item.releases || "");
      return `"${fName}","${title}","${keywords}",${category},"${releases}"`;
    })
    .join("\n");

  const blob = new Blob(["\ufeff" + headers + "\n" + rows], {
    type: "text/csv;charset=utf-8;",
  });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `adogen_batch_${new Date().toISOString().split("T")[0]}.csv`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

const CDN_ORIGIN = "https://cdn.c0desk1.my.id";

function ensureDate(date: Date | string | number): Date {
  if (date instanceof Date) return date;
  return new Date(date);
}

export function isCdnUrl(src: string): boolean {
  return typeof src === "string" && src.startsWith(CDN_ORIGIN);
}

export function cdnImage(
  src: string,
  options?: {
    w?: number;
    h?: number;
    q?: number;
    f?: "webp" | "avif" | "jpeg" | "auto";
  },
): string {
  if (!isCdnUrl(src)) return src;
  const url = new URL(src);
  if (options?.w) url.searchParams.set("w", String(options.w));
  if (options?.h) url.searchParams.set("h", String(options.h));
  url.searchParams.set("q", String(options?.q ?? 85));
  url.searchParams.set("f", options?.f ?? "auto");
  return url.toString();
}

export function formatDate(date: Date | string | number, locale: string = 'id-ID'): string {
  const d = ensureDate(date);
  return d.toLocaleDateString(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export function formatDateCompact(date: Date | string | number, locale: string = 'id-ID'): string {
  const d = ensureDate(date);
  return d.toLocaleDateString(locale, {
    month: 'short',
    day: 'numeric',
  });
}

export function formatDateISO(date: Date | string | number): string {
  const d = ensureDate(date);
  return d.toISOString().split('T')[0];
}

export function stripMarkdown(content: string): string {
  if (!content?.trim()) return '';

  let text = content;

  text = text.replace(/^\s*---[\s\S]*?---\s*/, '');

  const lines = text.split('\n');

  text = lines
    .filter((line) => {
      const trimmed = line.trim();

      return (
        !trimmed.startsWith('import ') &&
        !trimmed.startsWith('// ') &&
        !trimmed.startsWith('/*')
      );
    })
    .join('\n');

  text = text.replace(/\{\/\*[\s\S]*?\*\/\}/g, '');
  text = text.replace(/<[^>]*>/g, ' ');
  text = text.replace(/^#{1,6}\s+/gm, '');
  text = text.replace(/\*\*([^*]+)\*\*/g, '$1');
  text = text.replace(/\*([^*]+)\*/g, '$1');
  text = text.replace(/__([^_]+)__/g, '$1');
  text = text.replace(/_([^_]+)_/g, '$1');
  text = text.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1');
  text = text.replace(/!\[[^\]]*\]\([^)]+\)/g, '');
  text = text.replace(/`([^`]+)`/g, '$1');
  text = text.replace(/[#*`>_\-+]/g, ' ');
  text = text.replace(/\s+/g, ' ').trim();

  return text;
}

export function truncate(text: string, length: number = 100): string {
  if (!text) return '';
  if (text.length <= length) return text;
  return text.slice(0, length).trim() + '...';
}

export function generateExcerpt(
  content: string,
  maxLength: number = 160
): string {
  return truncate(stripMarkdown(content), maxLength);
}

export function getReadingTime(content?: string): string {
  const suffix = 'menit baca';

  if (!content?.trim()) return `1 ${suffix}`;
  const cleanText = generateExcerpt(content, Infinity);
  const words = cleanText.trim().split(/\s+/).length;
  const minutes = Math.max(1, Math.ceil(words / 200));

  return `${minutes} ${suffix}`;
}
