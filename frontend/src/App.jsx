import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Events from "./pages/Events";
import Registration from "./pages/Registration";
import Gallery from "./pages/Gallery";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import { useTheme } from "./context/ThemeContext";
import Login from "./pages/Login";
import Signup from "./pages/SignUp";

function App() {
  const { theme } = useTheme();

  return (
    <div className={theme}>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/events" element={<Events />} />
          <Route path="/register" element={<Registration />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </main>
      <footer className="site-footer">
        <span>TECHFEST 2026</span>
        <span>BUILD / CREATE / CONNECT</span>
      </footer>
    </div>
  );
}

export default App;
