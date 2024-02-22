import Generic from "@/app/_components/Layouts/Generic";
import { paths } from "@/app/utils/pathhelper";
import aboutus from "@/public/aboutus.svg"
import { getSettings } from "@/sanity/lib/client";
import Link from "next/link";
export default async function AboutUs() {
  const settings = await getSettings();
  return <div className="container mx-auto my-auto p-3">
  <Generic title={`About ${settings.title}`} desc={settings.description} image={aboutus}>
      <div className="flex flex-col lg:flex-row items-center justify-center lg:justify-start gap-5 mt-5">
        
        {settings?.email ?<div className="text-pink-50 font-medium text-sm md:text-base tracking-wide bg-primary  rounded-full py-2 px-5">{settings?.email}</div>:null}
      {settings?.email ?<div className="text-pink-50 font-medium text-sm md:text-base tracking-wide bg-primary  rounded-full py-2 px-5">{settings?.phone}</div>:null}
      
</div>
    </Generic>
  </div>
}