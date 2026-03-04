import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./Dashboard.css";

const months = ["Jan", "Feb", "Mar", "May", "Jul", "Sep", "Sep", "Nov", "Dec"];
const line1 = [38, 42, 40, 48, 52, 55, 60, 65, 72]; // International (green)
const line2 = [28, 30, 29, 35, 38, 42, 46, 50, 55]; // Domestic (blue)

const destinations = [
  { label: "Beach", value: 32 },
  { label: "Mountains", value: 24 },
  { label: "City", value: 20 },
  { label: "Countryside", value: 14 },
];

const demographics = [
  { label: "26-34", value: 25, color: "#93c5fd" },
  { label: "30-74", value: 26, color: "#3b82f6" },
  { label: "45-94", value: 18, color: "#1d4ed8" },
  { label: "16-24", value: 19, color: "#bfdbfe" },
];

function polyPoints(data, w, h, minV, maxV) {
  return data
    .map((v, i) => {
      const x = (i / (data.length - 1)) * w;
      const y = h - ((v - minV) / (maxV - minV)) * h;
      return `${x},${y}`;
    })
    .join(" ");
}

function donutSegments(data, cx, cy, outerR, innerR) {
  const total = data.reduce((s, d) => s + d.value, 0);
  let angle = -Math.PI / 2;
  return data.map((d) => {
    const slice = (d.value / total) * 2 * Math.PI;
    const x1 = cx + outerR * Math.cos(angle);
    const y1 = cy + outerR * Math.sin(angle);
    const ix1 = cx + innerR * Math.cos(angle);
    const iy1 = cy + innerR * Math.sin(angle);
    angle += slice;
    const x2 = cx + outerR * Math.cos(angle);
    const y2 = cy + outerR * Math.sin(angle);
    const ix2 = cx + innerR * Math.cos(angle);
    const iy2 = cy + innerR * Math.sin(angle);
    const large = slice > Math.PI ? 1 : 0;
    return {
      d: `M${x1},${y1} A${outerR},${outerR} 0 ${large},1 ${x2},${y2} L${ix2},${iy2} A${innerR},${innerR} 0 ${large},0 ${ix1},${iy1} Z`,
      color: d.color,
    };
  });
}

export default function Dashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const minV = Math.min(...line1, ...line2) - 5;
  const maxV = Math.max(...line1, ...line2) + 5;
  const segments = donutSegments(demographics, 65, 65, 58, 35);

  return (
    <div className="db-wrapper">
      {/* ── HEADER ── */}

      {/* ── MAIN GRID ── */}
      <main className="db-main">
        {/* TOP ROW */}
        <div className="db-top-row">
          {/* STAT CARDS — left column */}
          <div className="db-stats-col">
            <div className="db-card db-stat-card">
              <div className="db-stat-number">25,386</div>
              <div className="db-stat-label">Total Visitors</div>
            </div>
            <div className="db-card db-stat-card">
              <div className="db-stat-number">845</div>
              <div className="db-stat-label">
                <span className="db-stat-accent">Avg:</span> Daily Visitors
              </div>
            </div>
          </div>

          {/* LINE CHART — center */}
          <div className="db-card db-chart-card">
            <h3 className="db-card-title">Tourists Over Time</h3>
            <div className="db-chart-area">
              <svg
                className="db-chart-svg"
                viewBox="0 0 540 180"
                preserveAspectRatio="none"
              >
                {/* Gridlines */}
                {[0, 45, 90, 135, 180].map((y, i) => (
                  <line
                    key={i}
                    x1="0"
                    y1={y}
                    x2="540"
                    y2={y}
                    stroke="#f1f5f9"
                    strokeWidth="1"
                  />
                ))}
                {/* Green line */}
                <polyline
                  points={polyPoints(line1, 540, 170, minV, maxV)}
                  fill="none"
                  stroke="#22c55e"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                {/* Blue line */}
                <polyline
                  points={polyPoints(line2, 540, 170, minV, maxV)}
                  fill="none"
                  stroke="#60a5fa"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                {/* Green dots */}
                {line1.map((v, i) => (
                  <circle
                    key={i}
                    cx={(i / (line1.length - 1)) * 540}
                    cy={170 - ((v - minV) / (maxV - minV)) * 170}
                    r="4"
                    fill="#22c55e"
                  />
                ))}
                {/* Blue dots */}
                {line2.map((v, i) => (
                  <circle
                    key={i}
                    cx={(i / (line2.length - 1)) * 540}
                    cy={170 - ((v - minV) / (maxV - minV)) * 170}
                    r="4"
                    fill="#60a5fa"
                  />
                ))}
              </svg>
              {/* X labels */}
              <div className="db-x-labels">
                {months.map((m) => (
                  <span key={m}>{m}</span>
                ))}
              </div>
            </div>
          </div>

          {/* GROWTH — right column */}
          <div className="db-card db-growth-card">
            <div className="db-growth-number">+17%</div>
            <div className="db-growth-label">Growth</div>
            <div className="db-mini-chart">
              <svg viewBox="0 0 120 50" width="100%" height="44">
                <polyline
                  points="0,40 20,32 40,35 60,20 80,25 100,12 120,8"
                  fill="none"
                  stroke="#22c55e"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
        </div>
        {/* end top-row */}

        {/* BOTTOM ROW */}
        <div className="db-bottom-row">
          {/* POPULAR DESTINATIONS */}
          <div className="db-card db-dest-card">
            <h3 className="db-card-title">Popular Destinations</h3>
            <div className="db-dest-list">
              {destinations.map((d) => (
                <div key={d.label} className="db-dest-item">
                  <div className="db-dest-header">
                    <span>{d.label}</span>
                    <span>{d.value}%</span>
                  </div>
                  <div className="db-progress-bar">
                    <div
                      className="db-progress-fill"
                      style={{ width: `${d.value}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* VISITORS BY REGION */}
          <div className="db-card db-map-card">
            <h3 className="db-card-title">Visitors by Region</h3>
            <div className="db-map-wrap">
              <svg viewBox="0 0 500 310" className="db-map-svg">
                {/* US map base */}
                <path
                  d="M75,55 L415,55 L425,75 L435,115 L415,178 L375,198 L335,208 L295,218 L255,213 L215,218 L175,208 L135,198 L95,178 L65,145 L55,108 Z"
                  fill="#dbeafe"
                  stroke="#93c5fd"
                  strokeWidth="1"
                />
                {/* Florida */}
                <path
                  d="M315,208 L325,228 L320,258 L310,268 L300,253 L305,228 Z"
                  fill="#bfdbfe"
                  stroke="#93c5fd"
                  strokeWidth="0.8"
                />
                {/* Highlighted West */}
                <path
                  d="M75,55 L195,55 L205,75 L195,158 L155,178 L115,168 L75,145 L55,108 Z"
                  fill="#3b82f6"
                  stroke="#2563eb"
                  strokeWidth="1"
                />
                {/* Highlighted South */}
                <path
                  d="M175,158 L255,158 L265,178 L255,208 L215,218 L175,208 L155,178 Z"
                  fill="#93c5fd"
                  stroke="#60a5fa"
                  strokeWidth="0.8"
                />
                {/* State dividers */}
                <line
                  x1="195"
                  y1="55"
                  x2="205"
                  y2="178"
                  stroke="#bfdbfe"
                  strokeWidth="0.8"
                />
                <line
                  x1="275"
                  y1="55"
                  x2="265"
                  y2="198"
                  stroke="#bfdbfe"
                  strokeWidth="0.8"
                />
                <line
                  x1="355"
                  y1="55"
                  x2="345"
                  y2="190"
                  stroke="#bfdbfe"
                  strokeWidth="0.8"
                />
                <line
                  x1="95"
                  y1="118"
                  x2="395"
                  y2="118"
                  stroke="#bfdbfe"
                  strokeWidth="0.8"
                />
              </svg>
            </div>
          </div>

          {/* TOURIST DEMOGRAPHICS */}
          <div className="db-card db-demo-card">
            <h3 className="db-card-title">Tourist Demographics</h3>
            <div className="db-demo-content">
              <div className="db-donut-wrap">
                <svg viewBox="0 0 130 130" width="130" height="130">
                  {segments.map((s, i) => (
                    <path key={i} d={s.d} fill={s.color} />
                  ))}
                </svg>
                <div className="db-donut-label">35%</div>
                <div className="db-donut-label2">5%</div>
                <div className="db-donut-label3">5%</div>
              </div>
              <div className="db-legend">
                {demographics.map((d) => (
                  <div key={d.label} className="db-legend-row">
                    <span
                      className="db-legend-dot"
                      style={{ background: d.color }}
                    />
                    <span className="db-legend-name">{d.label}</span>
                    <span className="db-legend-pct">{d.value}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        {/* end bottom-row */}
      </main>
    </div>
  );
}
