export default function GridLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section role="region" aria-label="List of all posts" className="md:grid gap-10 md:grid-cols-2 lg:gap-10 xl:grid-cols-3 px-2">
      {children}
    </section>
  );
}
