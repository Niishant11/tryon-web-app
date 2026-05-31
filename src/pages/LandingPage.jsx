// src/pages/LandingPage.jsx
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function LandingPage() {
  const navigate = useNavigate();

  // Scroll-based nav shadow
  useEffect(() => {
    const nav = document.querySelector(".nav");
    const onScroll = () => nav?.classList.toggle("scrolled", window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      

      {/* ── HERO ── */}
      <section className="hero">
        <div className="hero__bg-text">TryOn</div>
        <div className="container">
          <div className="hero__grid">

            {/* Text col */}
            <div>
              <div className="hero__eyebrow animate-fade-up">
                <div className="hero__eyebrow-line" />
                <span className="label">AI-Powered Fashion</span>
              </div>

              <h1 className="hero__title animate-fade-up delay-1">
                Wear it before<br />
                you <em>buy it</em>
              </h1>

              <p className="hero__sub animate-fade-up delay-2">
                Upload your photo, select any outfit, and see exactly
                how it looks on you — instantly, beautifully.
              </p>

              <div className="hero__actions animate-fade-up delay-3">
                <button
                  className="btn btn--primary btn--xl"
                  onClick={() => navigate("/auth")}
                >
                  Start trying on
                </button>
                <button className="btn btn--outline btn--xl">
                  Watch demo
                </button>
              </div>

              {/* Trust row */}
              <div className="animate-fade-up delay-4" style={{ marginTop: "var(--space-12)", display: "flex", alignItems: "center", gap: "var(--space-6)" }}>
                <div>
                  <div className="display-sm" style={{ color: "var(--c-ink)" }}>10k+</div>
                  <div className="caption">Try-ons daily</div>
                </div>
                <div style={{ width: 1, height: 40, background: "var(--c-border)" }} />
                <div>
                  <div className="display-sm" style={{ color: "var(--c-ink)" }}>500+</div>
                  <div className="caption">Brands listed</div>
                </div>
                <div style={{ width: 1, height: 40, background: "var(--c-border)" }} />
                <div>
                  <div className="display-sm" style={{ color: "var(--c-ink)" }}>4.9★</div>
                  <div className="caption">User rating</div>
                </div>
              </div>
            </div>

            {/* Image col */}
            <div className="hero__img-col animate-fade-in delay-2">
              <div className="hero__img-frame">
                <img
                  src="https://img.magnific.com/free-photo/portrait-handsome-confident-stylish-hipster-lambersexual-modelman-dressed-black-jacket-jeans-fashion-male-posing-studio-near-grey-wall_158538-24002.jpg?semt=ais_hybrid&w=740&q=80"
                  alt="Model wearing try-on outfit"
                />
                <div className="hero__img-badge">
                  <div className="hero__img-dot" />
                  <div>
                    <div style={{ fontSize: "12px", fontWeight: 600, color: "var(--c-ink)" }}>Live preview</div>
                    <div style={{ fontSize: "11px", color: "var(--c-text-faint)" }}>Updated in real-time</div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="page-section" id="how" style={{ background: "var(--c-surface)" }}>
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: "var(--space-12)" }}>
            <div className="divider--gold" style={{ margin: "0 auto var(--space-4)" }} />
            <h2 className="display-md">Three steps to your perfect look</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "var(--space-8)" }}>
            {[
              { n: "01", title: "Choose products", desc: "Browse our curated collection. Select sunglasses, tops, trousers, shoes — mix and match freely." },
              { n: "02", title: "Upload your photo", desc: "A clear full-body shot works best. Your image stays private and is never stored on our servers." },
              { n: "03", title: "See yourself styled", desc: "Our canvas engine overlays products onto your photo with realistic positioning and blending." },
            ].map((step) => (
              <div key={step.n} className="animate-fade-up">
                <div style={{ fontFamily: "var(--font-display)", fontSize: "52px", fontWeight: 300, color: "var(--c-cream-border)", lineHeight: 1, marginBottom: "var(--space-4)" }}>{step.n}</div>
                <div className="divider--gold" />
                <h3 className="subheading" style={{ marginBottom: "var(--space-3)" }}>{step.title}</h3>
                <p className="caption" style={{ lineHeight: 1.7 }}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ background: "var(--c-ink)", padding: "var(--space-10) 0" }}>
        <div className="container" style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ fontFamily: "var(--font-display)", fontSize: 20, color: "#fff", letterSpacing: ".04em" }}>
            Try<span style={{ color: "var(--c-gold-light)" }}>On</span>
          </div>
          <p style={{ fontSize: "var(--text-sm)", color: "rgba(255,255,255,.4)" }}>© 2026 TryOn. All rights reserved.</p>
        </div>
      </footer>
    </>
  );
}