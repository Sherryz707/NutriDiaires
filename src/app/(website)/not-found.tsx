import notFound from "@/public/notFound.svg";
import Link from "next/link";
import { paths } from "../utils/pathhelper";
import Generic from "../_components/Layouts/Generic";

export default function NotFound() {
  return (
    <Generic
      title="Error 404!"
      desc="Sorry, the page you're looking for could not be found. Please check
            the URL and try again."
      image={notFound}
    >
      <Link
        href={paths.home()}
        className="group/btn inline-flex items-center rounded-lg bg-primary px-3 py-2 text-center text-sm font-medium text-pink-50 hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-100"
      >
        Go Back Home
        <span className="group-hover/btn:translate-x-1 pl-2 transition-all duration-300">
          -&gt;
        </span>
      </Link>
    </Generic>
  );
}
