import {
  BsBank,
  BsFillArrowUpRightCircleFill,
  BsThreeDots,
  BsThreeDotsVertical,
} from "react-icons/bs";
export default function Transaction() {
  return (
    <div className="flex justify-between items-center space-x-4">
      <div className="flex items-center space-x-4">
        <div className="bg-black p-4 rounded-full">
          <BsBank className="text-sm text-white" />
        </div>
        <span className="font-semibold text-md">Grocery shop</span>
      </div>

      <span className="font-semibold text-sm opacity-40">Apr, 06 2022</span>
      <span className="font-semibold text-md">$5,000</span>
      <BsThreeDotsVertical className="opacity-40" />
    </div>
  );
}
