// src/pages/admin/AdminPanel.jsx
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Chart as ChartJS, registerables } from "chart.js";

ChartJS.register(...registerables);

const MOCK_STATS = [
  { icon: "👗", value: "12,847", label: "Total try-ons",  delta: "+18% this week" },
  { icon: "👤", value: "3,291",  label: "Unique users",   delta: "+9% this week"  },
  { icon: "⭐", value: "4.9",    label: "Avg. rating",    delta: "+0.1 vs last month" },
  { icon: "⏱",  value: "2m 34s", label: "Avg. session",  delta: "+12s vs last week"  },
];

const MOCK_PRODUCTS = [
  { name: "Classic Aviator",      category: "Sunglasses", tries: 2341, rate: 68 },
  { name: "White Oversized Tee",  category: "T-shirt",    tries: 1987, rate: 54 },
  { name: "Slim Jeans",           category: "Pants",      tries: 1654, rate: 61 },
  { name: "White Sneakers",       category: "Shoes",      tries: 1432, rate: 72 },
  { name: "Leather Jacket",       category: "Jacket",     tries: 1298, rate: 45 },
  { name: "Baseball Cap",         category: "Hat",        tries: 876,  rate: 38 },
  { name: "Silver Watch",         category: "Watch",      tries: 754,  rate: 55 },
];

const NAV_ITEMS = [
  { icon: "📊", label: "Dashboard", active: true  },
];

export function AdminPanel() {
  const navigate   = useNavigate();
  const lineRef    = useRef(null);
  const pieRef     = useRef(null);
  // ✅ Keep chart instances so we can destroy before re-creating
  const lineChart  = useRef(null);
  const pieChart   = useRef(null);

  useEffect(() => {
    // ── Line chart ──────────────────────────────────────────────
    if (lineRef.current) {
      // Destroy previous instance to prevent "canvas already in use" error
      if (lineChart.current) lineChart.current.destroy();

      lineChart.current = new ChartJS(lineRef.current, {
        type: "line",
        data: {
          labels: ["May 1","May 5","May 10","May 15","May 20","May 25","May 30"],
          datasets: [{
            label: "Try-ons",
            data: [320, 480, 390, 620, 580, 710, 890],
            borderColor: "#B8975A",
            backgroundColor: "rgba(184,151,90,.08)",
            fill: true,
            tension: 0.45,
            pointRadius: 4,
            pointBackgroundColor: "#B8975A",
            borderWidth: 2,
          }],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: { legend: { display: false } },
          scales: {
            x: {
              grid: { display: false },
              ticks: { color: "#9E9488", font: { size: 11 } },
            },
            y: {
              grid: { color: "#F2EFE9" },
              ticks: { color: "#9E9488", font: { size: 11 } },
            },
          },
        },
      });
    }

    // ── Doughnut chart ──────────────────────────────────────────
    if (pieRef.current) {
      if (pieChart.current) pieChart.current.destroy();

      pieChart.current = new ChartJS(pieRef.current, {
        type: "doughnut",
        data: {
          labels: ["Mobile", "Desktop", "Tablet"],
          datasets: [{
            data: [62, 31, 7],
            backgroundColor: ["#1C1A18", "#B8975A", "#E8E2D9"],
            borderWidth: 0,
          }],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          cutout: "72%",
          plugins: {
            legend: {
              position: "bottom",
              labels: {
                color: "#6B6157",
                padding: 16,
                usePointStyle: true,
                font: { size: 12 },
              },
            },
          },
        },
      });
    }

    // ✅ Cleanup on unmount — prevents memory leaks
    return () => {
      lineChart.current?.destroy();
      pieChart.current?.destroy();
    };
  }, []);

  return (
    <div className="admin-layout">

      {/* ── Sidebar ───────────────────────────────────────────── */}
      <aside className="admin-sidebar">
        <div className="admin-sidebar__logo">
          Try<span>On</span>
        </div>

        {/* ✅ Back to site button */}
        <button
          onClick={() => navigate("/")}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            width: "100%",
            padding: "10px 12px",
            marginBottom: "8px",
            background: "rgba(184,151,90,.12)",
            border: "1px solid rgba(184,151,90,.25)",
            borderRadius: "var(--r-md)",
            color: "var(--c-gold-light, #D4B078)",
            fontSize: "13px",
            fontWeight: 500,
            cursor: "pointer",
            transition: "background .15s",
            fontFamily: "var(--font-body)",
            letterSpacing: ".02em",
          }}
          onMouseEnter={e => e.currentTarget.style.background = "rgba(184,151,90,.2)"}
          onMouseLeave={e => e.currentTarget.style.background = "rgba(184,151,90,.12)"}
        >
          ← Back to site
        </button>

        {NAV_ITEMS.map(item => (
          <div
            key={item.label}
            className={`admin-nav-item ${item.active ? "active" : ""}`}
          >
            <span className="nav-icon">{item.icon}</span>
            {item.label}
          </div>
        ))}
      </aside>

      {/* ── Main ──────────────────────────────────────────────── */}
      <main className="admin-main">

        {/* Topbar */}
        <div className="admin-topbar">
          <div>
            <h1 className="heading">Dashboard</h1>
            <p className="caption">May 2025 · All stores</p>
          </div>
          <div style={{ display: "flex", gap: "var(--space-3)" }}>
            <button className="btn btn--outline btn--sm">Export CSV</button>
            <button className="btn btn--primary btn--sm">+ Add product</button>
          </div>
        </div>

        {/* Stat cards */}
        <div className="stat-grid">
          {MOCK_STATS.map((s, i) => (
            <div
              key={i}
              className="stat-card animate-fade-up"
              style={{ animationDelay: `${i * 60}ms` }}
            >
              <div className="stat-card__icon">{s.icon}</div>
              <div className="stat-card__value">{s.value}</div>
              <div className="stat-card__label">{s.label}</div>
              <div className="stat-card__delta">↑ {s.delta}</div>
            </div>
          ))}
        </div>

        {/* Charts */}
        <div className="chart-grid">
          <div className="chart-card">
            <div className="chart-card__header">
              <span className="subheading">Try-on volume</span>
              <span className="badge badge--default">Last 30 days</span>
            </div>
            <div style={{ height: 240, position: "relative" }}>
              <canvas ref={lineRef} />
            </div>
          </div>
          <div className="chart-card">
            <div className="chart-card__header">
              <span className="subheading">Device split</span>
            </div>
            <div style={{ height: 240, position: "relative" }}>
              <canvas ref={pieRef} />
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="card" style={{ overflow: "hidden" }}>
          <div style={{
            padding: "var(--space-6)",
            borderBottom: "1px solid var(--c-border)",
            display: "flex", alignItems: "center", justifyContent: "space-between",
          }}>
            <span className="subheading">Top products by try-on count</span>
            <span className="badge badge--default">All categories</span>
          </div>
          <div style={{ overflowX: "auto" }}>
            <table className="data-table">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Category</th>
                  <th>Try-ons</th>
                  <th>Conversion</th>
                </tr>
              </thead>
              <tbody>
                {MOCK_PRODUCTS.map((p, i) => (
                  <tr key={i}>
                    <td style={{ fontWeight: 500 }}>{p.name}</td>
                    <td>
                      <span className="badge badge--default">{p.category}</span>
                    </td>
                    <td className="td-num">{p.tries.toLocaleString()}</td>
                    <td>
                      <div style={{
                        display: "flex", alignItems: "center",
                        gap: "var(--space-3)",
                      }}>
                        <div style={{
                          flex: 1, height: 4,
                          background: "var(--c-cream-border)",
                          borderRadius: 2, overflow: "hidden",
                        }}>
                          <div style={{
                            width: `${p.rate}%`,
                            height: "100%",
                            background: "var(--c-gold)",
                            borderRadius: 2,
                          }} />
                        </div>
                        <span style={{
                          fontSize: "var(--text-sm)",
                          fontWeight: 500, minWidth: 32,
                        }}>
                          {p.rate}%
                        </span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </main>
    </div>
  );
}

export default AdminPanel;