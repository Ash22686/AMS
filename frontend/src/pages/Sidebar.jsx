import React, { useState } from "react";
import { FcBullish } from "react-icons/fc";
import { Link, useLocation } from "react-router-dom";
import { HiOutlineLogout } from "react-icons/hi";
import { MdArrowDropDown } from "react-icons/md";
import { DASHBOARD_SIDEBAR_BOTTOM_LINKS, DASHBOARD_SIDEBAR_LINKS } from "../Data/data";

const linkClasses =
  "flex items-center gap-2 font-light px-3 py-2 hover:bg-neutral-700 hover:no-underline active:bg-neutral-600 rounded-sm text-base flex-wrap";

function Sidebar() {
  const location = useLocation();

  return (
    <div className="flex flex-col bg-neutral-900 p-3 w-1/6 min-h-screen text-white">
      <div className="flex items-center gap-2 px-1 py-3">
        <FcBullish fontSize={24} />
        <span className="text-neutral-100 text-lg">Farm Fusion</span>
      </div>
      <div className="flex-1 py-8 flex flex-col gap-0.5">
        {DASHBOARD_SIDEBAR_LINKS.map((item) => (
          <SidebarLink
            key={item.key}
            item={item}
            isActive={
              location.pathname === item.path || 
              (item.subLinks && item.subLinks.some(subItem => location.pathname === subItem.path))
            }
            location={location} // Pass location to SidebarLink
          />
        ))}
      </div>
      <div className="flex flex-col gap-0.5 pt-2 border-t border-neutral-700">
        {DASHBOARD_SIDEBAR_BOTTOM_LINKS.map((item) => (
          <SidebarLink
            key={item.key}
            item={item}
            isActive={location.pathname === item.path}
            location={location} // Pass location to SidebarLink
          />
        ))}
        <div className={`${linkClasses} text-red-600 font-normal cursor-pointer`}>
          <span className="text-xl">
            <HiOutlineLogout />
          </span>
          Logout
        </div>
      </div>
    </div>
  );
}

function SidebarLink({ item, isActive, location }) {
  const [isSubMenuOpen, setSubMenuOpen] = useState(false);

  const activeClasses = isActive ? "bg-neutral-700" : "";

  const toggleSubMenu = () => {
    setSubMenuOpen((prev) => !prev);
  };

  return (
    <div>
      {item.subLinks ? (
        <div
          className={`${linkClasses} ${activeClasses} font-normal cursor-pointer relative`}
          onClick={toggleSubMenu}
        >
          <span className="text-xl">{item.icon}</span>
          {item.label}
          <span
            className={`text-xl absolute right-3 transition-transform duration-300 ${
              isSubMenuOpen ? "rotate-180" : ""
            }`}
          >
            <MdArrowDropDown />
          </span>
        </div>
      ) : (
        <Link
          to={item.path}
          className={`${linkClasses} ${activeClasses} font-normal relative`}
        >
          <span className="text-xl">{item.icon}</span>
          {item.label}
        </Link>
      )}

      {/* Render Submenu */}
      {item.subLinks && isSubMenuOpen && (
        <div className="ml-6">
          {item.subLinks.map((subItem) => (
            <Link
              key={subItem.key}
              to={subItem.path}
              className={`${linkClasses} ${
                location.pathname === subItem.path ? "bg-neutral-700" : ""
              } font-normal`}
            >
              <span className="text-xl">{subItem.icon}</span>
              {subItem.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default Sidebar;
