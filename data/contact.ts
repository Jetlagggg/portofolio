export const contact = {
  whatsapp: "",
  email: "",
  linkedin: "",
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
