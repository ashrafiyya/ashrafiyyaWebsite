import { useLayoutFix } from "./hooks/useLayoutFix";
import { useSmoothScroll } from "./hooks/useSmoothScroll";
import { useTouchDevice } from "./hooks/useTouchDevice";
import { AboutSection } from "./sections/AboutSection";
import { BranchesSection } from "./sections/BranchesSection";
import { HeroSection } from "./sections/HeroSection";
import { PreviousProgramsSection } from "./sections/PreviousProgramsSection";
import { ProgramsSection } from "./sections/ProgramsSection";
import { SiteFooter } from "./sections/SiteFooter";
import { SocialMediaSection } from "./sections/SocialMediaSection";
import { SupportSection } from "./sections/SupportSection";

const App = () => {
  useSmoothScroll();
  useLayoutFix();
  useTouchDevice();

  return (
    <>
      <main>
        <HeroSection />
        <AboutSection />
        <BranchesSection />
        <ProgramsSection />
        <PreviousProgramsSection />
        <SupportSection />
        <SocialMediaSection />
      </main>
      <SiteFooter />
    </>
  );
};

export default App;
