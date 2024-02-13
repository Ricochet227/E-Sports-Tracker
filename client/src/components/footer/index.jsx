import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "./Footer.css";

export default function Foot() {
  const [isSticky, setIsSticky] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    function handleStickyFooter() {
      const footer = document.querySelector(".footer");
      const isContentScrollable =
        document.body.scrollHeight > window.innerHeight;

      if (!hasScrolled) {
        // Do not set isSticky on first load
        setHasScrolled(true);
        return;
      }

      setIsSticky(!isContentScrollable);
    }

    function handleScroll() {
      handleStickyFooter();
    }

    // Initial check
    handleStickyFooter();

    // Recalculate on window resize
    window.addEventListener("resize", handleStickyFooter);

    // Check scroll position on scroll
    window.addEventListener("scroll", handleScroll);

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleStickyFooter);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [location.pathname, hasScrolled]);

  return (
    <footer className={`footer ${isSticky ? "sticky-footer" : ""}`}>
      <div className="footContainer">
        <p>&copy; 2024 E-Sports Tracker. All rights reserved.</p>
      </div>
    </footer>
  );
}
