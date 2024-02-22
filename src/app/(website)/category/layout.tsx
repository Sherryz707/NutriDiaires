import type { Metadata } from "next";
import Sidebar from "@/app/_components/Categories/Sidebar";

export const metadata: Metadata = {
  title: "All Categories",
  description: "Contains a list of posts of all categories",
};

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="container mx-auto ">
      <aside className="ml-5 my-5 border-l-2 pl-5 lg:hidden">
        <h1 className="mb-5 text-2xl font-bold text-text_clr">Categories :</h1>
        <Sidebar />
      </aside>
      <div className="relative grid  lg:grid-cols-[3fr_1fr] gap-5">
        {children}
        <aside className="hidden lg:block">
          <h1 className="mb-5 text-2xl font-bold text-text_clr">
            Categories :
          </h1>
          <Sidebar />
        </aside>
      </div>
    </div>
  );
}
