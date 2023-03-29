import React,{useState} from 'react'
import { useSelector } from 'react-redux';
import '../layouts.css'
import { Link, useLocation, useNavigate } from 'react-router-dom';
function Layout({children}) {

  const currentpath=useLocation();
  const[collapsed,setCollapsed]=useState(false);
 
  const navigation=useNavigate();
   const { user } = useSelector((state) => state.user);
 console.log(user);
    const adminmenu = [
      {
        name: "Home",
        path: "/",
        icon: "fa fa-home",
      },
      {
        name: "Clients",
        path: "/admin/userslist",
        icon: "fa fa-user",
      },
      {
        name: "Lawyers",
        path: "/admin/lawyerslist",
        icon: "fa fa-balance-scale",
      },
      {
        name: "Profile",
        path: "/profile",
        icon: "fa fa-user",
      },
     
    ];

   const usermenu = [
     {
       name: "Home",
       path: "/",
       icon: "fa fa-home",
     },
     {
       name: "Join as a lawyer",
       path: "/joinasalawyer",
       icon: "fa fa-balance-scale",
     },
     {
       name: "Appointments",
       path: "/appointments",
       icon: "fa-solid fa-calendar-check",
     },
     {
       name: "Profile",
       path: "/profile",
       icon: "fa fa-user",
     },
     
   ];

   const menutoberendered=user?.isadmin? adminmenu:usermenu;

  return (
    <div className="main p-2">
      <div className="d-flex layout ">
        <div className={`${collapsed ? "collapsedsidebar" : "sidebar"}`}>
          <div className="sidebarheading ">
            {collapsed ? (
              <i
                className="fa-solid fa-bars d-flex justify-content-end"
                onClick={() => setCollapsed(false)}
              ></i>
            ) : (
              <i
                className="fa-solid fa-circle-xmark d-flex justify-content-end"
                onClick={() => setCollapsed(true)}
              ></i>
            )}
            {collapsed ? <h1>LS</h1> : <h1>Lawyer Services</h1>}
          </div>
          <div className="menu">
            {menutoberendered.map((menu) => {
              const currentlocation = currentpath.pathname === menu.path;
              return (
                <div
                  className={`d-flex mt-5 iconnames ${
                    currentlocation && "active-iconnames"
                  }`}
                >
                  <Link className="m-1" to={menu.path}>
                    <i className={menu.icon}></i>
                  </Link>

                  {!collapsed && (
                    <Link className="m-1" to={menu.path}>
                      {menu.name}
                    </Link>
                  )}
                </div>
              );
            })}
            <div
              className={`d-flex mt-5 iconnames `}
              onClick={() => {
                localStorage.clear();
                navigation("/login");
              }}
            >
              <i className="fa fa-sign-out"></i>
              {!collapsed && (
                <Link className="m-1" to="/login">
                  Logout
                </Link>
              )}
            </div>
          </div>
        </div>

        <div className="content">
          <div className="header mb-1">
            <div className="d-flex justify-content-end px-1">
              <span
                className="badge"
                onClick={() => navigation("/notifications")}
              >
                {user?.unseennotifications.length}{" "}
              </span>
            </div>
            <div className="d-flex justify-content-end username">
              <Link to="/profile" className="px-2">
                <i className="fa fa-user px-1"></i>
                {user?.firstname} {user?.lastname}
              </Link>
              <i className="fa-solid fa-bell px-3"></i>
            </div>
          </div>

          <div className="body p-2">{children}</div>
        </div>
      </div>
    </div>
  );
}

export default Layout
