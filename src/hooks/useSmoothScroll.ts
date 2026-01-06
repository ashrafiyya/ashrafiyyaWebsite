import { useEffect } from "react";

const easeInOutQuad = (time: number, start: number, change: number, duration: number) => {
  let t = time / (duration / 2);
  if (t < 1) {
    return (change / 2) * t * t + start;
  }
  t -= 1;
  return (-change / 2) * (t * (t - 2) - 1) + start;
};

export const useSmoothScroll = () => {
  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      const anchor = target?.closest('a[href^="#"]') as HTMLAnchorElement | null;
      if (!anchor) return;

      const href = anchor.getAttribute("href");
      if (!href || href === "#") return;

      const destination = document.querySelector(href);
      if (!destination) return;

      event.preventDefault();

      if ("scrollBehavior" in document.documentElement.style) {
        destination.scrollIntoView({ behavior: "smooth" });
        return;
      }

      const targetPosition = (destination as HTMLElement).offsetTop;
      const startPosition = window.pageYOffset;
      const distance = targetPosition - startPosition;
      const duration = 1000;
      let start: number | null = null;

      const animation = (currentTime: number) => {
        if (start === null) start = currentTime;
        const timeElapsed = currentTime - start;
        const run = easeInOutQuad(timeElapsed, startPosition, distance, duration);
        window.scrollTo(0, run);
        if (timeElapsed < duration) requestAnimationFrame(animation);
      };

      requestAnimationFrame(animation);
    };

    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, []);
};
