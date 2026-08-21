import { useCallback, useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

const BLOBS = [
  { size: 420, color: "#f6c98f", top: "-10%", left: "-15%", duration: 22, x: [0, 40, -10, 0], y: [0, 30, 60, 0] },
  { size: 360, color: "#f0a97a", top: "55%", left: "60%", duration: 26, x: [0, -30, 20, 0], y: [0, -40, -10, 0] },
  { size: 300, color: "#ffe3b8", top: "70%", left: "-10%", duration: 19, x: [0, 25, -20, 0], y: [0, -25, 15, 0] },
  { size: 260, color: "#e8b88f", top: "5%", left: "70%", duration: 24, x: [0, -20, 30, 0], y: [0, 35, -15, 0] },
];

export default function AnimatedBackground() {
  const containerRef = useRef(null);
  const [ripples, setRipples] = useState([]);
  const rippleId = useRef(0);

  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const springX = useSpring(pointerX, { stiffness: 40, damping: 20, mass: 0.6 });
  const springY = useSpring(pointerY, { stiffness: 40, damping: 20, mass: 0.6 });

  const parallaxX = useTransform(springX, [-1, 1], [-18, 18]);
  const parallaxY = useTransform(springY, [-1, 1], [-18, 18]);
  const tiltX = useTransform(springY, [-1, 1], [4, -4]);
  const tiltY = useTransform(springX, [-1, 1], [-4, 4]);

  const updatePointer = useCallback((clientX, clientY) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const nx = ((clientX - rect.left) / rect.width) * 2 - 1;
    const ny = ((clientY - rect.top) / rect.height) * 2 - 1;
    pointerX.set(Math.max(-1, Math.min(1, nx)));
    pointerY.set(Math.max(-1, Math.min(1, ny)));
  }, [pointerX, pointerY]);

  useEffect(() => {
    const handleMove = (e) => updatePointer(e.clientX, e.clientY);
    const handleTouch = (e) => {
      if (e.touches[0]) updatePointer(e.touches[0].clientX, e.touches[0].clientY);
    };
    window.addEventListener("pointermove", handleMove);
    window.addEventListener("touchmove", handleTouch, { passive: true });
    return () => {
      window.removeEventListener("pointermove", handleMove);
      window.removeEventListener("touchmove", handleTouch);
    };
  }, [updatePointer]);

  const spawnRipple = (e) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const point = e.touches ? e.touches[0] : e;
    const x = point.clientX - rect.left;
    const y = point.clientY - rect.top;
    const id = rippleId.current++;
    setRipples((prev) => [...prev, { id, x, y }]);
    updatePointer(point.clientX, point.clientY);
  };

  const removeRipple = (id) => {
    setRipples((prev) => prev.filter((r) => r.id !== id));
  };

  return (
    <div
      ref={containerRef}
      onPointerDown={spawnRipple}
      className="fixed inset-0 -z-10 overflow-hidden bg-[#fdf6ec]"
      aria-hidden="true"
    >
      <motion.div
        style={{ x: parallaxX, y: parallaxY, rotateX: tiltX, rotateY: tiltY }}
        className="absolute inset-0 [transform-style:preserve-3d]"
      >
        {BLOBS.map((blob, i) => (
          <motion.div
            key={i}
            animate={{ x: blob.x, y: blob.y, scale: [1, 1.08, 0.96, 1] }}
            transition={{
              duration: blob.duration,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{
              position: "absolute",
              top: blob.top,
              left: blob.left,
              width: blob.size,
              height: blob.size,
              borderRadius: "9999px",
              background: `radial-gradient(circle at 35% 35%, ${blob.color}, transparent 70%)`,
              filter: "blur(40px)",
              opacity: 0.7,
            }}
          />
        ))}
      </motion.div>

      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#fdf6ec]/10 to-[#f3d9b8]/40" />

      <div
        className="absolute inset-0 opacity-[0.05] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />

      {ripples.map((r) => (
        <motion.span
          key={r.id}
          initial={{ opacity: 0.45, scale: 0 }}
          animate={{ opacity: 0, scale: 1 }}
          transition={{ duration: 1.1, ease: "easeOut" }}
          onAnimationComplete={() => removeRipple(r.id)}
          style={{
            position: "absolute",
            left: r.x,
            top: r.y,
            width: 220,
            height: 220,
            marginLeft: -110,
            marginTop: -110,
            borderRadius: "9999px",
            border: "1.5px solid #c98a4f",
            pointerEvents: "none",
          }}
        />
      ))}
    </div>
  );
}
