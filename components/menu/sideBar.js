import {
  AccountBalance,
  AccountBalanceOutlined,
  Dashboard,
  DashboardOutlined,
  GridOffOutlined,
  GridOnOutlined,
  GridViewOutlined,
  PaidOutlined,
  SummarizeOutlined,
  TaskOutlined,
} from "@mui/icons-material";
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
        className={` flex items-center space-x-2 hover:font-bold rounded-xl cursor-pointer transition-all ease-in-out duration-200`}
      >
        <div className={`flex  rounded-xl my-2 justify-center `}>{icon}</div>
        <p className="text-sm text-white text-center ">{text}</p>
      </div>
    );
  };
  return (
    <div className="hidden relative md:fixed md:flex bg-black flex-col h-[720px] w-64 px-6 py-2 mx-2 my-4 rounded-3xl">
      {/* header */}
      <h1 className="text-white font-bold text-3xl px-4 py-8">FinzA</h1>

      {/* menu */}
      <div className="flex flex-col items-start space-y-4">
        <SideBarItem
          text="Dashboard"
          href="/"
          icon={<GridViewOutlined className="text-white text-xl" />}
          active
        />
        <SideBarItem
          text="Accounts"
          href="accounts"
          icon={<AccountBalanceOutlined className="text-white text-xl" />}
        />
        <SideBarItem
          text="Transactions"
          href="transactions"
          icon={<PaidOutlined className="text-white text-xl" />}
        />
        <SideBarItem
          text="Goals"
          href="goals"
          icon={<TaskOutlined className="text-white text-xl" />}
        />
        <div className="flex space-x-2 absolute bottom-10">
          <Image
            height={32}
            width={36}
            src={"https://cdn-icons-png.flaticon.com/128/2202/2202112.png"}
          />
          <div className="flex flex-col">
            <span className="text-sm text-white">Alam mena</span>
            <span className="text-white text-opacity-40 text-sm ">
              Amenabeato@gmail.com
            </span>
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
