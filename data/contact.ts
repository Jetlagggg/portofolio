export const contact = {
  whatsapp: "6285173163034",
  email: "yoshuapandawinatha@gmail.com",
  linkedin: "https://www.linkedin.com/in/yoshua-pandawinatha-090597262/",
  github: "https://github.com/Jetlagggg",
  cv: "",
};

export function waHref(): string | null {
  const raw = contact.whatsapp.replace(/[^0-9]/g, "");
  return raw ? `https://wa.me/${raw}` : null;
}

export function mailHref(): string | null {
  return contact.email ? `mailto:${contact.email}` : null;
}
