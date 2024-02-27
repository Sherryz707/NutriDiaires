// @ts-nocheck
import React from "react";
export const generateSlugPortableHeading = (text) => {
  let heading:string = text[0]?.props?.text || "";
  console.log(text,"check",heading,"final",heading
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-*/, "")
    .replace(/-*$/, ""))
  return heading
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-*/, "")
    .replace(/-*$/, "");
}
export const generateSlug = (text) => {
 
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-*/, "")
    .replace(/-*$/, "");
};

const filter = (ast, match) =>
  ast.reduce((acc, node) => {
    if (match(node)) acc.push(node);
    if (node.children) acc.push(...filter(node.children, match));
    return acc;
  }, []);

const findHeadings = (ast) =>
  filter(ast, (node) => /h\d/.test(node.style)).map((node) => {
    const text = getChildrenText(node);
    const slug = generateSlug(text);
    const level = Number(node.style.slice(1)); // Extract the heading level
    return { ...node, text, slug, level }; // Include level in the returned object
  });

const get = (object, path) => path.reduce((prev, curr) => prev[curr], object);

const getObjectPath = (path) =>
  path.length === 0
    ? path
    : ["subheadings"].concat(path.join(".subheadings.").split("."));

export const parseOutline = (ast) => {
  const outline = { subheadings: [] };
  const headings = findHeadings(ast);
  const path = [];
  let lastLevel = 0;

  headings.forEach((heading) => {
    const level = heading.level || 0; // Use the level property or default to 0
    heading.subheadings = [];

    if (level < lastLevel) for (let i = lastLevel; i >= level; i--) path.pop();
    else if (level === lastLevel) path.pop();

    const prop = get(outline, getObjectPath(path));
    prop.subheadings.push(heading);
    path.push((prop.subheadings.length - 1).toString());
    lastLevel = level;
  });

  return outline.subheadings;
};

export const getChildrenText = (props) =>
  props?.children
    .map((node) => (typeof node === "string" ? node : node.text || ""))
    .join("");

export const TableOfContents = ({ outline }) => (
  <>
    {outline.map((heading) => (
      <React.Fragment key={heading._key}>
        {/* Apply indentation based on the heading level */}
        <a
          href={"#" + heading.slug}
          className={`px-[${heading?.level ?? 1 * 4}px]`}
        >
          {getChildrenText(heading)}
        </a>
        {heading?.subheadings.length > 0 && (
          <TableOfContents outline={heading.subheadings} />
        )}
      </React.Fragment>
    ))}
  </>
);
