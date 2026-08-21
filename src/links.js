export const profile = {
  name: "전기헌 Jeon GiHeon",
  bio: "일상을 남깁니다 🌿",
  subBio: "아래에서 제 다른 공간들을 만나보세요",
  avatar: "https://placehold.co/160x160/f3d9b8/6b4423?text=%3A%29&font=roboto",
};

export const links = [
  { id: "instagram", label: "Instagram", emoji: "📷", href: "https://instagram.com/gyeon.rus", tone: "dark" },
  { id: "blog", label: "블로그", emoji: "✍️", href: "https://blog.naver.com/jgh030814", tone: "light" },
  { id: "github", label: "GitHub", emoji: "💻", href: "https://github.com/Giheon-Jeon", tone: "light" },
];

export const emails = [
  { id: "personal", label: "개인 이메일 복사", emoji: "✉️", address: "jgh030814@gmail.com" },
  { id: "school", label: "학교 이메일 복사", emoji: "🎓", address: "jgh030814@mju.ac.kr" },
];

export const socials = [
  { id: "instagram", href: "https://instagram.com/gyeon.rus", label: "Instagram" },
  { id: "github", href: "https://github.com/Giheon-Jeon", label: "GitHub" },
  { id: "email", href: `mailto:${emails[0].address}`, label: "이메일" },
];
