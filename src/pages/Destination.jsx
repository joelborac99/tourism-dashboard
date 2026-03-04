import "./Destination.css";
import bgImg from "../assets/ggg.jpg";
import africaImg from "../assets/The palms.png";
import spainImg from "../assets/San.jpg";
import cyclingImg from "../assets/mapsannar.png";

const destinations = [
  {
    img: africaImg,
    title: "Africa Holidays",
    desc: "Exotic souks, ancient wonders, unique wildlife and huge sand dunes in seemingly endless deserts",
  },
  {
    img: spainImg,
    title: "Spain Holidays",
    desc: "Soaring mountains, sun-soaked coasts, Moorish heritage and moreish food",
  },
  {
    img: cyclingImg,
    title: "Cycling Holidays",
    desc: "Reawaken that long lost childhood sense of freedom or challenge yourself to an adventure",
  },
];

function Destination() {
  return (
    <div className="Main-Cont">
      {/* Background image rendered as a real div with inline style */}
      <div className="dest-bg" style={{ backgroundImage: `url(${bgImg})` }} />

      {/* Header */}
      <div className="dest-header">
        <h1>Hot Destinations</h1>
        <div className="underline-bar" />
        <p>The first place to look for environmentally friendly holidays</p>
      </div>

      {/* Cards — horizontal row */}
      <div className="dest-cards">
        {destinations.map((dest, i) => (
          <div className="dest-card" key={i}>
            <img src={dest.img} alt={dest.title} />
            <div className="dest-card-body">
              <h3>{dest.title}</h3>
              <p>{dest.desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Show More */}
      <button className="show-more-btn">show more</button>
    </div>
  );
}

export default Destination;
