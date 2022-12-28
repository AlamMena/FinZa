import { CurrencyBitcoin } from "@mui/icons-material";

export default function CategoryCard({ name, description, icon }) {
  const colors = ["bg-blue-50", "bg-green-50", "bg-red-50", "bg-purple-50"];
  const random = Math.floor(Math.random() * colors.length);
  return (
    <div
      className={`flex flex-col justify-between ${colors[random]} w-full my-2 md:w-44 h-36 p-4 rounded-lg`}
    >
      <div className="flex justify-between">
        <span className="font-bold text-xs">Amazon</span>
        <CurrencyBitcoin className="text-2xl" />
      </div>
      <div className="flex flex-col">
        <span className="font-bold">$920,100.12</span>
        <span className=" text-black text-opacity-30 text-xs">$120.21</span>
      </div>
    </div>
  );
}

// <div class="overflow-x-auto relative shadow-md sm:rounded-lg ">
//     {/* <div class="flex justify-between items-center bg-white p-6 ">
//         <label for="table-search" class="sr-only">Search</label>
//         <div class="relative">
//             <div class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
//                 <svg class="w-5 h-5 text-gray-500 " aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"></path></svg>
//             </div>
//             <input type="text" id="table-search-users" class="block p-2 pl-10 w-80 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"  placeholder="Search for users"/>
//         </div>
//     </div> */}
//     <table class="w-full text-sm text-left text-gray-500 dark:text-white dark:bg-black">
//         <thead class="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-purple-300 bg-dark-100">
//             <tr>
//                 <th scope="col" class="py-4 px-6">
//                    Category Name
//                 </th>
//                 <th scope="col" class="py-3 px-6">
//                     Description
//                 </th>
//                 <th scope="col" class="py-3 px-6">
//                     Type
//                 </th>
//                 <th scope="col" class="py-3 px-6">
//                     Amount
//                 </th>
//             </tr>
//         </thead>
//         <tbody>
//             <tr class="bg-white dark:bg-black hover:bg-gray-50 ">

//                 <th scope="row" class="flex items-center py-4 px-6 font-medium text-gray-900 whitespace-nowrap">
//                     <img class="w-10 h-10 rounded-full" src="https://cdn.dribbble.com/users/1145170/screenshots/14925093/brand.png?compress=1&resize=400x300&vertical=top" alt="Jese image"/>
//                     <div class="pl-3">
//                         <div class="text-base font-semibold dark:text-white">Food</div>
//                     </div>
//                 </th>
//                 <td class="py-4 px-6">
//                     Food expenses
//                 </td>
//                 <td class="py-4 px-6">
//                     <div class="flex items-center">
//                         <div class="h-2.5 w-2.5 rounded-full bg-red-500 mr-2"></div> Expense
//                     </div>
//                 </td>
//                 <td class="py-4 px-6">
//                    900,00
//                 </td>
//             </tr>
//         </tbody>
//     </table>
// </div>
