const baseUrl = import.meta.env.BASE_URL;

export const BranchesSection = () => {
  return (
    <section id="branches" className="programs">
      <h2>Branches</h2>
      <div className="program-grid">
        <div className="branch-intro-item">
          <img src={`${baseUrl}images/health.png`} alt="Ashrafiyya Health Icon" />
          <h3>Ashrafiyya Health</h3>
          <p>Integrating Islamic ethics and principles into modern healthcare education and practice.</p>
        </div>
        <div className="branch-intro-item">
          <img src={`${baseUrl}images/circles.png`} alt="Ashrafiyya Circles Icon" />
          <h3>Ashrafiyya Circles</h3>
          <p>Regular learning sessions and programs for spiritual development and practical guidance.</p>
        </div>
        <div className="branch-intro-item">
          <img src={`${baseUrl}images/itqan.png`} alt="Ashrafiyya Itqān Icon" />
          <h3>Ashrafiyya Itqān</h3>
          <p>
            Advanced Islamic studies focused on deep engagement with classical texts and scholarly
            traditions.
          </p>
        </div>
      </div>
    </section>
  );
};
