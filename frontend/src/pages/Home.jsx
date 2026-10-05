import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const TEAM_MEMBERS = [
  {
    name: "Dr. Anita Joseph",
    role: "Faculty Coordinator",
    dept: "Professor, CSE Dept.",
    img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80",
  },
  {
    name: "Rahul Menon",
    role: "Event Head",
    dept: "Student Coordinator",
    img: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80",
  },
  {
    name: "Sneha Nair",
    role: "Technical Head",
    dept: "Student Coordinator",
    img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
  },
  {
    name: "Akhil Krishna",
    role: "Registration Head",
    dept: "Student Coordinator",
    img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
  },
  {
    name: "Ananya R.",
    role: "Publicity Head",
    dept: "Student Coordinator",
    img: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80",
  },
];

const SPONSORS = [
  { name: "TechNova Solutions", role: "Title Sponsor", logo: "/data/technova.png" },
  { name: "CodeSphere Technologies", role: "Technical Partner", logo: "/data/codesphere.png" },
  { name: "CyberShield Pvt. Ltd.", role: "Security Partner", logo: "/data/cybershield.png" },
  { name: "Developer Students Club", role: "Community Partner", logo: "/data/dsc.png" },
];

function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts?_limit=3")
      .then((response) => {
        if (!response.ok) throw new Error("Request failed");
        return response.json();
      })
      .then((data) => {
        setPosts(data);
        setLoading(false);
      })
      .catch(() => {
        setError("Could not load announcements");
        setLoading(false);
      });
  }, []);

  return (
    <div className="page home-page">
      {/* Hero Section */}
      <section className="hero-bento">
        <div className="hero-main">
          <span className="eyebrow">Tech Fest / MBCET / OCT 2026</span>
          <h1>AAROHAN<br /><span>2026</span></h1>
          <p>AAROHAN 2026 is the annual flagship technical festival organized by the Department of Computer Science and Engineering.</p>
          <Link to="/events" className="black-btn">EXPLORE EVENTS ↗</Link>
        </div>

        <div className="hero-photo">
          <img src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1000&q=80" alt="Tech event" />
          <span>01 / 04</span>
        </div>

        <div className="announcement-card">
          <span className="eyebrow">NEXT ANNOUNCEMENT</span>
          <h2>Registrations<br />are OPEN.</h2>
          <h2>Exciting Cash Prizes and Certificates for all!</h2>
          <p>Pick your event. Bring your team. Make something memorable.</p>
          <Link to="/register" className="text-link">REGISTER NOW →</Link>
        </div>
      </section>

      {/* Stats Bento */}
      <section className="stats-bento">
        <div className="stat yellow"><strong>10+</strong><span>EVENTS</span></div>
        <div className="stat coral"><strong>₹1,00,000</strong><span>PRIZE POOL</span></div>
        <div className="stat green"><strong>03</strong><span>DAYS OF INNOVATION</span></div>
        <div className="updates-card">
          <div className="section-label">LIVE FEED / 001</div>
          {loading && <p>LOADING...</p>}
          {error && <p className="error-msg">{error}</p>}
          {!loading && !error && (
            <ul>
              {posts.map((post) => <li key={post.id}>{post.title}</li>)}
            </ul>
          )}
        </div>
      </section>

      {/* Intro Strip */}
      <section className="intro-strip">
        <span>01</span>
        <h2>CODE. CREATE.<br />CONNECT.</h2>
        <p>One portal for every TechFest moment. Browse events, register, explore the gallery and stay updated.</p>
        <Link to="/gallery" className="outline-btn">VIEW GALLERY →</Link>
      </section>

      {/* Meet the Team */}
      <section className="frame3-container">
        <h2 className="team-title">MEET THE TEAM</h2>
        <div style={{ display: "flex", gap: "24px", overflowX: "auto", padding: "40px 10px 20px" }}>
          {TEAM_MEMBERS.map((member, index) => (
            <div key={index} className="team-card" style={{ flex: "0 0 200px" }}>
              <div className="avatar-circle">
                <img src={member.img} alt={member.name} />
              </div>
              <div className="card-info">
                <h4>{member.name}</h4>
                <p className="role">{member.role}</p>
                <p className="dept">{member.dept}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Official Sponsors (Styled Identically to Meet the Team) */}
      <section className="frame4-container">
        <h2 className="sponsors-title">OFFICIAL SPONSORS</h2>
        <div style={{ display: "flex", gap: "24px", overflowX: "auto", padding: "40px 10px 20px" }}>
          {SPONSORS.map((sponsor, index) => (
            <div key={index} className="team-card sponsor-card-matched" style={{ flex: "0 0 200px" }}>
              <div className="avatar-circle sponsor-avatar-circle">
                <img 
                  src={sponsor.logo} 
                  alt={sponsor.name} 
                  onError={(e) => { 
                    e.target.style.display = 'none'; 
                  }} 
                />
              </div>
              <div className="card-info">
                <h4>{sponsor.name}</h4>
                <p className="role">{sponsor.role}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Home;