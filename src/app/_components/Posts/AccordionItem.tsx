interface AccordionItemProps {
  num: number;
  title: string;
  curOpen: number | null;
  onOpen: (num: number | null | any) => void;
}

export default function AccordionItem({
  num,
  title,
  curOpen,
  onOpen,
  children,
}: React.PropsWithChildren<AccordionItemProps>) {
  const isOpen = num === curOpen;

  function handleToggle() {
    onOpen(isOpen ? null : num);
  }

  return (
    <details
      className={`${
        isOpen ? "border-t-4 border-primary" : "border-t-4 border-bg_lvl1_clr"
      } shadow-lg px-5 py-4 cursor-pointer transition-all duration-500 ease-in-out`}
      onClick={handleToggle}
    >
      <summary className="flex items-center gap-x-3 justify-center">
        <h1 className="text-xl font-semibold text-text_clr">{title}</h1>
        <p className="text-2xl font-semibold ml-auto">{isOpen ? "-" : "+"}</p>
      </summary>
      {isOpen && (
        <div className="flex flex-col gap-5 mt-[16px] ml-[16px]">
          {children}
        </div>
      )}
    </details>
  );
}
