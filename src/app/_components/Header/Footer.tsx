import { paths } from "@/app/utils/pathhelper";
import Link from "next/link";
import logo from "@/public/logo.svg";
import Image from "next/image";
import { urlForImage } from "@/sanity/lib/image";
export default function Footer({ title, logoSvg, copyright }: { title: string, logoSvg: string, copyright: string }) {
  const imgprops = urlForImage(logoSvg);
  return (
    <footer className="bg-bg_clr rounded-lg shadow  mt-4 text-text_clr min-w-full p-4 flex flex-col items-center justify-center gap-3">
      <Link href={paths.home()} className="flex items-center justify-center">
        <Image src={imgprops?.src ?? logo} width={40} height={40} alt="purple flower" />
        <span className="self-center text-2xl font-semibold whitespace-nowrap text-text_clr">
          {title ?? ""}
        </span>
      </Link>

      <span className="block text-sm text-gray_text text-center ">
        © 2024 {copyright}
      </span>
    </footer>
  );
}
