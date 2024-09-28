import {
  HiUser,
  HiHome,
  HiUsers,
  HiCloud,
  HiOutlineCog,
  HiOutlineQuestionMarkCircle,
  HiSparkles,
  HiMap,
  HiOutlineEye,

} from "react-icons/hi";

export const DASHBOARD_SIDEBAR_LINKS = [
  {
    key: "Profile",
    label: "Profile",
    path: "/layout/Profile",
    icon: <HiUser />,
  },
  {
    key: "FarmData",
    label: "Farm Data",
    path: "/layout/FarmData",
    icon: <HiHome />,
  },
  {
    key: "IrrigationData",
    label: "Irrigation Data",
    path: "/layout/IrrigationData",
    icon: <HiMap />,
  },
  {
    key: "SoilData",
    label: "Soil Data",
    path: "/layout/SoilData",
    icon: <HiSparkles />,
  },
  {
    key: "WeatherData",
    label: "Weather Data",
    path: "/layout/WeatherData",
    icon: < HiCloud />,
  },
  {
    key: "customers",
    label: "View Data",
    path: "/layout/ViewData",
    icon: <HiUsers />,
    subLinks: [
      {
        key: "viewProfile",
        label: "Profile",
        path: "/layout/ViewProfile",
        icon: <HiOutlineEye />,
      },
      {
        key: "viewfarmdata",
        label: "Farm Data",
        path: "/layout/ViewFarm",
        icon: <HiOutlineEye />,
      },
      {
        key: "viewirrigationdata",
        label: "Irrigation Data",
        path: "/layout/ViewIrrigation",
        icon: <HiOutlineEye />,
      },
      {
        key: "viewsoildata",
        label: "Soil Data",
        path: "/layout/ViewSoil",
        icon: <HiOutlineEye />,
      },
      
    ],
  },
  
];

export const DASHBOARD_SIDEBAR_BOTTOM_LINKS = [
  {
    key: "settings",
    label: "Settings",
    path: "/settings",
    icon: <HiOutlineCog />,
  },
  {
    key: "support",
    label: "Help & Support",
    path: "/support",
    icon: <HiOutlineQuestionMarkCircle />,
  },
];
