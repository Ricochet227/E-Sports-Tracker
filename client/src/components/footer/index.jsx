import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "./footer.css";

export default function Foot() {
  const [isSticky, setIsSticky] = useState(false);
  const location = useLocation();

  useEffect(() => {
    function handleStickyFooter() {
      const footer = document.querySelector(".footer");
      const isDocumentHeightLessThanOrEqualToWindow =
        document.documentElement.scrollHeight <= window.innerHeight;
      const isScrolledToBottom =
        window.scrollY + window.innerHeight >=
        document.documentElement.scrollHeight - footer.offsetHeight;

      setIsSticky(
        isDocumentHeightLessThanOrEqualToWindow && isScrolledToBottom
      );
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
  }, [location.pathname]);

  return (
    <footer className={`footer ${isSticky ? "sticky-footer" : ""}`}>
      <div className="footContainer">
        <p>&copy; 2024 E-Sports Tracker. All rights reserved.</p>
      </div>
    </footer>
  );
}
