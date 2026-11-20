import { useEffect, useState, type MouseEvent } from "react";
import { AnimatePresence, m } from "motion/react";
import { EASE_OUT } from "../motion";
import { ButtonLink, LogoMark } from "./brand";
import { navigate, usePathname } from "../router";

const LINKS = [
  { label: "About", href: "/about" },
  { label: "Capabilities", href: "/#capabilities" },
  { label: "Delivery Model", href: "/#delivery" },
  { label: "Governance", href: "/#governance" },
];

export function Nav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 0);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    if (pathname === "/") {
      const targets = [
        document.querySelector("#capabilities"),
        document.querySelector("#delivery"),
        document.querySelector("#governance"),
      ].filter(Boolean) as Element[];

      const io = new IntersectionObserver(
        (entries) => {
          const hit = entries.find((e) => e.isIntersecting);
          if (hit) setActive(`/#${hit.target.id}`);
        },
        { rootMargin: "-40% 0px -55% 0px" },
      );
      targets.forEach((t) => io.observe(t));
      return () => {
        window.removeEventListener("scroll", onScroll);
        io.disconnect();
      };
    } else {
      setActive(pathname);
      return () => window.removeEventListener("scroll", onScroll);
    }
  }, [pathname]);

  const handleLinkClick = (e: MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setOpen(false);
    navigate(href);
  };

  return (
    <m.header
      className={`fixed inset-x-0 z-50 px-4 transition-all duration-300 ease-out ${
        scrolled ? "top-0" : "top-4"
      }`}
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: EASE_OUT, delay: 0 }}
    >
      <nav
        aria-label="Primary"
        className={`mx-auto flex h-[72px] max-w-[1280px] items-center justify-between border pl-4 pr-3 backdrop-blur-xl transition-all duration-300 ease-out ${
          scrolled
            ? "rounded-t-none rounded-b-[36px] border-t-0 border-line bg-[#0a0a0a]/90 shadow-[0_8px_32px_rgba(0,0,0,0.5)]"
            : "rounded-full border-white/[0.07] bg-[#0a0a0a]/40"
        }`}
      >
        <a
          href="/"
          onClick={(e) => handleLinkClick(e, "/")}
          className="flex items-center gap-3.5 rounded-full"
          aria-label="SYNAPSTREAM, back to home"
        >
          <span className="grid size-11 place-items-center rounded-full bg-white">
            <LogoMark className="w-6" />
          </span>
        </a>

        <ul className="hidden items-center gap-1 lg:flex">
          {LINKS.map((l) => {
            const isLinkActive =
              l.href === "/about" ? pathname === "/about" : active === l.href;
            return (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={(e) => handleLinkClick(e, l.href)}
                  aria-current={isLinkActive ? "true" : undefined}
                  className={`relative rounded-full px-4 py-2.5 text-sm font-medium transition-colors duration-300 ${
                    isLinkActive ? "text-white" : "text-silver hover:text-white"
                  }`}
                >
                  {isLinkActive && (
                    <m.span
                      layoutId="nav-active"
                      className="absolute inset-0 rounded-full bg-white/[0.07]"
                      transition={{ duration: 0.5, ease: EASE_OUT }}
                      aria-hidden
                    />
                  )}
                  <span className="relative">{l.label}</span>
                </a>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-2">
          <ButtonLink
            href="/#contact"
            onClick={(e) => handleLinkClick(e, "/#contact")}
            className="!hidden lg:!inline-flex !rounded-full !px-6"
          >
            Contact
          </ButtonLink>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label="Toggle navigation"
            className="grid size-12 place-items-center rounded-full border border-line text-white lg:hidden"
          >
            <svg viewBox="0 0 16 16" className="size-4" fill="none" aria-hidden>
              {open ? (
                <path d="M3 3l10 10M13 3L3 13" stroke="currentColor" strokeWidth="1.5" />
              ) : (
                <path d="M2 5h12M2 11h12" stroke="currentColor" strokeWidth="1.5" />
              )}
            </svg>
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <m.div
            id="mobile-nav"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35, ease: EASE_OUT }}
            className="tile mx-auto mt-2 max-w-[1280px] border border-line bg-[#0a0a0a]/95 p-3 backdrop-blur-xl lg:hidden"
          >
            {LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={(e) => handleLinkClick(e, l.href)}
                className="block px-4 py-3 text-[15px] text-silver hover:text-white"
              >
                {l.label}
              </a>
            ))}
            <div className="mt-2 border-t border-line/60 pt-3 px-2 pb-1">
              <ButtonLink
                href="/#contact"
                onClick={(e) => handleLinkClick(e, "/#contact")}
                className="w-full !rounded-full !py-3 text-center justify-center font-semibold"
              >
                Contact
              </ButtonLink>
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </m.header>
  );
}
