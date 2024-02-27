import TOC from "./Toc";

export default function SidebarMobile({ outline }: any) {
  
  return (
    <nav role="navigation" aria-label="Table of Contents" className="flex flex-col text-text_clr  min-w-full border-l-2 capitalize">
      
        <TOC outline={outline} />
      
    </nav>
  );
}
