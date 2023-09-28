import React, { useContext, useEffect, useRef } from "react";
import { AppContext } from "../../../App";
import { toast } from "react-toastify";
import MyLink from "../MyLink";

function Sidebar({ openedSidebar, setOpenedSidebar, width }) {
  const { activeTab, language } = useContext(AppContext);
  const ref = useRef();
  const tabs = [
    {
        name: language.dashboard,
        icon: "fas fa-tachometer-alt",
        link: ""
    },
    {
        name: language.categories,
        icon: "fas fa-list",
        link: "categories"
    },
    {
        name: language.products,
        icon: "fas fa-box",
        link: "products"
    },
    {
        name: language.clients,
        icon: "fas fa-users",
        link: "clients"
    },
    {
        name: language.orders,
        icon: "fas fa-shopping-cart",
        link: "orders"
    },
    {
        name: language.settings,
        icon: "fas fa-cog",
        link: "settings"
    },
    
  ];
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current == e.target ) {
        setOpenedSidebar(false);
      }
    };
    ref.current.addEventListener("click", handleClickOutside);
    return () => {
      ref.current.removeEventListener("click", handleClickOutside);
    };
  }, [openedSidebar]);
  return (
    <div
      ref={ref}
      className={`
        w-full left-0 fixed z-50 top-[66px] min-h-[calc(100vh-66px)]
        ${openedSidebar ? "bg-black bg-opacity-25" : "min-h-0 max-h-0"}
      `}>
      <div
        className={`flex flex-col left-0 fixed z-50 top-[66px] ${
          width < 767
            ? openedSidebar
              ? "left-0 !top-[66px] reveal light min-h-[calc(100vh-66px)] shadow "
              : "!-left-[270px]"
            : 'reveal'
        } w-[270px] min-h-[calc(100vh-66px)] py-4 px-4 transition-all duration-300 overflow-hidden`}
      >
        <div className="flex flex-col justify-start w-full gap-4 min-h-[calc(100vh-138px)] md:min-h-[calc(100vh-128px)] flex-grow-0 flex-shrink-0">
          {tabs.map((tab, i) => (
              <MyLink
                  key={i}
                  to={tab.link}
                  className={`
                      ${
                          activeTab == tab.name ? "activeTab" : ""
                      } flex items-center w-full rounded-full  py-2 px-2 gap-4 cursor-pointer transition-all duration-300 hover:bg-light-secondary-300
                      dark:hover:bg-dark-primary-400 group
                  `}
              >
                  <div className="flex w-[40px] h-[40px] bg-dark-primary-700 dark:bg-dark-secondary-700 text-light-primary-500 
                                  justify-center items-center rounded-full shadow-md 
                                  transition-all duration-300 group-hover:bg-light-primary-500dark-soft 
                  ">
                  <i className={`${tab.icon} text-1xl transition-all duration-300`}></i>
                  </div>
                  <p className="text-light-quarternary-500 dark:text-dark-tertiary-300 dark-soft">{tab.name}</p>
              </MyLink>
          ))}

        </div>
      </div>
    </div>
  );
}

export default Sidebar;
