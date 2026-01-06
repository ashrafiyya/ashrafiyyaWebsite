import { PastProgramItem } from "../components/previous-programs/PastProgramItem";
import { VideoPlaylistColumn } from "../components/previous-programs/VideoPlaylistColumn";
import { branchPastEvents } from "../data/previousPrograms";
import { branchVideos } from "../data/videos";

export const PreviousProgramsSection = () => {
  return (
    <section id="previous-programs" className="programs">
      <h2>Previous Programs</h2>
      <div className="program-grid">
        <div className="previous-programs-card">
          <h3>
            Previous Events
            <br />
            <small>Past Programs by Branch</small>
          </h3>
          <div className="programs-list">
            {branchPastEvents.map((branchEvents, index) => (
              <PastProgramItem
                key={branchEvents.branchId}
                branchEvents={branchEvents}
                showDivider={index < branchPastEvents.length - 1}
              />
            ))}
          </div>
        </div>

        <div className="previous-programs-card recorded-resources-card">
          <h2>
            Recorded Resources
            <br />
            <small>Browse our collection of recorded programs and lectures from past events.</small>
          </h2>
          <div className="recorded-resources-grid">
            {branchVideos.map((branch) => (
              <VideoPlaylistColumn key={branch.branchId} branchVideos={branch} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
