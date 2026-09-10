import { FaUserCircle } from "react-icons/fa";

function AboutInstructor({ InstructorData }: any) {
  const { firstName, lastName, additional_info, profileImage } =
    InstructorData ?? {};

  const fullName = `${firstName ?? ""} ${lastName ?? ""}`.trim() || "Instructor";
  const initials =
    `${firstName?.[0] ?? ""}${lastName?.[0] ?? ""}`.toUpperCase() || "SN";

  return (
    <section className="sn-card p-6 sm:p-8">
      <h2 className="font-display text-xl font-bold text-white sm:text-2xl">
        About the instructor
      </h2>

      <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center">
        {profileImage ? (
          <img
            src={profileImage}
            alt=""
            loading="lazy"
            className="h-16 w-16 shrink-0 rounded-full border border-ink-700 object-cover"
          />
        ) : initials !== "SN" ? (
          <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-brand-400 to-brand-600 font-display text-lg font-bold text-ink-950">
            {initials}
          </span>
        ) : (
          <FaUserCircle className="h-16 w-16 shrink-0 text-ink-600" />
        )}

        <div>
          <p className="font-display text-lg font-bold text-white">
            {fullName}
          </p>
          <p className="text-sm text-ink-400">Instructor at StudyNotion</p>
        </div>
      </div>

      <p className="mt-6 text-sm leading-relaxed text-ink-300">
        {additional_info?.about ||
          "This instructor hasn't added a bio yet — but their course content speaks for itself."}
      </p>
    </section>
  );
}

export default AboutInstructor;
