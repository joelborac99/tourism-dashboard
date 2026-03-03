import "./Dashboard.css";

function Dashboard() {
  const data = [
    { label: "Beach", value: 32 },
    { label: "Mountains", value: 24 },
    { label: "City", value: 20 },
    { label: "Countryside", value: 14 },
  ];
  const data2 = [
    { label: "26–34", value: 25, color: "#2F6FD6" },
    { label: "30–74", value: 26, color: "#3F82E0" },
    { label: "45–94", value: 18, color: "#6AA4F0" },
    { label: "16–24", value: 19, color: "#8BB9F5" },
  ];
  return (
    <div className="Main-cont">
      {" "}
      {/* */}
      <div className="Child number1">
        {/* This is the first container */}
        <h1>124343</h1>
        <p>Total Visitors</p>
      </div>
      <div className="Child number2">
        <div className="activity-container">
          <div className="activity-header">
            <div>
              <h2>Activity</h2>
              <p>Data updates every 3 hours</p>
            </div>

            <div className="date-select">01 - 07 May ▼</div>
          </div>

          <div className="chart-wrapper">
            <div className="y-labels">
              <span>40k</span>
              <span>30k</span>
              <span>20k</span>
              <span>10k</span>
              <span>0k</span>
            </div>

            <div className="chart-area">
              <svg viewBox="0 0 600 200" className="chart-svg">
                <path
                  d="M0,120 
                 C80,60 150,60 220,140
                 S350,180 420,80
                 S520,150 600,60"
                  fill="none"
                  stroke="#f5a623"
                  strokeWidth="6"
                  strokeLinecap="round"
                />

                <circle cx="420" cy="80" r="7" fill="#f5a623" />

                {/* Tooltip */}
                <foreignObject x="380" y="90" width="120" height="60">
                  <div className="tooltip">
                    <strong>32 210</strong>
                    <span>Views / hour</span>
                  </div>
                </foreignObject>
              </svg>

              <div className="x-labels">
                <span>01</span>
                <span>02</span>
                <span>03</span>
                <span>04</span>
                <span>05</span>
                <span>06</span>
                <span>07</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="Child number3">
        <h1>+18%</h1>
        <p>Growth</p>
      </div>
      <div className="Child number4">
        <h1>3435%</h1>
        <p>Daily Visitors</p>
      </div>
      <div className="Child number5"></div>
      <div className="Child number6">
        <div className="popular-container">
          <h2 className="popular-title">Popular Destinations</h2>

          {data.map((item, index) => (
            <div key={index} className="destination-item">
              <div className="destination-header">
                <span>{item.label}</span>
                <span>{item.value}%</span>
              </div>

              <div className="progress-bar">
                <div
                  className="progress-fill"
                  style={{ width: `${item.value}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="Child number7">7</div>
      <div className="Child number8">
        <div className="demo-container">
          <h2 className="demo-title">Tourist Demographics</h2>

          <div className="demo-content">
            {/* Donut Chart */}
            <div className="donut-wrapper">
              <div className="donut-chart">
                <div className="donut-center">35%</div>
              </div>
            </div>

            {/* Legend */}
            <div className="legend">
              {data2.map((item, index) => (
                <div key={index} className="legend-item">
                  <div
                    className="legend-dot"
                    style={{ backgroundColor: item.color }}
                  ></div>
                  <span className="legend-label">{item.label}</span>
                  <span className="legend-value">{item.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
