import {
  BsFillFileBarGraphFill,
  BsFillHeartFill,
  BsFillInboxFill,
  BsFillWalletFill,
  BsFillGridFill,
  BsGrid,
  BsFileBarGraph,
  BsWallet,
  BsInbox,
  BsHeart,
  BsHouseFill,
  BsGridFill,
  BsHouse,
} from "react-icons/bs";

const SideBarItem = ({ Icon, text, active }) => {
  return (
    <div
      className={`flex justify-left items-center space-x-4 py-3 px-4 ${
        active && "font-bold rounded-xl"
      }
    hover:font-bold rounded-xl cursor-pointer transition-all ease-in-out duration-200`}
    >
      <Icon className="text-2xl " />
      <p className="text-sm">{text}</p>
    </div>
  );
};
export default function SideBar() {
  return (
    <div className="hidden md:fixed md:flex  flex-col h-screen w-60 px-4 py-2 rounded-r-3xl bg-neutral-50 ">
      {/* header */}
      <h1 className="font-bold text-3xl px-4 py-8 ">FinzA</h1>

      {/* menu */}
      <div className="flex flex-col max-w-sm space-y-2 mt-4 ">
        <SideBarItem Icon={BsHouseFill} text="Dashboard" active />
        <SideBarItem Icon={BsFileBarGraph} text="Statics" />
        <SideBarItem Icon={BsWallet} text="My Wallet" />
        {/* <SideBarItem Icon={MdSpaceDashboard} text="Transfer" /> */}
        <SideBarItem Icon={BsInbox} text="Message" />
        <SideBarItem Icon={BsHeart} text="Favorite" />
        {/* <SideBarItem Icon={MdSpaceDashboard} text="Profile" /> */}
      </div>
    </div>
  );
}
