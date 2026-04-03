export function SplashScreen() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-[100] flex items-center justify-center bg-white splash-fade-out"
      aria-hidden="true"
    >
      <span className="text-3xl font-semibold tracking-tight text-black md:text-4xl">
        homiqhome
      </span>
    </div>
  );
}
