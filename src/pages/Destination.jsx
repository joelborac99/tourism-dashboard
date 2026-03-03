import "./Destination.css";
import heroImg from "../assets/ggg.jpg";
import { FaStar } from "react-icons/fa";
import { FaStarHalf } from "react-icons/fa6";
import palms from "../assets/The Palms.png";

function Destination() {
  const img = "DAdal";
  const Star = () => (
    <FaStar
      style={{
        color: "white",
        fontSize: "20px",
        marginLeft: "5px",
      }}
    />
  );
  const Starhalf = () => (
    <FaStarHalf
      style={{
        color: "white",
        fontSize: "20px",
        marginLeft: "5px",
      }}
    />
  );
  return (
    <>
      <div className="Main-Cont">
        <div className="CC num1">sd</div>
        <div className="CC num2">
          <span>
            The Palms Resort & Bar{<br />}
            {<Star />}
            {<Star />}
            {<Star />}
            {<Starhalf />}
            <img src={palms} />
          </span>
          <span>
            {img}
            ADAS<img src={heroImg}></img>
          </span>
          <span>
            {img}
            ADAS<img src={heroImg}></img>
          </span>
          <span>
            {img}
            ADAS<img src={heroImg}></img>
          </span>
          <span>
            {img}
            ADAS<img src={heroImg}></img>
          </span>
          <span>
            {img}
            ADAS<img src={heroImg}></img>
          </span>
        </div>
      </div>
      ;
    </>
  );
}

export default Destination;
