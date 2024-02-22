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
          {/* Apply indentation based on the heading level */}
          <li className=" hover:text-primary">
            <Link
              href={"#" + heading.slug}
              style={{
                paddingInlineStart: `${heading.level}rem`,
                width: "fit-content",
              }}
            >
              {getChildrenText(heading)}
            </Link>
          </li>
          {heading.subheadings.length > 0 && (
            <TOC outline={heading.subheadings} />
          )}
        </React.Fragment>
      ))}
    </>
  );
}
