"use client";
import { useState } from "react";
import AccordionItem from "./AccordionItem";
export default function Accordion({
  title,
  key,
  num,
  children,
  size="md"
}: {
    size?: string;
  title: string;
  key: string;
  num: number;
  children: React.ReactNode;
}) {
  const [curOpen, setCurOpen] = useState(null);

  return (
    <section
      aria-label="Accordion"
      className={`w-full mx-auto flex flex-col ${size}:hidden`}
    >
      <AccordionItem
        curOpen={curOpen}
        onOpen={setCurOpen}
        title={title}
        num={num}
        key={key}
      >
        {children}
      </AccordionItem>
    </section>
  );
}
