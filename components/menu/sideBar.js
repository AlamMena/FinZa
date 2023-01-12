import {
  AccountBalance,
  AccountBalanceOutlined,
  AppsOutlined,
  AtmOutlined,
  Dashboard,
  DashboardOutlined,
  GridOffOutlined,
  GridOnOutlined,
  GridViewOutlined,
  HomeOutlined,
  PaidOutlined,
  SummarizeOutlined,
  TaskOutlined,
} from "@mui/icons-material";
import { Button } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/router";

// const SideBarItem = ({ Icon, text, active }) => {
//   return (
//     <div
//       className={`flex justify-left items-center space-x-4 py-3 px-4 text-white ${
//         active && "rounded-xl text-green-200"
//       }
//     hover:font-bold rounded-xl cursor-pointer transition-all ease-in-out duration-200`}
//     >
//       <Icon className="text-2xl " />
//       <p className="text-sm">{text}</p>
//     </div>
//   );
// };

export default function SideBar() {
  const route = useRouter();
  const SideBarItem = ({ icon, text, active, href }) => {
    return (
      <div
        onClick={() => route.push(href)}
        className="w-full pl-4 flex justify-between items-center space-x-2 hover:font-bold rounded-xl cursor-pointer transition-all ease-in-out duration-200"
      >
        <div className="flex items-center space-x-3">
          <div
            className={`flex ${
              active && "text-purple-500"
            } rounded-xl my-2 justify-center `}
          >
            {icon}
          </div>
          <p
            className={` ${
              active ? "text-purple-500" : "text-black text-opacity-30"
            } text-sm text-center font-bold`}
          >
            {text}
          </p>
        </div>

        {active && (
          <div className=" justify-self-end h-full bg-purple-600 w-[0.2rem] rounded-xl"></div>
        )}
      </div>
    );
  };
  return (
    <div className="hidden relative md:fixed md:flex bg-white flex-col h-full w-64   mx-2 ">
      {/* header */}
      {/* <h1 className=" font-bold text-2xl px-4 py-8">FinzA</h1> */}
      <div className="flex items-center space-x-2 mx-2  mt-10 mb-8">
        <Image
          height={30}
          width={30}
          src="https://cdn-icons-png.flaticon.com/512/9369/9369413.png"
        />
        <span className="text-xl font-bold tracking-widest">Finza srl</span>
      </div>

      {/* menu */}
      <div className="flex flex-col items-start space-y-4 ">
        <SideBarItem text="Dashboard" href="/" icon={<AppsOutlined />} active />
        <SideBarItem
          text="Accounts"
          href="accounts"
          icon={
            <AccountBalanceOutlined className="text-black text-opacity-30 text-xl" />
          }
        />
        <SideBarItem
          text="Transactions"
          href="transactions"
          icon={<PaidOutlined className="text-black text-opacity-30 text-xl" />}
        />
        <SideBarItem
          text="Goals"
          href="goals"
          icon={<TaskOutlined className="text-black text-opacity-30 text-xl" />}
        />
        <div className="flex w-full flex-col items-center space-x-2  absolute bottom-10">
          <Image height={140} width={140} src="/contactus.svg" />
          <div className="flex flex-col bg-purple-50 rounded-lg px-8 py-4 ">
            <span className="font-bold text-sm text-center">Support 24/7</span>
            <span className="text-xs text-black text-opacity-30">
              Contact us anytime
            </span>
            <Button
              variant="contained"
              type="submit"
              className="bg-purple-700 normal-case mt-4 w-28 rounded-xl hover:bg-black  text-xs"
            >
              Start chat
            </Button>
          </div>
        </div>
        {/* <div className="flex justify-between px-8">
          <SideBarItem text="Dashboard" />
          <SideBarItem text="Statics" />
        </div> */}
        {/* <div className="flex">
          <SideBarItem Icon={BsWallet} text="My Wallet" />
          <SideBarItem Icon={BsInbox} text="Message" />
        </div>
        <div className="flex">
          <SideBarItem Icon={BsWallet} text="My Wallet" />
          <SideBarItem Icon={BsInbox} text="Message" />
        </div> */}
        {/* <SideBarItem Icon={MdSpaceDashboard} text="Profile" /> */}
      </div>
    </div>
  );
}
