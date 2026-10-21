export type SkillItem = {
  name: string;
  symbol: string;
};

export type SkillGroup = {
  category: string;
  items: SkillItem[];
};

export const skills: SkillGroup[] = [
  {
    category: "Frontend",
    items: [
      { name: "Next.js", symbol: "Nx" },
      { name: "React", symbol: "Rc" },
      { name: "Tailwind CSS", symbol: "Tw" },
      { name: "TypeScript", symbol: "Ts" },
      { name: "JavaScript", symbol: "Js" },
    ],
  },
  {
    category: "Backend",
    items: [
      { name: "Laravel", symbol: "Lv" },
      { name: "PHP", symbol: "Ph" },
      { name: "Node.js", symbol: "Nd" },
      { name: "MySQL", symbol: "My" },
      { name: "REST API", symbol: "Ra" },
    ],
  },
  {
    category: "IoT / Hardware",
    items: [
      { name: "Arduino", symbol: "Ar" },
      { name: "ESP32", symbol: "E3" },
      { name: "Integrasi Sensor", symbol: "Sn" },
    ],
  },
  {
    category: "Tools",
    items: [
      { name: "Figma", symbol: "Fg" },
      { name: "Git", symbol: "Gt" },
      { name: "GitHub", symbol: "Gb" },
      { name: "VS Code", symbol: "Vc" },
      { name: "Postman", symbol: "Pm" },
    ],
  },
];
