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
    title: "Track Surat PUPR",
    description:
      "Aplikasi pelacakan surat untuk dinas PUPR yang dibangun dengan Laravel.",
    stack: ["Laravel", "Blade", "PHP"],
    image: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&w=800&q=80",
    repo: "https://github.com/Jetlagggg/track-suratPUPR",
  },
  {
    title: "Sistem Keuangan Kecamatan Nyuatan",
    description:
      "Sistem informasi pengelolaan keuangan untuk kantor Kecamatan Nyuatan.",
    stack: ["Laravel", "Blade", "PHP"],
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80",
    repo: "https://github.com/Jetlagggg/sistem-keuangan-kecamatan-nyuatan2",
  },
  {
    title: "Redesign SIAK",
    description:
      "Proyek desain ulang dan pengembangan sistem informasi akademik (SIAK).",
    stack: ["Laravel", "Blade", "PHP"],
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80",
    repo: "https://github.com/Jetlagggg/redesign-siak",
  },
  {
    title: "Projek Kasir Laravel",
    description:
      "Aplikasi Point of Sales (POS) atau sistem kasir berbasis web menggunakan Laravel.",
    stack: ["Laravel", "Blade", "PHP"],
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=800&q=80",
    repo: "https://github.com/Jetlagggg/Projek-kasir-laravel",
  },
  {
    title: "Auto Kuesioner Dosen Wicida",
    description:
      "Ekstensi browser JavaScript untuk mengisi kuesioner dosen secara otomatis, khusus untuk mahasiswa Wicida.",
    stack: ["JavaScript", "Browser Extension"],
    image: "https://images.unsplash.com/photo-1614332287897-cdc485fa562d?auto=format&fit=crop&w=800&q=80",
    repo: "https://github.com/Jetlagggg/auto_kuesioner_dosen_wicida",
  }
];
