"use client";
import { useState } from "react";


export default function Sidebar() {
    const [isSidebarOpen, setSidebarOpen] = useState(true);

    const toggleSidebar = () => {
      setSidebarOpen(!isSidebarOpen);
    };
 
  
        return (
            <aside className={`bg-gray-800 text-white p-6 transition-all duration-500 ease-in-out ${isSidebarOpen ? 'w-64' : 'w-24'}`}>
              <button onClick={toggleSidebar} className="mb-4 text-white hover:text-gray-300">
                {isSidebarOpen ? (
                  <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" className="w-6 h-6">
                    <path d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
                ) : (
                  <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" className="w-6 h-6">
                    <path d="M4 6h16M4 12h16m-7 6h7"></path>
                  </svg>
                )}
              </button>
              <ul>
                <li className="mb-4 flex items-center">
                  <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" className="w-6 h-6">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14h2v2h-2v-2zm0-10h2v6h-2V6z"></path>
                  </svg>
                  <span className={`ml-2 transition-all duration-1000 ease-in-out ${isSidebarOpen ? 'opactiy-1' : 'opacity-0 w-0 h-0'}`}>Link 1</span>
                </li>
                <li className="mb-4 flex items-center">
                  <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" className="w-6 h-6">
                    <path d="M21 8l-8 8-4-4-4 4-1.5-1.5L13 10l8.5-8.5L21 8z"></path>
                  </svg>
                  <span className={`ml-2  transition-all duration-1000 ease-in-out ${isSidebarOpen ? 'opactiy-1' : 'opacity-0 w-0 h-0'}`}>Link 2</span>
                </li>
                <li className="mb-4 flex items-center">
                  <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" className="w-6 h-6">
                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 1 21 12.79zM18 13a3 3 0 0 1-3 3"></path>
                  </svg>
                  <span className={`ml-2 transition-all duration-1000 ease-in-out ${isSidebarOpen ? 'opactiy-1' : 'opacity-0 w-0 h-0'}`}>Link 3</span>
                </li>
                <li className="mb-4 flex items-center">
                  <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" className="w-6 h-6">
                    <path d="M21 8l-8 8-4-4-4 4-1.5-1.5L13 10l8.5-8.5L21 8z"></path>
                  </svg>
                  <span className={`ml-2 transition-all duration-1000 ease-in-out ${isSidebarOpen ? 'opactiy-1' : 'opacity-0 w-0 h-0'}`}>Link 4</span>
                </li>
              </ul>
            </aside>
          );
 }



