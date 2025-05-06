
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import Background from "@/components/Background";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-dark">
      <Background />
      <div className="glass-card p-8 text-center max-w-md">
        <h1 className="text-4xl font-bold mb-4 text-gradient">404</h1>
        <p className="text-xl text-white/80 mb-4">Oops! Page not found</p>
        <a href="/" className="text-glow-blue hover:text-glow-purple transition-colors underline">
          Return to Application
        </a>
      </div>
    </div>
  );
};

export default NotFound;
