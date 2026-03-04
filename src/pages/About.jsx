import "./About.css";
import heroImg from "../assets/ggg.jpg";

const commitments = [
  {
    icon: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
        <rect
          x="4"
          y="6"
          width="32"
          height="26"
          rx="2"
          stroke="white"
          strokeWidth="2"
        />
        <circle cx="15" cy="17" r="4" stroke="white" strokeWidth="2" />
        <path
          d="M4 26l8-6 6 5 6-7 12 9"
          stroke="white"
          strokeWidth="2"
          strokeLinejoin="round"
        />
      </svg>
    ),
    title: "Content",
    text: "We believe that great content should speak for itself and we take pride in helping all photographers showcase their incredible work — it's at the core of everything we do.",
  },
  {
    icon: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
        <path
          d="M20 34V20M20 20C20 20 12 18 12 10a8 8 0 0116 0c0 8-8 10-8 10z"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M14 28c-4 1-6 3-6 5h24c0-2-2-4-6-5"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    ),
    title: "Growth",
    text: "The creative journey doesn't have an end; there's always room for improvement. We're committed to creating a platform that challenges you to keep learning, and step outside of your comfort zone.",
  },
  {
    icon: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
        <path
          d="M20 6l3.5 7 7.5 1-5.5 5.5 1.5 7.5L20 24l-7 3 1.5-7.5L9 14l7.5-1z"
          stroke="white"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        <path
          d="M12 30l-4 6M28 30l4 6"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    ),
    title: "Recognition",
    text: "You work hard as a photographer and we know the importance of being recognized for your work and skills. We're constantly building ways to ensure our photographers get the recognition they deserve.",
  },
];

const differences = [
  {
    icon: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
        <rect
          x="6"
          y="10"
          width="28"
          height="22"
          rx="2"
          stroke="#1a1a1a"
          strokeWidth="2"
        />
        <circle cx="20" cy="21" r="6" stroke="#1a1a1a" strokeWidth="2" />
        <circle cx="20" cy="21" r="2" fill="#1a1a1a" />
        <path
          d="M6 15h4M30 15h4"
          stroke="#1a1a1a"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    ),
    title: "Grow as a photographer",
    text: "Get immediate exposure with your first upload. Our Pulse algorithm surfaces new photographs and photographers, ensuring your photos are seen by the community so you receive valuable feedback on day one.",
  },
  {
    icon: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
        <rect
          x="8"
          y="14"
          width="24"
          height="18"
          rx="2"
          stroke="#1a1a1a"
          strokeWidth="2"
        />
        <path
          d="M14 14v-3a6 6 0 0112 0v3"
          stroke="#1a1a1a"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M16 23h8M20 20v6"
          stroke="#1a1a1a"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    ),
    title: "Build your career",
    text: "Present yourself as a professional. Get hired by displaying your Services, create a Directory listing, showcase the Workshops you're holding, and create Galleries to highlight your work.",
  },
  {
    icon: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
        <path
          d="M6 32h4V22H6zM14 32h4V16h-4zM22 32h4V12h-4zM30 32h4V8h-4z"
          stroke="#1a1a1a"
          strokeWidth="2"
          strokeLinejoin="round"
        />
      </svg>
    ),
    title: "See your performance",
    text: "With Statistics and Pulse you get valuable insights into how your photos are performing and how you rank in comparison to other photographers in the community.",
  },
];

export default function About() {
  return (
    <div className="about-page">
      {/* ── SECTION 1: Teal commitment section ── */}
      <section className="about-teal">
        <h2>Our commitment to photographers</h2>
        <div className="about-cards">
          {commitments.map((c) => (
            <div key={c.title} className="about-card-teal">
              <div className="about-icon">{c.icon}</div>
              <h3>{c.title}</h3>
              <p>{c.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── SECTION 2: Full-width hero image ── */}
      <section className="about-hero">
        <img src={heroImg} alt="Photographer" className="about-hero-img" />
        <span className="about-photo-credit">Photo by Ryan Churi</span>
      </section>

      {/* ── SECTION 3: Yellow differences section ── */}
      <section className="about-yellow">
        <h2>What makes us different</h2>
        <div className="about-cards">
          {differences.map((d) => (
            <div key={d.title} className="about-card-yellow">
              <div className="about-icon-dark">{d.icon}</div>
              <h3>{d.title}</h3>
              <p>{d.text}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
