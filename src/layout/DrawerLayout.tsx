import path from 'path'
import React, { useMemo } from 'react'
import {  jwtDecode } from "jwt-decode";
import { useNavigate } from 'react-router-dom';
import homelogo from '@/assets/homelogo.jpg'
const adminItems=[
    {label : "Dashboard",path:"/admin-dashboard"},
    {label : "Exam",path:"/admin-exam"},

]
const studentItems=[
    {label : "Dashboard",path:"/std-dashboard"},
    {label : "Exam",path:"/std-exam"},
    // {label :"LeaderBoard",path:"/std-leaderboard"},
    {label :"Discussion",path:"/std-discussion"},
    {label :"Result",path:"/std-result"},
    {label :"Profile",path:"/std-profile"}

]
const creatorItems=[
    {label : "Dashboard",path:"/creator-dashboard"},
    {label : "Exam",path:"/creator-exam"},
    {label :"LeaderBoard",path:"/creator-leaderboard"},
    {label :"Discussion",path:"/creator-discussion"},
    {label :"Profile",path:"/creator-profile"}


]
const DrawerLayout = () => {
  const navigate = useNavigate();
  const checkUserRole = useMemo(() => {
    const decodedToken: any = jwtDecode(sessionStorage.getItem("token") ?? "");
    return decodedToken?.role ?? "";
  }, []);

  return (
    <section>
      <div className="fixed h-full">
        <aside className="w-[100%]   h-full sticky p-4 slider text-lg bg-[#FF884D]  overflow-auto shadow-2xl max-h-screen">
          <nav className="flex justify-center items-center">
            <img src={homelogo} alt="LOGO" className="h-24 w-[200px]" />
          </nav>
          <hr className="h-0.5 mx-2 my-3 bg-gray-500 border-0 rounded dark:bg-gray-400" />
          <div className="pb-4">
          {checkUserRole === "student" &&
              studentItems.map((item) => (
                <div
                  className="pl-3 drawerIcon rounded hover:bg-[#d8cfea] hover:text-[#422b72]  transition duration-500 ease-in-out p-px hover:transform hover:scale-105 hover:shadow-lg cursor-pointer"
                  key={item.label}
                >
                  <span onClick={() => navigate(item.path)}>
                    {item.label}
                  </span>
                </div>
              ))}
          {checkUserRole === "admin" &&
              adminItems.map((item) => (
                <div
                  className="pl-3 drawerIcon rounded hover:bg-[#d8cfea] hover:text-[#422b72]  transition duration-500 ease-in-out p-px hover:transform hover:scale-105 hover:shadow-lg cursor-pointer"
                  key={item.label}
                >
                  <span onClick={() => navigate(item.path)}>
                    {item.label}
                  </span>
                </div>
              ))}
          {checkUserRole === "creator" &&
              creatorItems.map((item) => (
                <div
                  className="pl-3 drawerIcon rounded hover:bg-[#d8cfea] hover:text-[#422b72]  transition duration-500 ease-in-out p-px hover:transform hover:scale-105 hover:shadow-lg cursor-pointer"
                  key={item.label}
                >
                  <span onClick={() => navigate(item.path)}>
                    {item.label}
                  </span>
                </div>
              ))}

  
          </div>
        </aside>
      </div>
    </section>
  )
}

export default DrawerLayout