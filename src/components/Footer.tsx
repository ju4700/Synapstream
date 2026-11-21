import { navigate } from "../router";

export function Footer({ className = "" }: { className?: string }) {
  return (
    <footer className={`border-t border-hairline ${className || "bg-black"}`}>
      <div className="mx-auto max-w-[1440px] px-6 py-12 md:px-12 xl:px-20">
        <div className="flex flex-col items-center justify-between gap-6 text-center md:flex-row md:text-left">
          <span className="font-display text-sm uppercase tracking-[0.2em] text-white">
            Synapstream
          </span>

          <nav aria-label="Footer" className="flex flex-wrap items-center justify-center gap-6 text-xs text-silver">
            <a
              href="/"
              onClick={(e) => {
                e.preventDefault();
                navigate("/");
              }}
              className="transition-colors hover:text-white"
            >
              Home
            </a>
            <a
              href="/about"
              onClick={(e) => {
                e.preventDefault();
                navigate("/about");
              }}
              className="transition-colors hover:text-white"
            >
              About
            </a>
            <a
              href="/careers"
              onClick={(e) => {
                e.preventDefault();
                navigate("/careers");
              }}
              className="transition-colors hover:text-white"
            >
              Careers
            </a>
            <a
              href="/#capabilities"
              onClick={(e) => {
                e.preventDefault();
                navigate("/#capabilities");
              }}
              className="transition-colors hover:text-white"
            >
              Capabilities
            </a>
            <a
              href="/#delivery"
              onClick={(e) => {
                e.preventDefault();
                navigate("/#delivery");
              }}
              className="transition-colors hover:text-white"
            >
              Delivery Model
            </a>
            <a
              href="/#contact"
              onClick={(e) => {
                e.preventDefault();
                navigate("/#contact");
              }}
              className="transition-colors hover:text-white"
            >
              Contact
            </a>
          </nav>
        </div>

        <div className="mt-8 border-t border-hairline/60 pt-8 text-center">
          <p className="text-xs text-silver">
            © 2026 SYNAPSTREAM. All rights reserved. Chittagong, Bangladesh.
          </p>
        </div>
      </div>
    </footer>
  );
}
