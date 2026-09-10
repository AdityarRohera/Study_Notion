import BecomeInstructor from "../BecomeInstructor";
import Video from "../Video";
import Stats from "../Stats";
import AboutCourses from "../AboutCourses";
import StartCoding from "../StartCoding";
import ExploreCatalog from "../ExploreCatalog";
import Features from "../Features";
import Testimonials from "../Testimonials";
import InstructorCta from "../InstructorCta";

/**
 * Home page composition. Sections are stacked with a single, consistent
 * vertical rhythm instead of each one inventing its own margins.
 */
function Section1() {
  return (
    <div className="w-full bg-ink-950 text-white">
      <BecomeInstructor />
      <Video />
      <Stats />

      <div className="flex flex-col gap-20 py-16 md:gap-24 md:py-20 lg:gap-28 lg:py-24">
        <AboutCourses />
        <StartCoding />
        <ExploreCatalog />
        <Features />
        <Testimonials />
        <InstructorCta />
      </div>
    </div>
  );
}

export default Section1;
