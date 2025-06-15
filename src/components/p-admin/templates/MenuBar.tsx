"use client"

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Swal from "sweetalert2";
import DarkMode from "@comp_global/DarkMode";
import Logo from "@comp_global/Logo";
import ClickTracker from "@comp_global/ClickTracker";
import ResizeListener from "@comp_global/ResizeListener";
import ProfileList from "../modules/ProfileList";
//
import { HiMenuAlt1 } from "react-icons/hi";
import { TbSettings, TbUsers, TbHome, TbCategory2, TbTruckDelivery, TbUserDollar, TbUserShield } from "react-icons/tb";
import { RiShutDownLine } from "react-icons/ri";
import { IoIosArrowBack } from "react-icons/io";
import { IoEarthOutline, IoLanguage } from "react-icons/io5";
import { LiaToolsSolid } from "react-icons/lia";
import { LuLayoutPanelLeft, LuSettings2 } from "react-icons/lu";
import { MdMiscellaneousServices } from "react-icons/md";
import { PiToolboxDuotone } from "react-icons/pi";
import { FaRegCreditCard } from "react-icons/fa";
import { HiOutlineClipboardDocumentList } from "react-icons/hi2";

type MenuBarProps = {
  onBlur: (blur: boolean) => void
}

type SubItem = {
  id: number;
  to: string;
  title: string;
  icon: React.ReactElement;
  active: boolean;
};

type SidebarItem = {
  id: number;
  to: string;
  icon: React.ReactElement;
  active: boolean;
  subItems?: SubItem[];
};

const MenuBar = ({ onBlur }: MenuBarProps) => {
  const pathname = usePathname();
  const refMenu = useRef<any>(null);
  //
  const [isScreenBig, setIsScreenBig] = useState<boolean>(false);
  const [widthScreen, setWidthScreen] = useState<number>(1);
  const [dynamicSize, setDynamicSize] = useState<311 | 227 | 0 | 84>(0);
  const [isAsideOpen, setIsAsideOpen] = useState<boolean>(false);
  const [isAsideTwoOpen, setIsAsideTwoOpen] = useState<boolean>(false);
  const [isRouteAside, setIsRouteAside] = useState<boolean>(false);
  const [sidebarItems, setSidebarItems] = useState<SidebarItem[]>([
    {
      id: 1, to: "", icon: <TbHome className="w-7 h-7" />, active: false, subItems: [
        {
          id: 1,
          to: "home",
          title: "Home",
          icon: <TbHome className="!min-h-6 !min-w-6" />,
          active: false
        },
        {
          id: 2,
          to: "profile",
          title: "Profile",
          icon: <TbUserShield className="!min-h-6 !min-w-6" />,
          active: false
        },
      ]
    },
    { id: 2, to: "users", icon: <TbUsers className="w-7 h-7" />, active: false },
    {
      id: 3, to: "", icon: <TbUserDollar className="w-7 h-7" />, active: false, subItems: [
        {
          id: 1,
          to: "tasker-verifications",
          title: "Verifications",
          icon: <TbUsers className="!min-h-6 !min-w-6" />,
          active: false
        },
        {
          id: 2,
          to: "tasker-panel",
          title: "Panels",
          icon: <LuLayoutPanelLeft className="!min-h-6 !min-w-6" />,
          active: false
        },
        {
          id: 3,
          to: "tasker-subscriptions",
          title: "Subscriptions",
          icon: <FaRegCreditCard className="!min-h-6 !min-w-6" />,
          active: false
        },
      ]
    },
    {
      id: 4,
      to: "",
      icon: <PiToolboxDuotone className="w-7 h-7" />,
      active: false,
      subItems: [
        {
          id: 1,
          to: "vehicles",
          title: "Vehicles",
          icon: <TbTruckDelivery className="!min-h-6 !min-w-6" />,
          active: false
        },
        {
          id: 2,
          to: "tools",
          title: "Tools",
          icon: <LiaToolsSolid className="!min-h-6 !min-w-6" />,
          active: false
        }
      ]
    },
    {
      id: 5,
      to: "",
      icon: <TbCategory2 className="w-7 h-7" />,
      active: false,
      subItems: [
        {
          id: 1,
          to: "categories",
          title: "Categories",
          icon: <TbCategory2 className="!min-h-6 !min-w-6" />,
          active: false
        },
        {
          id: 2,
          to: "services",
          title: "Services",
          icon: <LuSettings2 className="!min-h-6 !min-w-6" />,
          active: false
        },
        {
          id: 3,
          to: "service-details",
          title: "Service Details",
          icon: <MdMiscellaneousServices className="!min-h-6 !min-w-6" />,
          active: false
        },
        {
          id: 4,
          to: "service-tools",
          title: "Service Tools",
          icon: <LiaToolsSolid className="!min-h-6 !min-w-6" />,
          active: false
        },
        {
          id: 5,
          to: "service-vehicles",
          title: "Service Vehicles",
          icon: <TbTruckDelivery className="!min-h-6 !min-w-6" />,
          active: false
        }
      ]
    },
    {
      id: 6, to: "", icon: <IoEarthOutline className="w-7 h-7" />, active: false,
      subItems: [
        {
          id: 1,
          to: "languages",
          title: "Languages",
          icon: <IoLanguage className="!min-h-6 !min-w-6" />,
          active: false
        },
        {
          id: 2,
          to: "countries",
          title: "Countries",
          icon: <IoEarthOutline className="!min-h-6 !min-w-6" />,
          active: false
        }
      ]
    },
    {
      id: 7, to: "", icon: <TbSettings className="w-7 h-7" />, active: false, subItems: [
        {
          id: 1,
          to: "subscriptions",
          title: "Subscription",
          icon: <FaRegCreditCard className="!min-h-6 !min-w-6" />,
          active: false
        },
        {
          id: 2,
          to: "policy",
          title: "Policy",
          icon: <HiOutlineClipboardDocumentList className="!min-h-6 !min-w-6" />,
          active: false
        },
      ]
    },
  ])

  useEffect(() => {
    determinationBehaviorAside()
  }, [])

  useEffect(() => {
    /*  sidebarItems.map(item => item?.subItems?.map(subItem => {
       if (subItem.active && isScreenBig) {
         setIsAsideTwoOpen(true)
         setDynamicSize(311)
         setIsRouteAside(false)
       }
     })) */
  }, [sidebarItems])

  useEffect(() => {
    if (pathname.includes("/profile")) {
      handleClick(pathname)
    }
  }, [pathname])

  useEffect(() => {
    if (!isAsideTwoOpen && !isRouteAside) {
      determinationBehaviorAside()
    }
    if (!isScreenBig) {
      if (isAsideTwoOpen || isAsideOpen) {
        onBlur(true)
      } else onBlur(false)
    }
  }, [isAsideTwoOpen, isAsideOpen])

  useEffect(() => {
    if (innerWidth >= 1280) {
      setIsScreenBig(true)
      setIsAsideOpen(true)
      setIsAsideTwoOpen(isRouteAside ? false : true)
      setDynamicSize(isRouteAside ? 84 : 311)
    } else {
      setIsScreenBig(false)
      setIsAsideOpen(false)
      setIsAsideTwoOpen(false)
      setDynamicSize(0)
    }
    setWidthScreen(innerWidth);
  }, [widthScreen, pathname])

  useEffect(() => {
    sidebarItems.map(item => pathname === `/admin/${item.to}` && selectionItemHandle(item.id, true))
  }, [pathname])

  useEffect(() => {
    const docElem = document.documentElement.style
    docElem.setProperty("--menu-size", `${dynamicSize}px`)
    docElem.setProperty("--menu-secondary-size", isAsideTwoOpen ? "227px" : "0px")
  }, [dynamicSize, isAsideTwoOpen]);

  // Funcs

  const resizeMenuHandler = (isLink: boolean) => {

    if (isLink || !isScreenBig) {
      setIsAsideTwoOpen(false)
      setDynamicSize(dynamicSize === 0 ? 84 : 0)
      setIsAsideOpen(prev => !prev)
    } else {
      setIsAsideTwoOpen(!isAsideTwoOpen)
      setDynamicSize(dynamicSize === 84 ? 311 : 84)
    }
  };

  const determinationBehaviorAside = () => {
    const activeItemInSidebar: any = [...sidebarItems].map(item => {

      const childrenSidebar: any = item.subItems && item.subItems.map(sub => pathname === `/admin/${sub.to}` ? { ...sub, active: true } : { ...sub, active: false })

      if (childrenSidebar) {

        const isHasChild = childrenSidebar.find((menu: any) => menu.active)
        return { ...item, active: isHasChild ? true : false, subItems: childrenSidebar }
      }
      else if (pathname === `/admin/${item.to}`)
        return { ...item, active: true }
      else
        return { ...item, active: false }
    })

    setSidebarItems(activeItemInSidebar)
    sidebarItems.some(item => pathname === `/admin/${item.to}` && setIsRouteAside(true))
  }

  const selectionItemHandle = (itemID: number, isLink: boolean) => {
    setIsRouteAside(isLink)
    const activeItemInSidebar = [...sidebarItems].map(item => {
      if (item.id === itemID) {
        return { ...item, active: true }
      } else
        return { ...item, active: false }
    })
    setSidebarItems(activeItemInSidebar)
  }

  const signOutUserHandler = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You are logging out of your account!!",
      icon: "warning",
      reverseButtons: true
    }).then(async result => {
      if (result.isConfirmed) {
        //signOutUser()
      }
    });
  }

  const handleClick = (to: string) => {
    setSidebarItems((prev: SidebarItem[]) =>
      prev.map((item: SidebarItem) => {
        const hasActiveSubItem = item.subItems?.some(
          (subItem: SubItem) => subItem.to === to.slice(7)
        );

        return {
          ...item,
          active: item.to === to.slice(7) || !!hasActiveSubItem,
          subItems: item.subItems?.map((subItem: SubItem) => ({
            ...subItem,
            active: subItem.to === to.slice(7),
          })),
        };
      })
    );
  };

  return (
    <>
      <header className={`flex justify-end relative z-50`}>
        <div
          style={{ width: `calc(100% - var(--menu-size))` }}
          className={`fixed transition-all duration-500 bg-(--background) shadow-[10px_1px_12px_var(--shadow-light-gray)] flex items-center justify-between p-3`}
        >
          <div className="flex items-center">
            <div className={`inline-flex 1280:hidden me-2 transition-all duration-500 ${!isAsideOpen ? "flex" : "hidden"}`}>
              <Logo to="/" style="w-14" />
            </div>
            <div
              className={`transition-all duration-500 ${isScreenBig && isRouteAside || !isScreenBig && isAsideTwoOpen ? "opacity-0 invisible" : "opacity-100 visible"}`}
              onClick={() => resizeMenuHandler(isRouteAside)}
            >
              {
                isAsideTwoOpen
                  ? <HiMenuAlt1 className="svg-panel" />
                  : <IoIosArrowBack className="svg-panel" />
              }
            </div>
          </div>

          <section className="flex items-center flex-row-reverse">
            <ProfileList />
            <div className="parent-svg-panel">
              <DarkMode />
            </div>
          </section>
        </div>
      </header>

      <aside className={`${!isAsideOpen && !isAsideTwoOpen ? "translate-x-[-311px]" : "translate-x-0"} z-40 min-h-full flex fixed top-0 transition-all duration-500`} ref={refMenu}>

        <div className={`${isAsideOpen ? "translate-x-[0px] opacity-100 visible" : "translate-x-[-84px] opacity-0 invisible"} bg-(--background) border-r-4 border-(--light-primary) p-3 transition-all duration-500`}>

          <div className="flex items-center justify-between pb-6">
            <div className="flex items-center">
              <Logo to="/" style="w-14"/>
            </div>
          </div>

          <div>

            {
              sidebarItems.map(item => (
                <div key={item.id}>
                  {
                    item.subItems
                      ?
                      <div onClick={() => {
                        setIsAsideTwoOpen(true)
                        setDynamicSize(311)
                        selectionItemHandle(item.id, false)
                      }}>
                        <div className={`route-list ${item.active ? "route-list-active" : ""}`}>
                          {item.icon}
                        </div>
                      </div>
                      :
                      <Link href={`/admin/${item.to}`} onClick={() => {
                        setIsAsideTwoOpen(false)
                        setDynamicSize(84)
                        selectionItemHandle(item.id, true)
                      }}>
                        <div className={`route-list flex items-center ${item.active ? "route-list-active" : ""}`}>
                          {item.icon}
                        </div>
                      </Link>
                  }
                </div>
              ))
            }

            <div className="route-list hover:!bg-red-400 hover:text-white" onClick={signOutUserHandler}>
              <RiShutDownLine className="w-7 h-7" />
            </div>

          </div>

        </div>

        <div style={{ width: "var(--menu-secondary-size)" }} className={`${isAsideTwoOpen && isAsideOpen ? "translate-x-[0] opacity-100 visible" : "translate-x-[-227px] opacity-0 invisible"} bg-(--background) w-[227px] shadow-[1px_0_12px_var(--shadow-light-gray)] px-4 pb-3 pt-6 transition-all duration-500`}>
          <div className="flex items-center justify-between">
            <p className="text-xl drop-shadow-lg">Dashboard</p>

            {
              !isScreenBig ?
                <div onClick={() => {
                  setIsAsideTwoOpen(false)
                  setDynamicSize(84)
                }} className="bg-(--bg-light-gray) rounded-l-xl absolute right-0 top-5">
                  <IoIosArrowBack className="svg-panel" />
                </div>
                : ""
            }

          </div>

          <div className="pt-4">
            {
              !isRouteAside &&
              sidebarItems.map(item => (
                item.active && item.subItems?.map(subitem => (
                  <div key={subitem.id}>

                    <Link key={subitem.id} href={`/admin/${subitem.to}`}>
                      <div className={`route-list flex items-center ${item.active && pathname === `/admin/${subitem.to}` ? "route-list-active" : ""}`}>
                        {subitem.icon}
                        <p className="ps-2 min-w-max">{subitem.title}</p>
                      </div>
                    </Link>

                  </div>
                ))
              ))
            }
          </div>
        </div>

      </aside>

      <ResizeListener onResize={width => setWidthScreen(width)} />

      <ClickTracker
        targetRef={refMenu}
        onClickDetected={() => {
          if (!isScreenBig) {
            setIsAsideTwoOpen(false);
            setIsAsideOpen(false);
            setDynamicSize(0)
          }
        }}
      />
    </>
  );
};

export default MenuBar;