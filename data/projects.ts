export type Project = {
  title: string;
  description: string;
  stack: string[];
  link?: string;
  repo?: string;
};

export const projects: Project[] = [
  {
    title: "Track Surat PUPR",
    description:
      "Aplikasi pelacakan surat untuk Dinas PUPR, dibangun dengan Laravel.",
    stack: ["Laravel", "Blade", "PHP"],
    repo: "https://github.com/Jetlagggg/track-suratPUPR",
  },
  {
    title: "Sistem Keuangan Kecamatan Nyuatan",
    description:
      "Sistem informasi pengelolaan keuangan untuk kantor Kecamatan Nyuatan.",
    stack: ["Laravel", "Blade", "PHP"],
    repo: "https://github.com/Jetlagggg/sistem-keuangan-kecamatan-nyuatan2",
  },
  {
    title: "Desain Ulang SIAK",
    description:
      "Desain ulang dan pengembangan sistem informasi akademik (SIAK).",
    stack: ["Laravel", "Blade", "PHP"],
    repo: "https://github.com/Jetlagggg/redesign-siak",
  },
  {
    title: "Aplikasi Kasir Laravel",
    description:
      "Sistem kasir (point of sale) berbasis web menggunakan Laravel.",
    stack: ["Laravel", "Blade", "PHP"],
    repo: "https://github.com/Jetlagggg/Projek-kasir-laravel",
  },
  {
    title: "Auto Kuesioner Dosen Wicida",
    description:
      "Ekstensi browser JavaScript untuk mengisi kuesioner dosen secara otomatis, khusus untuk mahasiswa Wicida.",
    stack: ["JavaScript", "Ekstensi Browser"],
    repo: "https://github.com/Jetlagggg/auto_kuesioner_dosen_wicida",
  }
];
