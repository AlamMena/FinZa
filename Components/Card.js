import { BsWifi } from "react-icons/bs";
import { RiVisaLine } from "react-icons/ri";
export default function Card({ active }) {
  return (
    <div className="flex justify-between ">
      <div className="flex flex-col rounded-l-2xl bg-neutral-900 text-white py-8 px-4 w-full">
        <RiVisaLine className="text-5xl" />
        <span className=" tracking-widest my-2">1230 4670 4670</span>
        <span className="text-xs text-neutral-200 font-semibold">Jhon Doe</span>
      </div>
      <div className="bg-green-200 rounded-r-2xl px-4 flex flex-col justify-between py-4">
        <BsWifi className="text-3xl rotate-90" />
        <span className="rotate-90 font-semibold my-4">25/05</span>
      </div>
    </div>
  );
}
