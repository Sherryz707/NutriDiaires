
export default function Loading() {
  return (
    <div
      role="alert"
      aria-busy="true"
      aria-live="polite"
      className=" mxmin-screen w-full bg-bg_clr opacity-80 container-auto flex items-center justify-center"
    >
      <div className="shapes-7"></div>
    </div>
  );
}
