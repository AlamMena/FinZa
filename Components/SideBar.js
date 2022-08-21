import {
  BsFillFileBarGraphFill,
  BsFillHeartFill,
  BsFillInboxFill,
  BsFillWalletFill,
  BsFillGridFill,
} from "react-icons/bs";

const SideBarItem = ({ Icon, text, active }) => {
  return (
    <div
      className="flex justify-left items-center space-x-4 py-3 px-4 bg-purple-300 rounded-xl
    hover:bg-purple-300 cursor-pointer transition-all ease-in-out duration-200"
    >
      <Icon />
      <p>{text}</p>
    </div>
  );
};
export default function SideBar() {
  return (
    <div className="hidden lg:flex fixed md:flex flex-col h-screen w-72 px-8 py-2">
      {/* header */}
      <h1 className="font-bold text-3xl px-4 py-8">FinzA</h1>

      {/* menu */}
      <div className="flex flex-col max-w-sm space-y-4 mt-4">
        <SideBarItem Icon={BsFillGridFill} text="Dashboard" active />
        <SideBarItem Icon={BsFillFileBarGraphFill} text="Statics" />
        <SideBarItem Icon={BsFillWalletFill} text="My Wallet" />
        {/* <SideBarItem Icon={MdSpaceDashboard} text="Transfer" /> */}
        <SideBarItem Icon={BsFillInboxFill} text="Message" />
        <SideBarItem Icon={BsFillHeartFill} text="Favorite" />
        {/* <SideBarItem Icon={MdSpaceDashboard} text="Profile" /> */}
      </div>
    </div>
  );
}
