import { paths } from "@/app/utils/pathhelper";
import { Suspense } from "react";
import ThemeSwitch from "@/app/context/ThemeSwitch";
import DynamicTag from "../DynamicTag";
export default function MobileMenu() {
  return (
    <nav className="bg-bg_clr  min-w-full mb-5 md:hidden">
      <div className="bg-bg_clr max-w-screen-xl flex flex-wrap items-center justify-center mx-auto p-4 gap-5">
        <Suspense>
          <DynamicTag
            title="All Categories"
            slug="category"
            pageQuery={paths.Category("")}
          />
          <DynamicTag title="About Us" slug="about-us" pageQuery={paths.AboutUs()} />
        </Suspense>
        <Suspense>
          <ThemeSwitch />
        </Suspense>
      </div>
      <hr className=" sm:mx-auto  " />
    </nav>
  );
}
