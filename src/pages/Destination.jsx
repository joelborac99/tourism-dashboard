import { useState } from "react";
import "./Destination.css";
import bgImg from "../assets/san.jpg";
import africaImg from "../assets/ggg.jpg";
import spainImg from "../assets/The palms.png";
import cyclingImg from "../assets/mapsannar.png";

const allDestinations = [
  {
    id: 1,
    title: "Africa Holidays",
    description:
      "Exotic souks, ancient wonders, unique wildlife and huge sand dunes in seemingly endless deserts",
    img: africaImg,
  },
  {
    id: 2,
    title: "Spain Holidays",
    description:
      "Soaring mountains, sun-soaked coasts, Moorish heritage and moreish food",
    img: spainImg,
  },
  {
    id: 3,
    title: "Cycling Holidays",
    description:
      "Reawaken that long lost childhood sense of freedom or challenge yourself to an adventure",
    img: cyclingImg,
  },
  {
    id: 4,
    title: "Asia Holidays",
    description:
      "Ancient temples, vibrant street food, lush landscapes and rich cultural heritage await you",
    img: africaImg,
  },
  {
    id: 5,
    title: "Island Escapes",
    description:
      "Crystal clear waters, white sandy beaches and breathtaking sunsets in paradise",
    img: spainImg,
  },
  {
    id: 6,
    title: "Mountain Retreats",
    description:
      "Crisp air, stunning peaks, scenic trails and peaceful alpine villages to explore",
    img: cyclingImg,
  },
];

function Destination() {
  const [showAll, setShowAll] = useState(false);
  const visible = showAll ? allDestinations : allDestinations.slice(0, 3);

  return (
    <div className="dest-page">
      {/* Background image */}
      <div className="dest-bg" style={{ backgroundImage: `url(${bgImg})` }} />
      <div className="dest-overlay" />

      <div className="dest-content">
        {/* Header */}
        <div className="dest-header">
          <h1>Hot Destinations</h1>
          <div className="dest-divider" />
          <p>The first place to look for environmentally friendly holidays</p>
        </div>

        {/* Cards grid */}
        <div className="dest-grid">
          {visible.map((dest, i) => (
            <div
              key={dest.id}
              className="dest-card"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <div className="dest-card-img-wrap">
                <img
                  src={dest.img}
                  alt={dest.title}
                  className="dest-card-img"
                />
              </div>
              <div className="dest-card-body">
                <h3>{dest.title}</h3>
                <p>{dest.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Show more button */}
        <div className="dest-btn-wrap">
          <button className="dest-btn" onClick={() => setShowAll(!showAll)}>
            {showAll ? "show less" : "show more"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Destination;
