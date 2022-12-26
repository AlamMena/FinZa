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

import Image from "next/image";

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

const SideBarItem = ({ icon, text, active }) => {
  return (
    <div
      className={` hover:font-bold rounded-xl cursor-pointer transition-all ease-in-out duration-200`}
    >
      <div
        className={`flex p-4 bg-gray-100 rounded-xl my-2 justify-center ${
          active && "bg-purple-600"
        }`}
      >
        <Image
          src={
            icon ?? `https://cdn-icons-png.flaticon.com/128/8900/8900953.png`
          }
          alt="Picture of the author"
          width={30}
          height={30}
        />
      </div>
      <p className="text-sm text-black text-opacity-40 text-center ">{text}</p>
    </div>
  );
};

export default function SideBar() {
  return (
    <div className="hidden relative md:fixed md:flex bg-slate-50 flex-col h-screen w-72 px-4 py-2  ">
      {/* header */}
      <h1 className="font-bold text-3xl px-4 py-8  ">FinzA</h1>

      {/* menu */}
      <div className="flex flex-col max-w-sm space-y-2 mt-4 ">
        <div className="flex justify-between px-8">
          <SideBarItem text="Dashboard" />
          <SideBarItem
            text="Accounts"
            icon={"https://cdn-icons-png.flaticon.com/512/901/901388.png"}
          />
        </div>
        <div className="flex justify-between px-8">
          <SideBarItem
            text="Calendar"
            icon={"https://cdn-icons-png.flaticon.com/128/609/609409.png"}
          />
          <SideBarItem
            text="Reports"
            active
            icon={"https://cdn-icons-png.flaticon.com/128/438/438036.png"}
          />
        </div>
        <div className="flex space-x-2 absolute bottom-6">
          <Image
            height={32}
            width={36}
            src={"https://cdn-icons-png.flaticon.com/128/2202/2202112.png"}
          />
          <div className="flex flex-col">
            <span className="text-sm">Alam mena</span>
            <span className="text-black text-opacity-40 text-sm ">
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
