import { useState, useRef, useCallback } from "react";
import type { FormEvent, MouseEvent } from "react";
import { motion, AnimatePresence, useMotionValue } from "framer-motion";
import { Mail, Github, Linkedin, Twitter, Send, CheckCircle, ArrowRight } from "lucide-react";
import { Section } from "./Section";
import { resumeData } from "../data/resume";

// ─── 3D Tilt Card ────────────────────────────────────────────────────────────

const TiltFormCard = ({ children }: { children: React.ReactNode }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);

  const handleMouseMove = useCallback((e: MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const { left, top, width, height } = card.getBoundingClientRect();
    const cx = left + width / 2, cy = top + height / 2;
    const dx = (e.clientX - cx) / (width / 2);
    const dy = (e.clientY - cy) / (height / 2);
    rotateY.set(dx * 7);
    rotateX.set(-dy * 5);
  }, [rotateX, rotateY]);

  const handleMouseLeave = useCallback(() => {
    rotateX.set(0);
    rotateY.set(0);
  }, [rotateX, rotateY]);

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformPerspective: 900 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      {children}
    </motion.div>
  );
};

// ─── Social Icons ─────────────────────────────────────────────────────────────

const socialLinks = [
  { name: "GitHub", icon: Github, href: resumeData?.personal?.social?.find((s: { name: string }) => s.name === "GitHub")?.url ?? "#" },
  { name: "LinkedIn", icon: Linkedin, href: resumeData?.personal?.social?.find((s: { name: string }) => s.name === "LinkedIn")?.url ?? "#" },
  { name: "Email", icon: Mail, href: `mailto:${resumeData?.personal?.email ?? ""}` },
  { name: "Twitter", icon: Twitter, href: resumeData?.personal?.social?.find((s: { name: string }) => s.name === "Twitter")?.url ?? "#" },
];

const SocialButton = ({
  href, icon: Icon, name, delay,
}: { href: string; icon: React.ElementType; name: string; delay: number }) => (
  <motion.a
    href={href}
    target={href.startsWith("mailto") ? undefined : "_blank"}
    rel="noopener noreferrer"
    aria-label={name}
    initial={{ opacity: 0, y: 16 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay, duration: 0.45, ease: "easeOut" }}
    whileHover={{ y: -3, scale: 1.1 }}
    whileTap={{ scale: 0.94 }}
    className="relative group w-11 h-11 rounded-xl flex items-center justify-center
               border border-[var(--border-card)] bg-[var(--bg-card)]
               hover:border-[var(--accent-primary)]/60 hover:bg-[var(--accent-primary)]/10
               transition-colors duration-300 overflow-hidden"
  >
    {/* glow ripple */}
    <span className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100
                     transition-opacity duration-300"
      style={{ boxShadow: "0 0 18px rgba(0,230,255,0.35) inset" }} />
    <Icon size={18} className="relative z-10 text-[var(--text-secondary)]
                                group-hover:text-[var(--accent-primary)] transition-colors duration-300" />
  </motion.a>
);

// ─── Floating Label Input ─────────────────────────────────────────────────────

const FloatingInput = ({
  id, label, type = "text", value, onChange, textarea, maxLength,
}: {
  id: string; label: string; type?: string;
  value: string; onChange: (v: string) => void;
  textarea?: boolean; maxLength?: number;
}) => {
  const filled = value.length > 0;
  const Tag = textarea ? "textarea" : "input";

  return (
    <div className="relative group">
      <Tag
        id={id}
        type={textarea ? undefined : type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={textarea ? 5 : undefined}
        maxLength={maxLength}
        placeholder=" "
        required
        className={`w-full px-5 pt-6 pb-3 rounded-2xl resize-none outline-none
          bg-[var(--bg-primary)]/60 border border-[var(--border-card)]
          text-[var(--text-primary)] text-sm
          focus:border-[var(--accent-primary)]/70
          focus:shadow-[0_0_0_3px_rgba(0,230,255,0.12)]
          hover:border-[var(--border-card-hover)]
          transition-all duration-300 placeholder-transparent
          ${textarea ? "min-h-[130px]" : "h-14"}`}
        style={{ fontFamily: "inherit" }}
      />
      <label
        htmlFor={id}
        className={`absolute left-5 pointer-events-none transition-all duration-250 origin-left
          ${filled || true ? "" : ""}
          text-[var(--text-tertiary)] group-focus-within:text-[var(--accent-primary)]
          top-2 text-[11px] font-medium tracking-wide uppercase`}
        style={{
          top: filled ? "8px" : "16px",
          fontSize: filled ? "10px" : "13px",
        }}
      >
        {label}
      </label>
      {maxLength && (
        <span className="absolute bottom-3 right-4 text-[10px] text-[var(--text-tertiary)]">
          {value.length}/{maxLength}
        </span>
      )}
    </div>
  );
};

// ─── Submit Button States ─────────────────────────────────────────────────────

type Status = "idle" | "submitting" | "success" | "error";

const LoadingDots = () => (
  <div className="flex gap-1.5 items-center">
    {[0, 1, 2].map((i) => (
      <motion.span
        key={i}
        className="w-1.5 h-1.5 rounded-full bg-white"
        animate={{ scale: [0.6, 1, 0.6], opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 1, repeat: Infinity, delay: i * 0.18, ease: "easeInOut" }}
      />
    ))}
  </div>
);

// ─── Main Contact Component ────────────────────────────────────────────────────

export const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<Status>("idle");

  const set = (k: keyof typeof form) => (v: string) =>
    setForm((p) => ({ ...p, [k]: v }));

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    try {
      const fd = new FormData();
      fd.append("access_key", "aaa0e490-4072-46e0-83aa-95d316249dcd");
      fd.append("name", form.name);
      fd.append("email", form.email);
      fd.append("message", form.message);
      const res = await fetch("https://api.web3forms.com/submit", { method: "POST", body: fd });
      const data = await res.json();
      if (data.success) {
        setStatus("success");
        setForm({ name: "", email: "", message: "" });
        setTimeout(() => setStatus("idle"), 5000);
      } else {
        setStatus("error");
        setTimeout(() => setStatus("idle"), 3000);
      }
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 3000);
    }
  };

  const btnVariants = {
    idle: { background: "linear-gradient(135deg, #00bcd4, #0077ff)" },
    submitting: { background: "rgba(255,255,255,0.08)" },
    success: { background: "linear-gradient(135deg, #22c55e, #16a34a)" },
    error: { background: "linear-gradient(135deg, #ef4444, #b91c1c)" },
  };

  return (
    <Section id="contact" className="mb-20 relative overflow-hidden bg-transparent">

      {/* ── Section header ── */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.55, ease: "easeOut" }}
        className="text-center mb-12"
      >
        <p className="text-[11px] font-semibold tracking-[4px] uppercase text-[var(--accent-primary)] mb-3">
          Contact
        </p>
        <div className="w-8 h-px bg-[var(--accent-primary)]/40 mx-auto" />
      </motion.div>

      {/* ── Two-column grid ── */}
      <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto relative z-10">

        {/* ───── LEFT SIDE ───── */}
        <motion.div
          initial={{ opacity: 0, x: -28 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
          className="flex flex-col justify-between gap-8 py-2"
        >
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-[var(--text-primary)] leading-[1.12] mb-5">
              Let's Build<br />
              Something{" "}
              <span
                className="text-gradient"
                style={{
                  background: "linear-gradient(90deg, var(--accent-primary), #0077ff)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Powerful
              </span>
            </h2>
            <p className="text-[var(--text-secondary)] text-base leading-relaxed max-w-xs">
              Open to collaborations, full-time roles, and interesting side
              projects. I typically reply within 24 hours.
            </p>
          </div>

          {/* Social icons */}
          <div>
            <p className="text-[10px] tracking-[3px] uppercase text-[var(--text-tertiary)] font-medium mb-4">
              Connect
            </p>
            <div className="flex gap-3">
              {socialLinks.map((s, i) => (
                <SocialButton key={s.name} {...s} delay={0.15 + i * 0.07} />
              ))}
            </div>
          </div>

          {/* Anne AI hint */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.45 }}
            className="group flex items-center gap-3 px-4 py-3 rounded-2xl cursor-pointer
                       border border-[var(--border-card)] bg-[var(--bg-card)]
                       hover:border-[var(--accent-primary)]/40 hover:bg-[var(--accent-primary)]/5
                       transition-all duration-300 w-fit"
          >
            {/* pulsing dot */}
            <span className="relative flex h-2 w-2 flex-shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full
                               bg-[var(--accent-primary)] opacity-60" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--accent-primary)]" />
            </span>
            <span className="text-xs text-[var(--text-secondary)]">
              Or chat with{" "}
              <span className="text-[var(--accent-primary)] font-semibold">Anne</span>
              , my AI assistant
            </span>
            <ArrowRight
              size={13}
              className="text-[var(--text-tertiary)] group-hover:text-[var(--accent-primary)]
                         group-hover:translate-x-0.5 transition-all duration-300"
            />
          </motion.div>
        </motion.div>

        {/* ───── RIGHT SIDE — Glass Form ───── */}
        <motion.div
          initial={{ opacity: 0, x: 28 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
        >
          <TiltFormCard>
            <div
              className="rounded-3xl border border-[var(--border-card)] p-7 md:p-9
                         hover:border-[var(--border-card-hover)] transition-colors duration-500"
              style={{
                background:
                  "linear-gradient(135deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.03) 100%)",
                backdropFilter: "blur(20px)",
                WebkitBackdropFilter: "blur(20px)",
              }}
            >
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <FloatingInput
                  id="name" label="Your Name"
                  value={form.name} onChange={set("name")}
                />
                <FloatingInput
                  id="email" label="Your Email" type="email"
                  value={form.email} onChange={set("email")}
                />
                <FloatingInput
                  id="message" label="Message" textarea
                  value={form.message} onChange={set("message")} maxLength={400}
                />

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  disabled={status === "submitting"}
                  variants={btnVariants}
                  animate={status}
                  whileHover={status === "idle" ? { scale: 1.02, y: -1 } : {}}
                  whileTap={status === "idle" ? { scale: 0.97 } : {}}
                  transition={{ duration: 0.3 }}
                  className="relative mt-1 w-full h-13 rounded-2xl font-semibold text-sm text-white
                             flex items-center justify-center gap-2 overflow-hidden
                             disabled:cursor-wait"
                  style={{
                    boxShadow:
                      status === "idle"
                        ? "0 0 28px rgba(0,184,255,0.25), 0 8px 24px rgba(0,119,255,0.2)"
                        : undefined,
                  }}
                >
                  {/* magnetic glow overlay */}
                  <motion.span
                    className="absolute inset-0 opacity-0 pointer-events-none"
                    whileHover={{ opacity: 1 }}
                    style={{
                      background:
                        "linear-gradient(135deg, rgba(0,230,255,0.2), rgba(0,119,255,0.2))",
                    }}
                  />

                  <AnimatePresence mode="wait">
                    {status === "submitting" && (
                      <motion.span
                        key="loading"
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -6 }}
                      >
                        <LoadingDots />
                      </motion.span>
                    )}
                    {status === "success" && (
                      <motion.span
                        key="success"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex items-center gap-2"
                      >
                        <CheckCircle size={16} />
                        Message Sent!
                      </motion.span>
                    )}
                    {status === "error" && (
                      <motion.span
                        key="error"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                      >
                        Error — try again
                      </motion.span>
                    )}
                    {status === "idle" && (
                      <motion.span
                        key="idle"
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -6 }}
                        className="flex items-center gap-2 relative z-10"
                      >
                        Send Message
                        <Send size={15} className="group-hover:translate-x-0.5 transition-transform" />
                      </motion.span>
                    )}
                  </AnimatePresence>
                </motion.button>
              </form>
            </div>
          </TiltFormCard>
        </motion.div>
      </div>
    </Section>
  );
};