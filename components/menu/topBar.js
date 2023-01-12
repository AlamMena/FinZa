import {
  DarkMode,
  InboxOutlined,
  LightMode,
  NotificationsOutlined,
  SearchOutlined,
} from "@mui/icons-material";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
// import {
//   BsBell,
//   BsFillMoonFill,
//   BsFillSunFill,
//   BsSearch,
// } from "react-icons/bs";
// import { FaHandPeace } from "react-icons/fa";
// import { FcBusinessman } from "react-icons/fc";

export default function TopBar() {
  const [mode, setMode] = useState("light");

  function toggleDarkMode() {
    if (document.documentElement.classList.contains("light")) {
      document.documentElement.classList.remove("light");
      document.documentElement.classList.add("dark");
      setMode("dark");
      localStorage.setItem("theme", "dark");
    } else if (document.documentElement.classList.contains("dark")) {
      document.documentElement.classList.remove("dark");
      document.documentElement.classList.add("light");
      setMode("light");
      localStorage.setItem("theme", "light");
    } else {
      if (window?.matchMedia("(prefers-color-scheme: dark)").matches) {
        document.documentElement.classList.add("light");
        setMode("light");
        localStorage.setItem("theme", "light");
      } else {
        document.documentElement.classList.add("dark");
        setMode("dark");
        localStorage.setItem("theme", "dark");
      }
    }
  }
  const router = useRouter();
  return (
    <div className="flex justify-between w-full mt-4 mb-8">
      <div className="flex space-x-2 items-center">
        <h1 className="font-bold text-xl capitalize">
          {router.pathname.slice(1)}
        </h1>
      </div>
      <div className="  flex items-center  space-x-4 bg-slate-50">
        <SearchOutlined className=" text-neutral-500" />
        <InboxOutlined className="  text-neutral-500" />
        <NotificationsOutlined className="  text-neutral-500" />
        <div>
          <Image
            height={30}
            width={30}
            src={"https://cdn-icons-png.flaticon.com/512/1154/1154448.png"}
          />
        </div>
      </div>
    </div>
  );
}
