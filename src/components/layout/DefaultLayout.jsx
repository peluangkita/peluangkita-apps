"use client";
import React, { useState, useRef } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";

export default function DefaultLayout({children}) {
  const mainContentRef = useRef(null);
  return (
    <>
      <div className="drawer lg:drawer-open">
        <Sidebar />
        <div className="drawer-content flex flex-col">
          <Header/>
          <main className="flex-1 overflow-y-auto md:pt-4 p-4 md:px-8" ref={mainContentRef}>
            {children}
          </main>
        </div>
      </div>
    </>
  );
}
