import { ASSET_PATHS, DIVIDER_SYMBOL } from "../lib/constants";

export const HeroSection = () => {
  return (
    <section className="hero">
      <img src={ASSET_PATHS.LOGO} alt="Ashrafiyya Logo" className="hero-logo" />
      <div className="hero-tagline">
        Elevating Knowledge and Practice
        <span className="divider-diamond">{DIVIDER_SYMBOL}</span>
      </div>
      <div className="bismillah">بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيمِ</div>
    </section>
  );
};
