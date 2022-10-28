import {
  BsBank,
  BsFillArrowUpRightCircleFill,
  BsStopwatch,
  BsThreeDots,
  BsThreeDotsVertical,
  BsWatch,
} from "react-icons/bs";
export default function Transaction() {
  return (
    <div className="">
      <div className="flex justify-between items-center space-x-4">
        <div className="flex items-center space-x-4">
          <div className="bg-black p-2 rounded-full">
            <BsStopwatch className="text-sm text-white text-opacity-80" />
          </div>
          <div className="flex flex-col space-y-1">
            <span className="font-semibold text-sm">Brooklyn simmons</span>
            <span className="font-semibold text-xs opacity-40">
              Apr, 06 2022 13:00:00 pm
            </span>
          </div>
        </div>
        <span className="font-semibold text-sm">$5,000</span>
      </div>
      <div className="w-full h-0.5 bg-gray-50 mt-4"></div>
    </div>
  );
}
