import { useEffect } from "react";

export const useTouchDevice = () => {
  useEffect(() => {
    if (!("ontouchstart" in window)) return;

    document.body.classList.add("touch-device");

    const applyTransform = (event: TouchEvent, value: string) => {
      const target = event.target as HTMLElement | null;
      const interactive = target?.closest<HTMLElement>(
        ".social-button, .insta-link, .branch-intro-item"
      );
      if (interactive) {
        interactive.style.transform = value;
      }
    };

    const handleTouchStart = (event: TouchEvent) => {
      applyTransform(event, "scale(0.98)");
    };

    const handleTouchEnd = (event: TouchEvent) => {
      applyTransform(event, "");
    };

    document.addEventListener("touchstart", handleTouchStart, { passive: true });
    document.addEventListener("touchend", handleTouchEnd);

    return () => {
      document.body.classList.remove("touch-device");
      document.removeEventListener("touchstart", handleTouchStart);
      document.removeEventListener("touchend", handleTouchEnd);
    };
  }, []);
};
