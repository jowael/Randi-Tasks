import {
  Delete,
  Icon,
  Divide,
  Plus,
  Minus,
  X,
  Equal,
  Dot,
} from "lucide-svelte";

type Btn = {
  value: string;
  title?: string;
  icon: typeof Icon | null; // or typeof import("lucide-svelte").Icon
  style?: string;
};

export const btns: Btn[] = [
  {
    title: "C",
    value: "C",
    icon: null,
    style:
      "p-4 bg-[#feb92d] hover:bg-yellow-500 dark:hover:bg-yellow-600 font-medium text-lg shadow-lg rounded-lg duration-300",
  },
  {
    title: "Delete",
    value: "DEL",
    icon: Delete,
    style:
      "p-4 text-center text-white bg-gray-500 dark:bg-gray-700 hover:bg-gray-700 dark:hover:bg-gray-800 font-medium shadow-lg rounded-lg duration-300",
  },
  {
    value: "/",
    icon: Divide,
    title: "Divide",
    style:
      "p-4 text-center bg-[#e0d4e9] dark:bg-[#40285a] hover:bg-purple-300 dark:hover:bg-purple-700 font-medium shadow-lg rounded-lg duration-300",
  },
  {
    value: "+",
    icon: Plus,
    title: "Plus",
    style:
      "p-4 text-center bg-[#e0d4e9] dark:bg-[#40285a] hover:bg-purple-300 dark:hover:bg-purple-700 font-medium shadow-lg rounded-lg duration-300",
  },
  {
    title: "7",
    value: "7",
    icon: null,
    style:
      "w-[60px] p-4 text-center bg-[#f2f4f9] dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-600 font-medium text-xl shadow-lg rounded-[29px] duration-300",
  },
  {
    title: "8",
    value: "8",
    icon: null,
    style:
      "w-[60px] p-4 text-center bg-[#f2f4f9] dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-600 font-medium text-xl shadow-lg rounded-[29px] duration-300",
  },
  {
    title: "9",
    value: "9",
    icon: null,
    style:
      "w-[60px] p-4 text-center bg-[#f2f4f9] dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-600 font-medium text-xl shadow-lg rounded-[29px] duration-300",
  },
  {
    value: "*",
    icon: X,
    title: "Multiply",
    style:
      "p-4 text-center bg-[#e0d4e9] dark:bg-[#40285a] hover:bg-purple-300 dark:hover:bg-purple-700 font-medium shadow-lg rounded-lg duration-300",
  },
  {
    title: "4",
    value: "4",
    icon: null,
    style:
      "w-[60px] p-4 text-center bg-[#f2f4f9] dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-600 font-medium text-xl shadow-lg rounded-[29px] duration-300",
  },
  {
    title: "5",
    value: "5",
    icon: null,
    style:
      "w-[60px] p-4 text-center bg-[#f2f4f9] dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-600 font-medium text-xl shadow-lg rounded-[29px] duration-300",
  },
  {
    title: "6",
    value: "6",
    icon: null,
    style:
      "w-[60px] p-4 text-center bg-[#f2f4f9] dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-600 font-medium text-xl shadow-lg rounded-[29px] duration-300",
  },
  {
    title: "-",
    icon: Minus,
    value: "-",
    style:
      "p-4 text-center bg-[#e0d4e9] dark:bg-[#40285a] hover:bg-purple-300 dark:hover:bg-purple-700 font-medium shadow-lg rounded-lg duration-300",
  },
  {
    title: "1",
    value: "1",
    icon: null,
    style:
      "w-[60px] p-4 text-center bg-[#f2f4f9] dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-600 font-medium text-xl shadow-lg rounded-[29px] duration-300",
  },
  {
    title: "2",
    value: "2",
    icon: null,
    style:
      "w-[60px] p-4 text-center bg-[#f2f4f9] dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-600 font-medium text-xl shadow-lg rounded-[29px] duration-300",
  },
  {
    title: "3",
    value: "3",
    icon: null,
    style:
      "w-[60px] p-4 text-center bg-[#f2f4f9] dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-600 font-medium text-xl shadow-lg rounded-[29px] duration-300",
  },
  {
    title: "=",
    value: "=",
    icon: Equal,
    style:
      "p-4 text-center text-white bg-[#9529e8] hover:bg-purple-700 shadow-lg rounded-lg row-span-2 duration-300",
  },
  {
    title: "0",
    value: "0",
    icon: null,
    style:
      "p-4 text-center bg-[#f2f4f9] dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-600 font-medium shadow-lg rounded-lg col-span-2",
  },
  {
    title: ".",
    value: ".",
    icon: Dot,
    style:
      "w-[60px] p-4 text-center bg-[#f2f4f9] dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-600 font-medium text-xl shadow-lg rounded-[29px] duration-300",
  },
];
