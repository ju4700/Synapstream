import { useEffect, useState } from "react";

export function usePathname() {
  const [pathname, setPathname] = useState(() => {
    if (typeof window !== "undefined") {
      const p = window.location.pathname;
      return p.length > 1 && p.endsWith("/") ? p.slice(0, -1) : p;
    }
    return "/";
  });

  useEffect(() => {
    const onLocationChange = () => {
      const p = window.location.pathname;
      setPathname(p.length > 1 && p.endsWith("/") ? p.slice(0, -1) : p);
    };

    window.addEventListener("popstate", onLocationChange);
    window.addEventListener("navigate", onLocationChange);
    return () => {
      window.removeEventListener("popstate", onLocationChange);
      window.removeEventListener("navigate", onLocationChange);
    };
  }, []);

  return pathname;
}

export function navigate(to: string) {
  if (typeof window === "undefined") return;

  const url = new URL(to, window.location.origin);
  const targetPath =
    url.pathname.length > 1 && url.pathname.endsWith("/") ? url.pathname.slice(0, -1) : url.pathname;
  const currentPath =
    window.location.pathname.length > 1 && window.location.pathname.endsWith("/")
      ? window.location.pathname.slice(0, -1)
      : window.location.pathname;

  if (targetPath === currentPath) {
    if (url.hash) {
      const el = document.querySelector(url.hash);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
    return;
  }

  window.history.pushState({}, "", to);
  window.dispatchEvent(new Event("navigate"));

  if (url.hash) {
    setTimeout(() => {
      const el = document.querySelector(url.hash);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }, 100);
  } else {
    window.scrollTo({ top: 0, behavior: "instant" });
  }
}
