import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./Dashboard.css";

const destinations = [
  { label: "Beach", value: 32 },
  { label: "Mountains", value: 24 },
  { label: "City", value: 20 },
  { label: "Countryside", value: 14 },
];

const demographics = [
  { label: "26-34", value: 25, color: "#1d4ed8" },
  { label: "30-74", value: 26, color: "#3b82f6" },
  { label: "45-94", value: 18, color: "#93c5fd" },
  { label: "16-24", value: 19, color: "#bfdbfe" },
];

// Tourists Over Time data - two lines
const months = ["Jan", "Feb", "Mar", "May", "Jul", "Sep", "Sep", "Nov", "Dec"];
const line1 = [38, 52, 48, 62, 58, 72, 68, 78, 88]; // green (higher)
const line2 = [22, 32, 28, 42, 45, 55, 52, 62, 70]; // blue (lower)

function polyline(data, w = 540, h = 180, minV = 0, maxV = 100) {
  return data
    .map((v, i) => {
      const x = (i / (data.length - 1)) * w;
      const y = h - ((v - minV) / (maxV - minV)) * h;
      return `${x},${y}`;
    })
    .join(" ");
}

// Donut chart helper
function donutSegments(data, cx, cy, r, innerR) {
  const total = data.reduce((s, d) => s + d.value, 0);
  let angle = -Math.PI / 2;
  return data.map((d) => {
    const sweep = (d.value / total) * 2 * Math.PI;
    const x1 = cx + r * Math.cos(angle);
    const y1 = cy + r * Math.sin(angle);
    angle += sweep;
    const x2 = cx + r * Math.cos(angle);
    const y2 = cy + r * Math.sin(angle);
    const ix1 = cx + innerR * Math.cos(angle);
    const iy1 = cy + innerR * Math.sin(angle);
    const ix2 = cx + innerR * Math.cos(angle - sweep);
    const iy2 = cy + innerR * Math.sin(angle - sweep);
    const large = sweep > Math.PI ? 1 : 0;
    return {
      d: `M${x1},${y1} A${r},${r} 0 ${large},1 ${x2},${y2} L${ix1},${iy1} A${innerR},${innerR} 0 ${large},0 ${ix2},${iy2} Z`,
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
  const segments = donutSegments(demographics, 65, 65, 55, 32);

  return (
    <div className="db-wrapper">
      {/* ── HEADER ── */}
      <header className="db-header">
        <div className="db-header-left">
          <h1>Tourism Dashboard</h1>
        </div>
        <nav className="db-nav">
          <button className="active">Overview</button>
          <button>Destinations</button>
          <button>Activities</button>
        </nav>
        <div className="db-header-right">
          <div className="db-user">
            <span>{user?.fullName || "Arritle"} ▾</span>
          </div>
          <div className="db-avatar">👤</div>
          <button className="db-logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </header>

      {/* ── MAIN GRID ── */}
      <main className="db-main">
        {/* ── COL 1: Stats ── */}
        <div className="db-stats">
          <div className="db-stat-card">
            <h2>25,386</h2>
            <p>Total Visitors</p>
          </div>
          <div className="db-stat-card">
            <h2>845</h2>
            <p>
              <span>Avg:</span> Daily Visitors
            </p>
          </div>
        </div>

        {/* ── COL 2: Line Chart ── */}
        <div className="db-card db-chart-card">
          <h3>Tourists Over Time</h3>
          <svg
            className="db-chart-svg"
            viewBox="0 0 540 180"
            preserveAspectRatio="none"
          >
            {/* Grid lines */}
            {[0, 1, 2, 3].map((i) => (
              <line
                key={i}
                x1="0"
                y1={i * 45}
                x2="540"
                y2={i * 45}
                stroke="#f1f5f9"
                strokeWidth="1"
              />
            ))}
            {/* Green line (higher) */}
            <polyline
              points={polyline(line1, 540, 170, minV, maxV)}
              fill="none"
              stroke="#22c55e"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* Blue line (lower) */}
            <polyline
              points={polyline(line2, 540, 170, minV, maxV)}
              fill="none"
              stroke="#60a5fa"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* Dots on green line */}
            {line1.map((v, i) => (
              <circle
                key={i}
                cx={(i / (line1.length - 1)) * 540}
                cy={170 - ((v - minV) / (maxV - minV)) * 170}
                r="4"
                fill="#22c55e"
              />
            ))}
            {/* Dots on blue line */}
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
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: 8,
            }}
          >
            {months.map((m) => (
              <span key={m} style={{ fontSize: "0.75rem", color: "#94a3b8" }}>
                {m}
              </span>
            ))}
          </div>
          <div className="db-chart-legend">
            <span>
              <span
                className="db-legend-dot"
                style={{ background: "#22c55e" }}
              />
              International
            </span>
            <span>
              <span
                className="db-legend-dot"
                style={{ background: "#60a5fa" }}
              />
              Domestic
            </span>
          </div>
        </div>

        {/* ── COL 3: Growth ── */}
        <div className="db-card db-growth-card">
          <div>
            <h2>+17%</h2>
            <p>Growth</p>
          </div>
          <div className="db-mini-chart">
            <svg viewBox="0 0 120 50" width="100%" height="50">
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

        {/* ── BOTTOM ROW ── */}
        <div className="db-bottom">
          {/* Popular Destinations */}
          <div className="db-card db-dest-card">
            <h3>Popular Destinations</h3>
            {destinations.map((d) => (
              <div key={d.label} className="db-dest-item">
                <div className="db-dest-header">
                  <span>{d.label}</span>
                  <span>{d.value}%</span>
                </div>
                <div className="db-progress">
                  <div
                    className="db-progress-fill"
                    style={{ width: `${d.value}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Visitors by Region (US Map) */}
          <div className="db-card db-map-card">
            <h3>Visitors by Region</h3>
            <svg className="db-map-svg" viewBox="0 0 500 300">
              {/* Simplified US map shape */}
              <g fill="#dbeafe" stroke="#93c5fd" strokeWidth="1">
                {/* Main US body */}
                <path d="M80,60 L420,60 L430,80 L440,120 L420,180 L380,200 L340,210 L300,220 L260,215 L220,220 L180,210 L140,200 L100,180 L70,150 L60,110 Z" />
                {/* Florida */}
                <path
                  d="M320,210 L330,230 L325,260 L315,270 L305,255 L310,230 Z"
                  fill="#93c5fd"
                />
                {/* Highlighted western region */}
                <path
                  d="M80,60 L200,60 L210,80 L200,160 L160,180 L120,170 L80,150 L60,110 Z"
                  fill="#3b82f6"
                  stroke="#2563eb"
                />
                {/* Texas-ish highlighted */}
                <path
                  d="M180,160 L260,160 L270,180 L260,210 L220,220 L180,210 L160,180 Z"
                  fill="#93c5fd"
                />
              </g>
              {/* State lines hint */}
              <line
                x1="200"
                y1="60"
                x2="210"
                y2="180"
                stroke="#bfdbfe"
                strokeWidth="0.8"
              />
              <line
                x1="280"
                y1="60"
                x2="270"
                y2="200"
                stroke="#bfdbfe"
                strokeWidth="0.8"
              />
              <line
                x1="100"
                y1="120"
                x2="400"
                y2="120"
                stroke="#bfdbfe"
                strokeWidth="0.8"
              />
            </svg>
          </div>

          {/* Tourist Demographics */}
          <div className="db-card db-demo-card">
            <h3>Tourist Demographics</h3>
            <div className="db-demo-content">
              <div className="db-donut">
                <svg viewBox="0 0 130 130" width="130" height="130">
                  {segments.map((s, i) => (
                    <path key={i} d={s.d} fill={s.color} />
                  ))}
                </svg>
                <div className="db-donut-center">35%</div>
              </div>
              <div className="db-legend">
                {demographics.map((d) => (
                  <div key={d.label} className="db-legend-item">
                    <div
                      className="db-legend-dot2"
                      style={{ background: d.color }}
                    />
                    <span className="db-legend-label">{d.label}</span>
                    <span className="db-legend-val">{d.value}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
