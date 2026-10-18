# Spesifikasi Build — Portofolio Yoshua Pandawinatha

Dokumen ini adalah instruksi lengkap untuk membangun website portofolio pribadi menggunakan **Next.js (App Router) + TypeScript + Tailwind CSS**, terinspirasi dari gaya `porto-bagas-app.vercel.app` (hero besar, marquee berjalan, dark/light mode, footer dengan jam lokal real-time).

Kerjakan langkah demi langkah sesuai urutan di bawah. Setiap kali sebuah field ditandai `[ISI: ...]`, itu artinya butuh input asli dari pemilik portofolio — jangan mengarang data, tanyakan atau tinggalkan placeholder yang jelas.

---

## 0. Identitas Pemilik (data dasar yang sudah diketahui)

- Nama: Yoshua Pandawinatha
- Program studi: Teknik Informatika, STMIK Widya Cipta Dharma
- NIM: 2343074
- Lokasi: Samarinda, Kalimantan Timur, Indonesia
- Minat: fullstack web development & IoT
- Proyek yang diketahui:
  - **Sistem Parkir Mall (E-Parking)** — sistem manajemen parkir bergaya mall; sisi web dibangun dengan Laravel lebih dulu, integrasi IoT menyusul.
  - **Sistem Peringatan Dini Banjir** — tugas akhir non-skripsi, kombinasi IoT + web, membutuhkan publikasi jurnal.

Field berikut **belum diisi** dan harus ditanyakan ke pemilik sebelum konten final dipasang:
- `[ISI: email]`
- `[ISI: nomor WhatsApp]`
- `[ISI: link GitHub]`
- `[ISI: link LinkedIn]`
- `[ISI: bio singkat 2-4 kalimat]`
- `[ISI: daftar skill per kategori]`
- `[ISI: pengalaman/organisasi/magang]`
- `[ISI: foto profil]`
- `[ISI: CV/resume PDF]`

Gunakan placeholder yang jelas di UI (bukan data fiktif) untuk field yang belum terisi, misalnya teks abu-abu "Segera diisi" atau komentar `{/* TODO: isi bio */}`.

---

## 1. Setup Proyek

```bash
npx create-next-app@latest portofolio-bagas
```

Jawaban prompt:
- TypeScript → Yes
- ESLint → Yes
- Tailwind CSS → Yes
- `src/` directory → Yes
- App Router → Yes
- Import alias `@/*` → Yes (default)

Install dependency tambahan:

```bash
cd portofolio-bagas
npm install framer-motion next-themes lucide-react react-fast-marquee
```

Fungsi masing-masing:
- `framer-motion` — animasi scroll-reveal antar section
- `next-themes` — toggle dark/light mode
- `lucide-react` — icon set
- `react-fast-marquee` — teks berjalan di bawah hero

---

## 2. Struktur Folder

```
src/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
├── components/
│   ├── navbar.tsx
│   ├── footer.tsx
│   ├── hero.tsx
│   ├── about.tsx
│   ├── services.tsx
│   ├── works.tsx
│   ├── skills.tsx
│   ├── experience.tsx
│   ├── faq.tsx
│   └── theme-toggle.tsx
├── data/
│   ├── projects.ts
│   ├── skills.ts
│   └── experience.ts
└── lib/
    └── use-local-time.ts
```

Jika `create-next-app` tidak membuat folder `src` (opsi dijawab No), hapus prefix `src/` dari semua path di atas dan di seluruh dokumen ini.

---

## 3. Design Tokens

Di `tailwind.config.ts`, definisikan warna via CSS variable supaya gampang toggle dark/light:

```ts
theme: {
  extend: {
    colors: {
      background: "hsl(var(--background))",
      foreground: "hsl(var(--foreground))",
      primary: "hsl(var(--primary))",
      muted: "hsl(var(--muted))",
    },
  },
}
```

Di `app/globals.css`, deklarasikan variable untuk mode terang dan gelap:

```css
:root {
  --background: 0 0% 100%;
  --foreground: 222 47% 11%;
  --primary: 221 83% 53%;
  --muted: 210 40% 96%;
}

.dark {
  --background: 222 47% 6%;
  --foreground: 210 40% 98%;
  --primary: 217 91% 60%;
  --muted: 217 33% 17%;
}
```

Font: gunakan `next/font/google` (mis. `Inter` atau `Geist`) di `layout.tsx`, terapkan sebagai font default via `className` di tag `<body>`.

---

## 4. Data Files

### `src/data/projects.ts`

```ts
export type Project = {
  title: string;
  description: string;
  stack: string[];
  image: string;
  link?: string;
  repo?: string;
};

export const projects: Project[] = [
  {
    title: "Sistem Parkir Mall (E-Parking)",
    description:
      "Sistem manajemen parkir bergaya mall. Sisi web dibangun lebih dulu dengan Laravel, integrasi IoT menyusul.",
    stack: ["Laravel", "MySQL", "Tailwind CSS"],
    image: "/projects/e-parking.png",
  },
  {
    title: "Sistem Peringatan Dini Banjir",
    description:
      "Tugas akhir non-skripsi — sistem IoT untuk deteksi dan peringatan dini banjir, disertai publikasi jurnal.",
    stack: ["IoT", "Next.js", "Node.js"],
    image: "/projects/flood-warning.png",
  },
  // [ISI: tambahkan proyek lain jika ada]
];
```

### `src/data/skills.ts`

```ts
export type SkillGroup = {
  category: string;
  items: string[];
};

export const skills: SkillGroup[] = [
  { category: "Frontend", items: ["Next.js", "React", "Tailwind CSS"] },
  { category: "Backend", items: ["Laravel", "[ISI: skill backend lain]"] },
  { category: "IoT / Hardware", items: ["[ISI: mis. Arduino, ESP32, sensor]"] },
  { category: "Tools", items: ["[ISI: Figma, Git, dll]"] },
];
```

### `src/data/experience.ts`

```ts
export type Experience = {
  role: string;
  place: string;
  period: string;
  description: string;
};

export const experience: Experience[] = [
  // [ISI: organisasi, magang, kepanitiaan, atau proyek freelance dengan timeline]
];
```

### `src/lib/use-local-time.ts`

Hook untuk menampilkan jam lokal Samarinda real-time di footer:

```ts
"use client";
import { useEffect, useState } from "react";

export function useLocalTime(timeZone = "Asia/Makassar") {
  const [time, setTime] = useState("");

  useEffect(() => {
    const update = () => {
      setTime(
        new Intl.DateTimeFormat("id-ID", {
          timeZone,
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        }).format(new Date())
      );
    };
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, [timeZone]);

  return time;
}
```

---

## 5. Komponen — Spesifikasi Tiap Bagian

### Navbar (`components/navbar.tsx`)
- Logo/nama singkat, sticky di atas
- Link anchor: `#about`, `#services`, `#works`, `#skills`, `#experience`, `#faq`
- Tombol bahasa ID/EN (boleh statis dulu jika i18n penuh belum diperlukan)
- Toggle dark/light (pakai `next-themes`, gunakan `theme-toggle.tsx` dengan icon `lucide-react`)
- Tombol "Kontak" mengarah ke WhatsApp `[ISI: nomor WA]`

### Hero (`components/hero.tsx`)
- Badge status: "Terbuka untuk Kerja • Samarinda, ID"
- Nama besar: "Bagas Aditya" (atau nama lengkap `[ISI]`)
- Foto/avatar `[ISI: foto profil]` (pakai placeholder inisial "BA" jika belum ada)
- Deskripsi singkat 2-3 kalimat `[ISI: bio]`
- Badge tech stack (ambil dari `skills.ts`)
- Tombol CTA: "Lihat Proyek" (scroll ke `#works`), "Resume/CV" (link ke PDF `[ISI]`), "WhatsApp"
- Marquee teks berjalan di bawah hero, pakai `react-fast-marquee`, isi contoh:
  `PIXEL-PERFECT UI ✦ NEXT.JS & LARAVEL ✦ TAILWIND CSS ✦ SAMARINDA • KALIMANTAN TIMUR ✦`

### About (`components/about.tsx`)
- Bio lengkap `[ISI]`
- Info pendidikan: Teknik Informatika, STMIK Widya Cipta Dharma, NIM 2343074

### Services (`components/services.tsx`)
- Kartu jasa/keahlian yang ditawarkan (mis. "Pengembangan Web Fullstack", "Integrasi IoT", "Slicing Figma ke Kode") — `[ISI: sesuaikan]`

### Works (`components/works.tsx`)
- Grid/list dari `projects.ts`: gambar, judul, deskripsi, badge stack, link demo/repo jika ada

### Skills (`components/skills.tsx`)
- Render `skills.ts` per kategori, tampilkan sebagai badge atau progress bar

### Experience (`components/experience.tsx`)
- Timeline dari `experience.ts`, urutkan dari terbaru

### FAQ (`components/faq.tsx`)
- Accordion, isi 3-5 pertanyaan umum (mis. "Apakah tersedia untuk kerja remote?", "Stack yang paling dikuasai?") — `[ISI]`

### Footer (`components/footer.tsx`)
- Ringkasan singkat diri
- Navigasi ulang (sama seperti navbar)
- Link sosial: GitHub, LinkedIn, WhatsApp `[ISI semua link]`
- Jam lokal real-time Samarinda (pakai `useLocalTime()`)
- Copyright dinamis: `© {new Date().getFullYear()} Bagas Aditya. Hak Cipta Terpelihara.`

---

## 6. Interaktivitas & Animasi

- Scroll-reveal tiap section pakai `framer-motion` (`whileInView`, `initial`, `animate`)
- Smooth scroll untuk semua anchor link (`scroll-behavior: smooth` di CSS atau library)
- Transisi halus saat toggle dark/light (`transition-colors duration-300` di elemen utama)
- Semua elemen interaktif (accordion, toggle, marquee) harus tetap lancar di layar mobile

---

## 7. SEO & Deploy

- Isi metadata di `app/layout.tsx`: `title`, `description`, `openGraph`, `og:image`
- Optimasi semua gambar dengan `next/image`
- Uji responsivitas di breakpoint mobile, tablet, desktop
- Deploy ke Vercel: hubungkan repo GitHub, set root directory jika perlu, deploy otomatis dari branch `main`

---

## 8. Checklist Konten yang Masih Perlu Diisi Pemilik

- [ ] Email
- [ ] Nomor WhatsApp
- [ ] Link GitHub
- [ ] Link LinkedIn
- [ ] Bio singkat (hero + about)
- [ ] Daftar skill lengkap per kategori
- [ ] Data pengalaman/organisasi/magang
- [ ] Foto profil
- [ ] File CV/resume (PDF)
- [ ] Konfirmasi proyek tambahan selain E-Parking & Sistem Peringatan Dini Banjir
- [ ] Isi FAQ (3-5 pertanyaan)
- [ ] Isi daftar layanan/jasa
