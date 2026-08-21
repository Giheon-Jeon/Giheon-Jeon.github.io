import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

export default function LinkCard({ link, index }) {
  const cardRef = useRef(null);
  const mvX = useMotionValue(0);
  const mvY = useMotionValue(0);
  const springX = useSpring(mvX, { stiffness: 300, damping: 20 });
  const springY = useSpring(mvY, { stiffness: 300, damping: 20 });
  const rotateX = useTransform(springY, [-0.5, 0.5], [8, -8]);
  const rotateY = useTransform(springX, [-0.5, 0.5], [-8, 8]);

  const handlePointerMove = (e) => {
    if (e.pointerType !== "mouse") return;
    const rect = cardRef.current.getBoundingClientRect();
    mvX.set((e.clientX - rect.left) / rect.width - 0.5);
    mvY.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handlePointerLeave = () => {
    mvX.set(0);
    mvY.set(0);
  };

  const isDark = link.tone === "dark";

  return (
    <motion.a
      ref={cardRef}
      href={link.href}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ y: 24 }}
      animate={{ y: 0 }}
      transition={{ delay: 0.35 + index * 0.08, duration: 0.5, ease: "easeOut" }}
      whileTap={{ scale: 0.96 }}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      style={{ rotateX, rotateY, transformPerspective: 500 }}
      className={`group relative flex items-center justify-center gap-2 w-full rounded-2xl py-3.5 px-5 text-sm sm:text-base font-medium select-none
        ${isDark ? "bg-stone-800 text-white" : "bg-white/80 text-stone-800 ring-1 ring-stone-200"}`}
    >
      <span
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: isDark
            ? "radial-gradient(120px circle at var(--mx,50%) var(--my,50%), rgba(255,255,255,0.15), transparent 70%)"
            : "radial-gradient(120px circle at var(--mx,50%) var(--my,50%), rgba(233,168,96,0.25), transparent 70%)",
        }}
        onPointerMove={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          e.currentTarget.style.setProperty("--mx", `${e.clientX - rect.left}px`);
          e.currentTarget.style.setProperty("--my", `${e.clientY - rect.top}px`);
        }}
      />
      <span className="relative">{link.emoji}</span>
      <span className="relative">{link.label}</span>
    </motion.a>
  );
}
