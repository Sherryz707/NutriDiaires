import { Suspense } from "react";
import SearchPost from "@/app/_components/Header/SearchPost"
import ThemeSwitch from "@/app/context/ThemeSwitch";
import DynamicTag from "../DynamicTag";
import { paths } from "@/app/utils/pathhelper";
import Link from "next/link";
import Image from "next/image";
import logo from "@/public/logo.svg";
import MobileMenu from "./MobileMenu";
import { urlForImage } from "@/sanity/lib/image";
export default function Header({ title, logoSvg }: { title: string, logoSvg: string }) {
  const imgprops = urlForImage(logoSvg);
  return (
    <div className="min-w-full">
      <nav className="bg-bg_clr  min-w-full md:mb-5">
        <div className="bg-bg_clr max-w-screen-xl flex flex-wrap items-center justify-around mx-auto p-4 gap-2">
          <Link
            href={paths.home()}
            className="flex items-center justify-center"
          >
            <Image src={imgprops?.src ?? logo} width={40} height={40} alt="purple flower" />
            <span className="self-center text-2xl font-semibold whitespace-nowrap text-text_clr">
              {title || "Bloom."}
            </span>
          </Link>
          <Suspense>
            
          <SearchPost />
</Suspense>

          <div className="hidden w-full md:block md:w-auto" id="navbar-default">
            <div className="font-medium md:flex hidden gap-5 items-center">
              <Suspense>
                <DynamicTag
                  title="All Categories"
                  slug="category"
                  pageQuery={paths.Category("")}
                />
                <DynamicTag
                  title="About Us"
                  slug="about-us"
                  pageQuery={paths.AboutUs()}
                />
              </Suspense>
              <Suspense>
                <ThemeSwitch />
              </Suspense>
            </div>
          </div>
        </div>
        <hr className=" sm:mx-auto  " />
      </nav>
      <MobileMenu />
    </div>
  );
}
