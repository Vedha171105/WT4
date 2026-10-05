import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="page not-found">
      <span className="shape shape-blue"></span>
      <span className="shape shape-yellow"></span>
      <span className="shape shape-coral"></span>
      <div>
        <span className="eyebrow">ERROR / 404</span>
        <h1>404</h1>
        <h2>PAGE NOT FOUND.</h2>
        <p>The page you're looking for doesn't exist or has moved.</p>
        <Link to="/" className="black-btn">GO BACK HOME →</Link>
      </div>
    </div>
  );
}

export default NotFound;
