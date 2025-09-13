import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center card-ayurvedic max-w-md mx-4">
        <div className="text-6xl mb-6">🌿</div>
        <h1 className="mb-4 text-4xl font-bold text-foreground">404</h1>
        <p className="mb-6 text-xl text-muted-foreground">Oops! This path doesn't exist in our wellness journey</p>
        <a href="/" className="btn-primary">
          Return to Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
