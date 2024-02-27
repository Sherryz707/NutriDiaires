import { getChildrenText } from "@/app/utils/TOC";
import Link from "next/link";
import React from "react";
export default function TOC({ outline }: any) {
if (!outline || outline.length <= 0) {
    return;
  }
  return (
    <>
      {outline?.map((heading:any) => (
        <React.Fragment key={heading._key}>
            <Link
              href={"#" + heading.slug}
              className=" hover:text-primary"
            >
              <div className={`ml-${heading.level}`} style={{
                paddingInlineStart: `${heading.level>1?heading.level:0.5}rem`,
                width: "fit-content",
                marginTop: "0.5rem",
                marginBottom:"0.5rem"
              }}>
               {heading.level>1?"∘ ":"● "}{getChildrenText(heading)}</div>
            </Link>
          {heading.subheadings.length > 0 && (
            <TOC outline={heading.subheadings} />
          )}
        </React.Fragment>
      ))}
    </>
  );
}
