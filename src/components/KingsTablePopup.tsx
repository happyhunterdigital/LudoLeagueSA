import { useEffect, useState } from "react";

/**
 * KingsTablePopup
 * Promotional popup for "The King's Table – Season 1" tournament.
 * Appears 5 seconds after the homepage loads, once per browser session.
 */

const SESSION_KEY = "kingsTablePopupShown";
const POPUP_DELAY_MS = 5000;

export default function KingsTablePopup() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const alreadyShown = sessionStorage.getItem(SESSION_KEY);
    if (alreadyShown) return;

    const timer = setTimeout(() => {
      setVisible(true);
      sessionStorage.setItem(SESSION_KEY, "true");
    }, POPUP_DELAY_MS);

    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <div style={styles.overlay} onClick={() => setVisible(false)}>
      <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button
          style={styles.closeBtn}
          onClick={() => setVisible(false)}
          aria-label="Close"
        >
          &times;
        </button>

        <img
          src="https://res.cloudinary.com/dfzeb1s54/image/upload/v1783142171/LudoLeagueSA_vwtysc.png"
          alt="The Ludo League SA"
          style={styles.image}
        />

        <div style={styles.body}>
          <div style={styles.badge}>Season 1</div>
          <h2 style={styles.title}>The King's Table</h2>
          <p style={styles.tagline}>
            100 teams. One reigning champion. Weekly episodes on social media.
          </p>
          <div style={styles.prizeRow}>
            <span style={styles.prizeLabel}>Grand Prize</span>
            <span style={styles.prize}>R10,000</span>
          </div>
          <p style={styles.entry}>
            Entry: <strong>R250 per team</strong>
          </p>

          <div style={styles.ctaRow}>
            <a href="/kings-table/" style={styles.btnPrimary}>
              See Tournament Details
            </a>
            <button style={styles.btnSecondary} onClick={() => setVisible(false)}>
              Maybe later
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

const GOLD = "#C5A059";
const GOLD_LIGHT = "#F3E5AB";
const DARK = "#0B0F19";
const CARD = "#111827";

const styles: Record<string, React.CSSProperties> = {
  overlay: {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.65)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 9999,
    padding: "1rem",
  },
  modal: {
    position: "relative",
    background: CARD,
    border: `1px solid #1f2937`,
    borderRadius: "16px",
    maxWidth: "420px",
    width: "100%",
    overflow: "hidden",
    boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    color: "#fff",
  },
  closeBtn: {
    position: "absolute",
    top: "0.75rem",
    right: "0.75rem",
    background: "rgba(11,15,25,0.6)",
    border: "none",
    color: "#fff",
    width: "32px",
    height: "32px",
    borderRadius: "50%",
    fontSize: "1.25rem",
    lineHeight: 1,
    cursor: "pointer",
    zIndex: 1,
  },
  image: {
    width: "100%",
    height: "180px",
    objectFit: "cover",
    display: "block",
    background: DARK,
  },
  body: {
    padding: "1.5rem",
    textAlign: "center",
  },
  badge: {
    display: "inline-block",
    background: "rgba(197, 160, 89, 0.15)",
    border: `1px solid ${GOLD}`,
    color: GOLD_LIGHT,
    padding: "0.25rem 0.85rem",
    borderRadius: "999px",
    fontSize: "0.75rem",
    letterSpacing: "0.15em",
    textTransform: "uppercase",
    marginBottom: "0.75rem",
  },
  title: {
    fontSize: "1.75rem",
    textTransform: "uppercase",
    letterSpacing: "0.03em",
    background: `linear-gradient(180deg, ${GOLD_LIGHT} 0%, ${GOLD} 100%)`,
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    margin: "0 0 0.5rem",
  },
  tagline: {
    color: "#cbd5e1",
    fontSize: "0.95rem",
    margin: "0 0 1rem",
  },
  prizeRow: {
    display: "flex",
    flexDirection: "column",
    marginBottom: "0.5rem",
  },
  prizeLabel: {
    fontSize: "0.75rem",
    textTransform: "uppercase",
    letterSpacing: "0.15em",
    color: "#94a3b8",
  },
  prize: {
    fontSize: "2rem",
    fontWeight: 800,
    color: GOLD,
  },
  entry: {
    color: GOLD_LIGHT,
    fontSize: "0.95rem",
    marginBottom: "1.25rem",
  },
  ctaRow: {
    display: "flex",
    flexDirection: "column",
    gap: "0.6rem",
  },
  btnPrimary: {
    display: "inline-block",
    padding: "0.85rem 1.5rem",
    borderRadius: "8px",
    textDecoration: "none",
    fontWeight: 600,
    fontSize: "0.95rem",
    background: `linear-gradient(135deg, ${GOLD}, #A07C3F)`,
    color: DARK,
  },
  btnSecondary: {
    padding: "0.7rem 1.5rem",
    borderRadius: "8px",
    fontWeight: 600,
    fontSize: "0.9rem",
    background: "transparent",
    color: "#94a3b8",
    border: "1px solid #1f2937",
    cursor: "pointer",
  },
};
