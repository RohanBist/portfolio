export default function Footer() {
  return (
    <footer
      style={{
        borderTop: "1px solid rgba(255,255,255,0.06)",
        padding: "24px clamp(24px, 5vw, 64px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "var(--bg)",
      }}
    >
      <p
        style={{
          fontFamily: "'Sora', sans-serif",
          fontWeight: 300,
          fontSize: 12,
          color: "var(--text-body)",
          letterSpacing: "0.04em",
        }}
      >
        © 2026 Rohan Bist. All rights reserved.
      </p>
    </footer>
  );
}