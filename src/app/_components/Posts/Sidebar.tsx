import SidebarMobile from "./SidebarMobile";

export default function Sidebar({ outline }: any) {
  
  return (
    <aside
      className=" self-start text-text_clr sticky top-0 h-screen lg:w-96 w-auto mt-5 py-5 overflow-y-auto hidden md:block border-t-4 border-primary"
      aria-labelledby="table-of-contents-heading"
    >
      <h3
        className="text-lg font-semibold mb-2 text-text_clr"
        id="table-of-contents-heading"
      >
        Table of Contents
      </h3>

     <SidebarMobile outline={outline} />
    </aside>
  );
}
