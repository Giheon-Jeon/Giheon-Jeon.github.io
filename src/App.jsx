import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import AnimatedBackground from "./AnimatedBackground.jsx";
import LinkCard from "./LinkCard.jsx";
import { profile, links, emails, socials } from "./links.js";

const ICONS = {
  instagram: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
      <path d="M12 2.2c3.2 0 3.6 0 4.9.07 1.2.06 2.1.24 2.9.55.7.27 1.3.65 1.9 1.25.6.6 1 1.2 1.25 1.9.3.8.48 1.7.55 2.9.06 1.3.07 1.7.07 4.9s0 3.6-.07 4.9c-.06 1.2-.24 2.1-.55 2.9-.27.7-.65 1.3-1.25 1.9-.6.6-1.2 1-1.9 1.25-.8.3-1.7.48-2.9.55-1.3.06-1.7.07-4.9.07s-3.6 0-4.9-.07c-1.2-.06-2.1-.24-2.9-.55-.7-.27-1.3-.65-1.9-1.25-.6-.6-1-1.2-1.25-1.9-.3-.8-.48-1.7-.55-2.9C2.2 15.6 2.2 15.2 2.2 12s0-3.6.07-4.9c.06-1.2.24-2.1.55-2.9.27-.7.65-1.3 1.25-1.9.6-.6 1.2-1 1.9-1.25.8-.3 1.7-.48 2.9-.55C8.4 2.2 8.8 2.2 12 2.2zm0 1.8c-3.15 0-3.5 0-4.75.07-1 .05-1.6.2-1.98.35-.5.19-.86.42-1.24.8-.38.38-.6.74-.8 1.24-.14.38-.3 1-.35 1.98C2.8 8.5 2.8 8.85 2.8 12s0 3.5.07 4.75c.05 1 .2 1.6.35 1.98.19.5.42.86.8 1.24.38.38.74.6 1.24.8.38.14 1 .3 1.98.35 1.25.07 1.6.07 4.75.07s3.5 0 4.75-.07c1-.05 1.6-.2 1.98-.35.5-.19.86-.42 1.24-.8.38-.38.6-.74.8-1.24.14-.38.3-1 .35-1.98.07-1.25.07-1.6.07-4.75s0-3.5-.07-4.75c-.05-1-.2-1.6-.35-1.98-.19-.5-.42-.86-.8-1.24-.38-.38-.74-.6-1.24-.8-.38-.14-1-.3-1.98-.35C15.5 4 15.15 4 12 4zm0 3.4a4.6 4.6 0 110 9.2 4.6 4.6 0 010-9.2zm0 1.8a2.8 2.8 0 100 5.6 2.8 2.8 0 000-5.6zm5.85-2a1.08 1.08 0 11-2.16 0 1.08 1.08 0 012.16 0z" />
    </svg>
  ),
  github: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
      <path d="M12 2C6.48 2 2 6.58 2 12.19c0 4.49 2.87 8.3 6.84 9.64.5.1.68-.22.68-.49 0-.24-.01-1.04-.01-1.88-2.78.61-3.37-1.21-3.37-1.21-.46-1.19-1.11-1.51-1.11-1.51-.91-.63.07-.62.07-.62 1 .07 1.53 1.05 1.53 1.05.89 1.56 2.34 1.11 2.91.85.09-.66.35-1.11.63-1.37-2.22-.26-4.56-1.14-4.56-5.06 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.31.1-2.72 0 0 .84-.28 2.75 1.05a9.3 9.3 0 015 0c1.91-1.33 2.75-1.05 2.75-1.05.55 1.41.2 2.46.1 2.72.64.72 1.03 1.63 1.03 2.75 0 3.93-2.34 4.79-4.57 5.05.36.32.68.94.68 1.9 0 1.37-.01 2.47-.01 2.81 0 .27.18.6.69.49A10.02 10.02 0 0022 12.19C22 6.58 17.52 2 12 2z" />
    </svg>
  ),
  email: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-5 h-5">
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3 7l9 6 9-6" />
    </svg>
  ),
};

export default function App() {
  const [toast, setToast] = useState(null);

  const showToast = (message) => {
    setToast(message);
    window.clearTimeout(showToast._t);
    showToast._t = window.setTimeout(() => setToast(null), 1800);
  };

  const copyEmail = async (address) => {
    try {
      await navigator.clipboard.writeText(address);
      showToast(`${address} 복사되었어요 ✨`);
    } catch {
      showToast("복사에 실패했어요. 다시 시도해주세요.");
    }
  };

  return (
    <div className="relative min-h-[100dvh] flex items-center justify-center p-6 font-pretendard">
      <AnimatedBackground />

      <motion.main
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative w-full max-w-[420px] bg-white/70 backdrop-blur-md rounded-3xl shadow-xl shadow-orange-900/10 ring-1 ring-white/60 p-8 sm:p-10 flex flex-col gap-8"
      >
        <section className="flex flex-col items-center text-center gap-3">
          <motion.img
            src={profile.avatar}
            alt="프로필 사진"
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            whileTap={{ scale: 0.92, rotate: -6 }}
            className="w-24 h-24 rounded-full object-cover ring-4 ring-white shadow-md"
          />
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.5 }}
          >
            <h1 className="text-lg font-bold text-stone-800">{profile.name}</h1>
            <p className="mt-1 text-sm text-stone-500 leading-relaxed">
              {profile.bio}
              <br />
              {profile.subBio}
            </p>
          </motion.div>
        </section>

        <section className="flex flex-col gap-3">
          {links.map((link, i) => (
            <LinkCard key={link.id} link={link} index={i} />
          ))}

          <div className="flex gap-3">
            {emails.map((e, i) => (
              <motion.button
                key={e.id}
                type="button"
                onClick={() => copyEmail(e.address)}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 + (links.length + i) * 0.08, duration: 0.5, ease: "easeOut" }}
                whileTap={{ scale: 0.96 }}
                className="flex-1 flex items-center justify-center gap-1.5 rounded-2xl bg-white/80 text-stone-800 font-medium py-3.5 px-3 text-xs sm:text-sm ring-1 ring-stone-200"
              >
                {e.emoji} {e.label}
              </motion.button>
            ))}
          </div>
        </section>

        <section className="flex flex-col items-center gap-4 pt-2 border-t border-stone-200/70">
          <div className="flex items-center gap-5 pt-4">
            {socials.map((s, i) => (
              <motion.a
                key={s.id}
                href={s.href}
                target={s.id === "email" ? undefined : "_blank"}
                rel="noopener noreferrer"
                aria-label={s.label}
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.7 + i * 0.06, type: "spring", stiffness: 260, damping: 16 }}
                whileHover={{ y: -3, opacity: 0.75 }}
                whileTap={{ scale: 0.85 }}
                className="text-stone-600"
              >
                {ICONS[s.id]}
              </motion.a>
            ))}
          </div>
          <p className="text-xs text-stone-400">
            © {new Date().getFullYear()} {profile.name}. All rights reserved.
          </p>
        </section>
      </motion.main>

      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 12, x: "-50%" }}
            animate={{ opacity: 1, y: 0, x: "-50%" }}
            exit={{ opacity: 0, y: 12, x: "-50%" }}
            className="fixed bottom-8 left-1/2 bg-stone-800 text-white text-xs font-medium px-4 py-2.5 rounded-full shadow-lg z-50"
          >
            {toast}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
