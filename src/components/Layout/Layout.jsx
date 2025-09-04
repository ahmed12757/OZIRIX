import React from "react";
import Navbar from "../navpar/Navbar";
import { Outlet } from "react-router-dom";
import Footer from "../footer/Footer";

export default function Layout() {
  return (
    <>
      <div className="  ">
        <Navbar />
        <div className=" ">
          <Outlet></Outlet>
        </div>
        <Footer />
      </div>
    </>
  );
}
