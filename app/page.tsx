"use client";

import { useEffect, useMemo, useState } from "react";

const LYRICS = [
  "Let’s go wait out in the fields with the ones we love.",
  "You put an ocean and a river between everything, yourself, and home.",
    "Don't you know someday somebody will come and find you, if you don't know who you are anymore they will remind you.",
  "Stand up straight at the foot of your love.",
  "There's a science to walking through windows without you.",
   "I wanna hurry home to you. Put on a slow, dumb show for you and crack you up.",
    "When they ask, what do I see? I say 'a bright, white, beautiful heaven hangin' over me.",
    "You give me such a future feeling. We're in the middle of some kind of cosmic rearrangement.",
  "You'd fall into rivers with friends on the weekends.",
    "I'm exactly like you, Valentine, just come outside and leave with me.",
];

const SHARE_SUBJECT = "Diana shared a lyric with you";

const FORMSPREE_MIA_ID = process.env.NEXT_PUBLIC_FORMSPREE_MIA_ID ?? "";
const FORMSPREE_ZUZA_ID = process.env.NEXT_PUBLIC_FORMSPREE_ZUZA_ID ?? "";

const FLOWER_SRCS = [
  "/flowers/spring-garden-flower-svgrepo-com.svg",
  "/flowers/couple-of-roses-in-symmetry-svgrepo-com.svg",
  "/flowers/floral-design-with-flowers-couple-svgrepo-com.svg",
  "/flowers/flowers-flower-svgrepo-com.svg",
  "/flowers/flowers-in-a-pot-svgrepo-com.svg",
  "/flowers/balloon-svgrepo-com.svg",
  "/flowers/big-strawberry-svgrepo-com.svg",
  "/flowers/piece-of-cake-with-berries-svgrepo-com.svg",
  "/flowers/coffee-cup-with-heart-svgrepo-com.svg",
  "/flowers/cat-streching-svgrepo-com.svg",
  "/flowers/cat-satisfied-svgrepo-com.svg",
  "/flowers/dog-head-profile-svgrepo-com.svg",
  "/flowers/love-letter-with-hearts-svgrepo-com.svg",
  "/flowers/love-potion-svgrepo-com.svg",
  "/flowers/cheers-toast-svgrepo-com.svg",
  "/flowers/heart-glasses-svgrepo-com.svg",
  "/flowers/llama-svgrepo-com.svg",
] as const;

const COOKIE_FRAMES = ["/cookie/1.svg", "/cookie/2.svg", "/cookie/3.svg"] as const;

function pickLyric() {
  return LYRICS[Math.floor(Math.random() * LYRICS.length)];
}

async function sendViaFormspree(formId: string, lyric: string) {
  const res = await fetch(`https://formspree.io/f/${formId}`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({
      _subject: SHARE_SUBJECT,
      message: lyric,
    }),
  });
  if (!res.ok) throw new Error("Failed to send");
}

export default function Page() {
  const [open, setOpen] = useState(false);
  const [lyric, setLyric] = useState("…");
  const [sending, setSending] = useState<"Mia" | "Zuza" | null>(null);
  const [sentTo, setSentTo] = useState<"Mia" | "Zuza" | null>(null);
  const [sendError, setSendError] = useState(false);
  const [flowerIndex, setFlowerIndex] = useState(0);
  const [cookieFrame, setCookieFrame] = useState(0);

  const tag = useMemo(() => "— fortune lyric", []);

  useEffect(() => {
    if (!open) return;
    setCookieFrame(0);
    const t1 = window.setTimeout(() => setCookieFrame(1), 800);
    const t2 = window.setTimeout(() => setCookieFrame(2), 1600);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [open]);

  const handleShare = async (target: "Mia" | "Zuza") => {
    const formId = target === "Mia" ? FORMSPREE_MIA_ID : FORMSPREE_ZUZA_ID;
    if (!formId) {
      setSendError(true);
      return;
    }
    setSending(target);
    setSendError(false);
    setSentTo(null);
    try {
      await sendViaFormspree(formId, lyric);
      setSentTo(target);
      window.setTimeout(() => setSentTo(null), 3000);
    } catch {
      setSendError(true);
    } finally {
      setSending(null);
    }
  };

  const crackOpen = (advanceFlower = true) => {
    setOpen(true);
    window.setTimeout(() => setLyric(pickLyric()), 1600);
    if (advanceFlower) setFlowerIndex((i) => (i + 1) % FLOWER_SRCS.length);
  };

  const getAnother = () => {
    setOpen(false);
    setLyric("…");
    setCookieFrame(0);
  };

  const handleStageAction = () => (open ? getAnother() : crackOpen());

  useEffect(() => {
    crackOpen(false);
  }, []);

  return (
    <main className="wrap">
      {!open && (
        <>
          <img
            src={FLOWER_SRCS[flowerIndex]}
            alt=""
            className="flowers-img"
            aria-hidden
          />
          <h1 className="greeting">Hello Diana, got some munchies?</h1>
        </>
      )}
      <div
        className={`stage ${open ? "open" : ""}`}
        aria-label="Fortune cookie lyric generator"
        onClick={handleStageAction}
        role="button"
        tabIndex={0}
        onKeyDown={(e) =>
          e.key === "Enter" || e.key === " " ? handleStageAction() : null
        }
      >
        <div className="cookie" aria-hidden="true">
          <img
            src={COOKIE_FRAMES[open ? cookieFrame : 0]}
            alt=""
            className="cookie-img"
          />
        </div>

        <div className="paper" role="status" aria-live="polite">
          <div className="lyric">{lyric}</div>
          <span className="small">{tag}</span>
        </div>
      </div>

      {(!open || lyric !== "…") && (
        <button className="btn" onClick={handleStageAction} type="button">
          {open ? "Click to get another one" : "Click to crack open"}
        </button>
      )}
      {open && lyric !== "…" && (
        <div className="btn-hint-wrap" role="group" aria-label="Share lyric by email">
          <p className="btn-hint">or share the vibes</p>
          <div className="share-stack">
            <button
              type="button"
              className="share-btn share-btn-stack"
              onClick={() => handleShare("Mia")}
              disabled={!!sending}
              aria-busy={sending === "Mia"}
            >
              {sending === "Mia" ? "Sending…" : sentTo === "Mia" ? "Sent!" : "Share with Mia"}
            </button>
            <button
              type="button"
              className="share-btn share-btn-stack"
              onClick={() => handleShare("Zuza")}
              disabled={!!sending}
              aria-busy={sending === "Zuza"}
            >
              {sending === "Zuza"
                ? "Sending…"
                : sentTo === "Zuza"
                  ? "Sent!"
                  : "Share with Zuza"}
            </button>
          </div>
        </div>
      )}
      {open && lyric !== "…" && sendError && (
        <p className="share-error" role="alert">
          Couldn’t send. Check Formspree setup.
        </p>
      )}

      <style jsx>{`
        :global(html, body) {
          height: 100%;
        }
        :global(body) {
          margin: 0;
          overflow: hidden;
          background: #f7f4ef;
          color: #1a1a1a;
          font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto,
            Helvetica, Arial, "Apple Color Emoji", "Segoe UI Emoji";
          display: grid;
          place-items: center;
        }

        .wrap {
          width: min(720px, 92vw);
          display: grid;
          place-items: center;
          gap: 18px;
          text-align: center;
        }

        .flowers-img {
          height: 44px;
          width: auto;
          max-width: 72px;
          margin-bottom: 6px;
          object-fit: contain;
          object-position: center;
        }
        .greeting {
          margin: 0;
          font-family: var(--font-space-mono), monospace;
          font-size: 18px;
          font-weight: 400;
          text-transform: uppercase;
          letter-spacing: 0.02em;
          color: #1a1a1a;
        }

        .stage {
          position: relative;
          width: 260px;
          height: 220px;
          display: grid;
          place-items: center;
          filter: drop-shadow(0 18px 30px rgba(0, 0, 0, 0.45));
          cursor: pointer;
          outline: none;
        }
        .stage.open .paper {
          z-index: 1;
        }
        .stage.open .cookie {
          z-index: 0;
        }
        .stage:not(.open) .cookie {
          animation: cookie-bounce 2.5s ease-in-out infinite;
        }

        .cookie {
          position: relative;
          width: 220px;
          height: 170px;
          transform-origin: center;
          animation: cookie-pop 1400ms ease-out both;
        }

        .cookie-img {
          width: 100%;
          height: 100%;
          object-fit: contain;
          object-position: center;
        }

        @keyframes cookie-pop {
          0% {
            transform: scale(0.92) translateY(10px);
            opacity: 0;
          }
          100% {
            transform: scale(1) translateY(0);
            opacity: 1;
          }
        }
        @keyframes cookie-bounce {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-5px);
          }
        }

        .paper {
          position: absolute;
          width: 200px;
          max-width: 78vw;
          padding: 14px 16px;
          border-radius: 4px;
          background: linear-gradient(#fff, #f4f1ea);
          color: #1a1a1a;
          font-family: ui-serif, Georgia, "Times New Roman", Times, serif;
          line-height: 1.25;
          box-shadow: 0 10px 22px rgba(0, 0, 0, 0.25);
          transform: translateY(24px) scale(0.96);
          opacity: 0;
          pointer-events: none;
        }

        .lyric {
          font-size: 18px;
          transform-origin: center center;
        }
        .open .paper .lyric {
          animation: lyric-reveal 1200ms cubic-bezier(0.2, 0.9, 0.15, 1) 1700ms both;
        }
        @keyframes lyric-reveal {
          0% {
            opacity: 0;
            transform: scale(0.92);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }

        .small {
          display: block;
          margin-top: 8px;
          font-size: 12px;
          opacity: 0.65;
          letter-spacing: 0.02em;
        }

        .share-btn {
          font-family: var(--font-space-mono), monospace;
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 0.04em;
          color: #1a1a1a;
          opacity: 0.85;
          padding: 4px 8px;
          border: 1px solid rgba(26, 26, 26, 0.25);
          border-radius: 4px;
          background: transparent;
          cursor: pointer;
          transition: opacity 0.12s ease, border-color 0.12s ease;
        }
        .share-btn:hover:not(:disabled) {
          opacity: 1;
          border-color: rgba(26, 26, 26, 0.5);
        }
        .share-btn:disabled {
          cursor: not-allowed;
          opacity: 0.7;
        }
        .share-error {
          margin: 8px 0 0;
          font-size: 11px;
          color: #b91c1c;
        }

        .open .paper {
          animation: paper-rise 1800ms cubic-bezier(0.2, 0.9, 0.15, 1) 1600ms both;
          pointer-events: auto;
        }
        @keyframes paper-rise {
          0% {
            opacity: 0;
            transform: translateY(24px) scale(0.96);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        .btn {
          margin-top: -14px;
          width: 100%;
          background: #1a1a1a;
          color: #f7f4ef;
          border: 1px solid rgba(26, 26, 26, 0.25);
          border-radius: 4px;
          padding: 10px 14px;
          cursor: pointer;
          font-family: var(--font-space-mono), monospace;
          font-size: 14px;
          text-transform: uppercase;
          letter-spacing: 0.04em;
          transition: opacity 0.12s ease, background 0.12s ease;
        }
        .btn:hover {
          opacity: 0.9;
        }
        .btn:active {
          opacity: 0.95;
        }

        .btn-hint-wrap {
          width: 100%;
          margin-top: 8px;
        }
        .btn-hint {
          margin: 0 0 10px;
          font-size: 12px;
          color: rgba(26, 26, 26, 0.7);
          font-family: ui-sans-serif, system-ui, sans-serif;
        }
        .share-stack {
          display: flex;
          flex-direction: column;
          gap: 6px;
          width: 100%;
        }
        .share-btn-stack {
          width: 100%;
          padding: 10px 14px;
          border: 1px solid rgba(26, 26, 26, 0.25);
        }

        @media (prefers-reduced-motion: reduce) {
          .cookie,
          .stage:not(.open) .cookie,
          .open .paper,
          .open .paper .lyric {
            animation: none !important;
          }
          .paper {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
          .open .paper .lyric {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
    </main>
  );
}
