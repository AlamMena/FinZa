import { BsFillArrowUpRightCircleFill } from "react-icons/bs";
export default function Transaction() {
  return (
    <div className="flex justify-between items-center space-x-4 w-full">
      <BsFillArrowUpRightCircleFill className="text-3xl" />
      <span className="font-semibold text-md">Grocery shop</span>
      <span className="font-semibold text-md text-neutral-400">
        Apr, 06 2022
      </span>
      <span className="font-semibold text-md">$5,000</span>
    </div>
  );
}
