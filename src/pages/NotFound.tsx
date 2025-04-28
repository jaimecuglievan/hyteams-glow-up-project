
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="text-center max-w-md">
        <div className="mb-8">
          <h1 className="text-hyteams-pink text-9xl font-bold mb-4">404</h1>
          <div className="w-16 h-1 bg-hyteams-pink mx-auto mb-6"></div>
          <p className="text-xl text-gray-600 mb-8">
            Oops! The page you're looking for isn't here.
          </p>
        </div>
        
        <Link to="/">
          <Button className="bg-hyteams-pink hover:bg-hyteams-pink/90">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Return to Home
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
