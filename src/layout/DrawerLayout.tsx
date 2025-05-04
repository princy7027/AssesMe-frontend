import path from "path";
import React, { useMemo } from "react";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import homelogo from "@/assets/homelogo.jpg";
import { LogOut, LayoutDashboard, FileText, List, Trophy, MessageCircle, UserCircle, Settings } from "lucide-react";

const adminItems = [
  { label: "Dashboard", path: "/admin-dashboard", icon: <LayoutDashboard className="w-5 h-5" /> },
  // {label : "Exam", path:"/admin-exam", icon: <FileText className="w-5 h-5" />},
];

const studentItems = [
  { label: "Exam", path: "/std-exam", icon: <FileText className="w-5 h-5" /> },
  { label: "All given exam", path: "/std-givenexam", icon: <List className="w-5 h-5" /> },
  { label: "Discussion", path: "/std-discussion/:examId", icon: <MessageCircle className="w-5 h-5" />, disabled: true },
  { label: "Result", path: "/std-allresult", icon: <Trophy className="w-5 h-5" /> },
];

const creatorItems = [
  { label: "Dashboard", path: "/creator-dashboard", icon: <LayoutDashboard className="w-5 h-5" /> },
  { label: "Exam", path: "/creator-exam", icon: <FileText className="w-5 h-5" /> },
  { label: "View exams", path: "/creator-viewexam", icon: <List className="w-5 h-5" /> },
  { label: "LeaderBoard", path: "/creator-leaderboard/:examId", icon: <Trophy className="w-5 h-5" />, disabled: true },
  {
    label: "Discussion",
    path: "/creator-discussion/:examId/:userId",
    icon: <MessageCircle className="w-5 h-5" />,
    disabled: true,
  },
];

const DrawerLayout = () => {
  const navigate = useNavigate();
  const checkUserRole = useMemo(() => {
    const decodedToken: any = jwtDecode(sessionStorage.getItem("token") ?? "");
    return decodedToken?.role ?? "";
  }, []);

  const handleLogout = () => {
    sessionStorage.clear();
    navigate("/login");
  };

  return (
    <section>
      <div className="fixed h-full">
        <aside className="w-[100%] h-full sticky p-4 slider text-lg bg-[#FF884D] overflow-auto shadow-2xl max-h-screen flex flex-col justify-between">
          <div>
            <nav className="flex justify-center items-center bg-none">
              <img src={homelogo} alt="LOGO" className="h-24 w-[200px]" />
            </nav>
            <hr className="h-0.5 mx-2 my-3 rounded " />
            <div className="pb-4">
              {checkUserRole === "student" &&
                studentItems.map((item) => (
                  <div
                    className="p-3 rounded-lg cursor-pointer transition-all duration-300
                               hover:bg-white/15 hover:shadow-lg hover:translate-x-1
                               active:transform active:scale-95
                               flex items-center space-x-3 group"
                    key={item.label}
                    onClick={() => {
                      if (!item.disabled) {
                        navigate(item.path);
                      }
                    }}
                  >
                    {item.icon}
                    <span className="group-hover:text-white">
                      {item.label}
                    </span>
                  </div>
                ))}
              {checkUserRole === "admin" &&
                adminItems.map((item) => (
                  <div
                    className="p-3 rounded-lg cursor-pointer transition-all duration-300
                  hover:bg-white/15 hover:shadow-lg hover:translate-x-1
                  active:transform active:scale-95
                  flex items-center space-x-3 group"
                    key={item.label}
                    onClick={() => {
                      if (!item.disabled) {
                        navigate(item.path);
                      }
                    }}
                  >
                    {item.icon}
                    <span className=" group-hover:text-white" >
                      {item.label}
                    </span>
                  </div>
                ))}
              {checkUserRole === "creator" &&
                creatorItems.map((item) => (
                  <div
                    className="p-3 rounded-lg cursor-pointer transition-all duration-300
                  hover:bg-white/15 hover:shadow-lg hover:translate-x-1
                  active:transform active:scale-95
                  flex items-center space-x-3 group"
                    key={item.label}
                    onClick={() => {
                      if (!item.disabled) {
                        navigate(item.path);
                      }
                    }}
                  >
                    {item.icon}
                    <span className=" group-hover:text-white" >
                      {item.label}
                    </span>
                  </div>
                ))}
            </div>
          </div>

          {/* Logout button at bottom */}
          <div className="mt-auto">
            <hr className="h-0.5 mx-2 my-3 rounded" />
            <div
              className="p-3 rounded-lg cursor-pointer transition-all duration-300
                         hover:bg-white/15 hover:shadow-lg
                         active:transform active:scale-95
                         flex items-center space-x-3 group"
              onClick={handleLogout}
            >
              <LogOut className="w-5 h-5" />
              <span className="group-hover:text-white">Logout</span>
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
};

export default DrawerLayout;
