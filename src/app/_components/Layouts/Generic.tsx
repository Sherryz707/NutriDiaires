import type { StaticImport } from "next/dist/shared/lib/get-img-props";
import Image from "next/image";

export default function Generic({
  title,
  desc,
  image,
  children,
}: {
  title: string;
  desc: string;
  image: StaticImport;
  children: React.ReactNode;
}) {
  return (
    <section className="container flex flex-col md:flex-row items-center justify-center gap-5 mx-2 mx-auto my-auto">
      <figure className="">
        <Image src={image} alt="Not Found" height={500} width={500} priority={true} />
      </figure>
      <div className="md:max-w-1/2 md:self-start flex gap-3 flex-col items-center md:items-start justify-center my-auto">
        <h1
          id="not-found-heading"
          className="text-left text-2xl md:text-4xl font-semibold tracking-wide text-wrap text-primary"
        >
          {title}
        </h1>
        <p className=" text-center md:text-left text-md font-medium tracking-wide text-text_clr  text-wrap max-w-md">
          {desc}
        </p>
        {children}
      </div>
    </section>
  );
}
