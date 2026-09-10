import Code from "./Code";
import Info from "./Info";

/** Mirrored split section: code on the left, story on the right. */
function StartCoding() {
  return (
    <section className="sn-container-wide w-full">
      <div className="grid items-center gap-10 rounded-3xl border border-ink-800 bg-ink-900/60 p-6 sm:p-10 lg:grid-cols-2 lg:gap-14 lg:p-14">
        <div className="order-2 min-w-0 lg:order-1">
          <Code variant="js" />
        </div>

        <div className="order-1 min-w-0 lg:order-2">
          <Info
            eyebrow="Structured, not scattered"
            title="Start coding in seconds, not weekends."
            highlight="in seconds"
            body="No setup, no toolchain rabbit holes. Open a lesson and you are writing code in a real editor with instant feedback — right in the browser."
            bullets={[
              "Zero-config editor with live output",
              "Checkpoints that tell you exactly what broke",
              "Pick up on any device, right where you left off",
            ]}
            primaryCta={{ label: "Continue learning", to: "/signup" }}
            secondaryCta={{ label: "See the catalog", to: "/courses" }}
          />
        </div>
      </div>
    </section>
  );
}

export default StartCoding;
