
import { Link, useLocation } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { CalendarIcon, Users, Home as HomeIcon, BarChart4, User } from "lucide-react";

export default function Navbar() {
  const location = useLocation();
  
  const navItems = [
    { name: "Home", path: "/", icon: <HomeIcon className="h-4 w-4" /> },
    { name: "Planning", path: "/planning", icon: <CalendarIcon className="h-4 w-4" /> },
    { name: "Teams", path: "/teams", icon: <Users className="h-4 w-4" /> },
    { name: "Agenda", path: "/agenda", icon: <BarChart4 className="h-4 w-4" /> },
    { name: "Profile", path: "/profile", icon: <User className="h-4 w-4" /> },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 shadow-nav z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <span className="text-2xl font-bold">
                <span className="text-black">hy</span>
                <span className="text-hyteams-pink">Teams</span>
                <span className="text-hyteams-blue">.</span>
              </span>
            </Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={cn(
                  "nav-link flex items-center space-x-1",
                  location.pathname === item.path && "active"
                )}
              >
                {item.icon}
                <span>{item.name}</span>
              </Link>
            ))}
          </div>
          
          <div className="flex items-center">
            <Avatar className="cursor-pointer hover:opacity-90 transition-opacity">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </div>
    </nav>
  );
}
