import React from "react";
import SideBar from "./components/SideBar/SideBar";
import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <div className="App">
      <div className="AppGlass">
        <SideBar />
        <div className="main-content">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Layout;
