import { useEffect } from "react";

export const useLayoutFix = () => {
  useEffect(() => {
    let timeoutId: number | undefined;

    const applyLayoutFix = () => {
      document.body.offsetHeight;

      document
        .querySelectorAll<HTMLElement>(".program-card-v2, .program-card-v4, .previous-programs-card")
        .forEach((card) => {
          card.style.height = "auto";
          card.style.minHeight = "auto";
          card.offsetHeight;
        });

      document.querySelectorAll<HTMLElement>(".program-grid").forEach((grid) => {
        grid.style.alignItems = "stretch";
        grid.offsetHeight;
      });

      document.querySelectorAll<HTMLElement>(".programs-list").forEach((list) => {
        list.style.height = "auto";
        list.offsetHeight;
      });
    };

    const scheduleFix = () => {
      if (timeoutId) {
        window.clearTimeout(timeoutId);
      }
      timeoutId = window.setTimeout(applyLayoutFix, 100);
    };

    window.addEventListener("orientationchange", scheduleFix);
    window.addEventListener("resize", scheduleFix);
    window.addEventListener("focus", scheduleFix);
    window.addEventListener("load", scheduleFix);

    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", scheduleFix);
    } else {
      scheduleFix();
    }

    if ("fonts" in document) {
      document.fonts.ready.then(scheduleFix).catch(() => {
        scheduleFix();
      });
    }

    return () => {
      window.removeEventListener("orientationchange", scheduleFix);
      window.removeEventListener("resize", scheduleFix);
      window.removeEventListener("focus", scheduleFix);
      window.removeEventListener("load", scheduleFix);
      document.removeEventListener("DOMContentLoaded", scheduleFix);
      if (timeoutId) {
        window.clearTimeout(timeoutId);
      }
    };
  }, []);
};
