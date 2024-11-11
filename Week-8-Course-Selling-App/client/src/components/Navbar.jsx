import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import {
  Bell,
  BookOpen,
  Heart,
  LogOut,
  Search,
  Settings,
  User,
} from "lucide-react";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BACKEND_URL } from "@/utils/constants";

export default function Navbar() {
  const navigate = useNavigate();

  async function handleLogOut() {
    localStorage.removeItem("token");

    try {
      await axios.get(`${BACKEND_URL}/api/v1/user/logout`, {
        withCredentials: true
      });
    } catch (error) {
      console.error(error);
    } finally {
      navigate("/");
    }
  }

  return (
    <nav className="bg-white border-b">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Left Side - Logo */}
          <div className="flex items-center space-x-8">
            <Button
              variant="ghost"
              onClick={() => navigate("/")}
              className="flex items-center space-x-2 hover:bg-transparent"
            >
              <BookOpen className="h-6 w-6 text-blue-600" />
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 text-transparent bg-clip-text">
                Learneo
              </span>
            </Button>
          </div>

          {/* Center - Search Input */}
          <div className="flex-1 flex justify-center">
            <div className="relative w-full max-w-md lg:max-w-lg">
              <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                type="text"
                placeholder="Search courses..."
                className="pl-9 pr-4 h-10 w-full bg-gray-50 border-gray-200 focus:bg-white"
              />
            </div>
          </div>

          {/* Right Side - Navigation Buttons and Profile */}
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              onClick={() => navigate("/my-learning")}
              className="text-gray-600 hover:text-gray-900 hover:bg-gray-50 h-16 rounded-none relative group"
            >
              <span className="font-medium">My Learning</span>
              <div className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-200" />
            </Button>

            <Button
              variant="ghost"
              onClick={() => navigate("/wishlist")}
              className="text-gray-600 hover:text-gray-900 hover:bg-gray-50 h-16 rounded-none relative group"
            >
              <Heart className="h-4 w-4" />
              <span className="font-medium">Wishlist</span>
              <div className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-200" />
            </Button>

            {/* Notifications */}
            <Button
              variant="ghost"
              size="icon"
              className="text-gray-600 hover:text-gray-900 hover:bg-gray-50 relative"
            >
              <span className="sr-only">View notifications</span>
              <Bell className="h-5 w-5" />
              <div className="absolute top-2 right-2 h-2 w-2 bg-red-500 rounded-full" />
            </Button>

            {/* Profile Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="flex items-center space-x-2 hover:bg-gray-50"
                >
                  <Avatar className="h-8 w-8">
                    <AvatarImage
                      src="https://github.com/shadcn.png"
                      alt="User avatar"
                    />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">John Doe</p>
                    <p className="text-xs leading-none text-gray-500">
                      john@example.com
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer">
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer text-red-600 focus:text-red-600">
                  <LogOut className="mr-2 h-4 w-4" />
                  <button onClick={handleLogOut}>Log out</button>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </nav>
  );
}
