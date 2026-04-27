import React from "react";
import { Outlet } from "react-router-dom";
import Stepper from "../components/Stepper";

function MainLayout() {
  return (
    <>
      <Stepper />
      <Outlet />
    </>
  );
}

export default MainLayout;
