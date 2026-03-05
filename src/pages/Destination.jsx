import "./Destination.css";
import bgImg from "../assets/ggg.jpg";
import Thepalms from "../assets/thepalms.jpg";
import Crystal from "../assets/crystal3.jpg";
import Tumba2 from "../assets/tumba-tumba.jpg";

const destinations = [
  {
    img: Thepalms,
    title: "The Palms Resorts and Bar",
    desc: "Is a cozy beachside bed-and-breakfast offering modern amenities like a rooftop pool, jacuzzi, and sea-view rooms, making it a great choice for both relaxation and convenience.",
  },
  {
    img: Crystal,
    title: "Crystal Beach Holidays",
    desc: "Crystal Beach Resort in San Narciso, Zambales, combines adventure and relaxation with activities like surfing, camping, kayaking, and paddleboarding.",
  },
  {
    img: Tumba2,
    title: "Tumba-tumba Holidays",
    desc: "The shrines called tumba—the Spanish word for tomb—are fully decorated with flowers, images of saints and other appurtenances where the townspeople gather for prayers.",
  },
];

function Destination() {
  return (
    <div className="Main-Cont">
      {/* Background image rendered as a real div with inline style */}
      <div className="dest-bg" style={{ backgroundImage: `url(${bgImg})` }} />

      {/* Header */}
      <div className="dest-header">
        <h1>Best of San Narciso</h1>
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
