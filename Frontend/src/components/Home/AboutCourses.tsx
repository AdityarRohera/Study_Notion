import Info from "./Info";
import Code from "./Code";

/** Split section: story on the left, code on the right. */
function AboutCourses() {
  return (
    <section className="sn-container-wide w-full">
      <div className="grid items-center gap-10 rounded-3xl border border-ink-800 bg-ink-900/60 p-6 sm:p-10 lg:grid-cols-2 lg:gap-14 lg:p-14">
        <Info />
        <Code variant="html" />
      </div>
    </section>
  );
}

export default AboutCourses;
