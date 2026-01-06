const baseUrl = import.meta.env.BASE_URL;

export const HeroSection = () => {
  return (
    <section className="hero">
      <img src={`${baseUrl}images/logo.png`} alt="Ashrafiyya Logo" className="hero-logo" />
      <div className="hero-tagline">
        Elevating Knowledge and Practice
        <span className="divider-diamond">◆</span>
      </div>
      <div className="bismillah">بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيمِ</div>
    </section>
  );
};
