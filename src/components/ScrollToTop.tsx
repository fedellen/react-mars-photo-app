import UpArrow from "./svg/UpArrow";

export default function ScrollToTop() {
  return (
    <button
      className="p-4 bg-dark fixed right-5 bottom-5 md:right-8 md:bottom-8 rounded-full shadow-md"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
    >
      <UpArrow />
      <span className="text-xs">Top</span>
    </button>
  );
}
