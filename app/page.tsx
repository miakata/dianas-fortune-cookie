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

function pickLyric() {
  return LYRICS[Math.floor(Math.random() * LYRICS.length)];
}

export default function Page() {
  const [open, setOpen] = useState(false);
  const [lyric, setLyric] = useState("…");

  // used to re-trigger CSS animations cleanly
  const [animKey, setAnimKey] = useState(0);

  const tag = useMemo(() => "— fortune lyric", []);

  const playOpen = () => {
    // reset
    setOpen(false);
    setLyric("…");
    setAnimKey((k) => k + 1);

    // re-open next tick so animations re-run
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setOpen(true);
        window.setTimeout(() => setLyric(pickLyric()), 800);
      });
    });
  };

  useEffect(() => {
    playOpen();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <main className="wrap">
      <div
        key={animKey}
        className={`stage ${open ? "open" : ""}`}
        aria-label="Fortune cookie lyric generator"
        onClick={playOpen}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => (e.key === "Enter" || e.key === " " ? playOpen() : null)}
      >
        <div className="cookie" aria-hidden="true">
          <div className="half left" />
          <div className="half right" />
        </div>

        <div className="paper" role="status" aria-live="polite">
          <div className="lyric">{lyric}</div>
          <span className="small">{tag}</span>
        </div>
      </div>

      <button className="btn" onClick={playOpen} type="button">
        Crack another 🍪
      </button>

      <div className="hint">Tip: reload for auto-open, or tap the cookie.</div>

      <style jsx>{`
        :global(html, body) {
          height: 100%;
        }
        :global(body) {
          margin: 0;
          overflow: hidden;
          background: radial-gradient(
            1200px 800px at 50% 35%,
            #141a2a 0%,
            #0b0d12 55%,
            #07080c 100%
          );
          color: #e9ecf2;
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

        .hint {
          font-size: 13px;
          color: rgba(233, 236, 242, 0.72);
          letter-spacing: 0.02em;
          user-select: none;
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

        .cookie {
          position: relative;
          width: 220px;
          height: 170px;
          transform-origin: center;
          animation: cookie-pop 700ms ease-out both;
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

        .half {
          position: absolute;
          width: 140px;
          height: 140px;
          top: 12px;
          border-radius: 999px;
          background: radial-gradient(
              55px 55px at 40% 35%,
              rgba(255, 255, 255, 0.25),
              transparent 60%
            ),
            radial-gradient(
              120px 120px at 35% 40%,
              #e7c48a 0%,
              #caa56b 70%,
              #b88f53 100%
            );
          border: 1px solid rgba(0, 0, 0, 0.12);
          box-shadow: inset -10px -14px 18px rgba(0, 0, 0, 0.12);
        }

        .left {
          left: 0;
          transform-origin: 135px 70px;
        }
        .right {
          right: 0;
          transform-origin: 5px 70px;
        }

        .half::after {
          content: "";
          position: absolute;
          width: 86px;
          height: 86px;
          top: 32px;
          left: 30px;
          border-radius: 999px;
          background: radial-gradient(
            70px 70px at 60% 45%,
            rgba(0, 0, 0, 0.12),
            transparent 60%
          );
          opacity: 0.35;
        }

        .paper {
          position: absolute;
          width: 200px;
          max-width: 78vw;
          padding: 14px 16px;
          border-radius: 14px;
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
        }

        .small {
          display: block;
          margin-top: 8px;
          font-size: 12px;
          opacity: 0.65;
          letter-spacing: 0.02em;
        }

        /* OPEN ANIMATION */
        .open .left {
          animation: open-left 900ms cubic-bezier(0.2, 0.9, 0.15, 1) 250ms both;
        }
        .open .right {
          animation: open-right 900ms cubic-bezier(0.2, 0.9, 0.15, 1) 250ms both;
        }
        @keyframes open-left {
          0% {
            transform: rotate(0deg) translateX(0) translateY(0);
          }
          70% {
            transform: rotate(-42deg) translateX(-6px) translateY(-2px);
          }
          100% {
            transform: rotate(-55deg) translateX(-10px) translateY(-4px);
          }
        }
        @keyframes open-right {
          0% {
            transform: rotate(0deg) translateX(0) translateY(0);
          }
          70% {
            transform: rotate(42deg) translateX(6px) translateY(-2px);
          }
          100% {
            transform: rotate(55deg) translateX(10px) translateY(-4px);
          }
        }

        .open .paper {
          animation: paper-rise 900ms cubic-bezier(0.2, 0.9, 0.15, 1) 650ms both;
        }
        @keyframes paper-rise {
          0% {
            opacity: 0;
            transform: translateY(24px) scale(0.96);
          }
          100% {
            opacity: 1;
            transform: translateY(-16px) scale(1);
          }
        }

        .paper::before {
          content: "";
          position: absolute;
          inset: 0;
          border-radius: 14px;
          background: linear-gradient(
            120deg,
            transparent 0%,
            rgba(255, 255, 255, 0.55) 45%,
            transparent 70%
          );
          transform: translateX(-120%);
          opacity: 0.55;
        }
        .open .paper::before {
          animation: shimmer 900ms ease 950ms both;
        }
        @keyframes shimmer {
          to {
            transform: translateX(120%);
          }
        }

        .btn {
          margin-top: 6px;
          background: rgba(255, 255, 255, 0.08);
          color: #e9ecf2;
          border: 1px solid rgba(255, 255, 255, 0.14);
          padding: 10px 14px;
          border-radius: 999px;
          cursor: pointer;
          transition: transform 0.12s ease, background 0.12s ease;
          font-size: 14px;
        }
        .btn:hover {
          transform: translateY(-1px);
          background: rgba(255, 255, 255, 0.12);
        }
        .btn:active {
          transform: translateY(0px) scale(0.99);
        }

        @media (prefers-reduced-motion: reduce) {
          .cookie,
          .open .left,
          .open .right,
          .open .paper,
          .open .paper::before {
            animation: none !important;
          }
          .paper {
            opacity: 1;
            transform: translateY(-16px) scale(1);
          }
        }
      `}</style>
    </main>
  );
}
