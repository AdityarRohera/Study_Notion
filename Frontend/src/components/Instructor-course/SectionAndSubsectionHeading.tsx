import { FolderOpen } from "lucide-react";

function SectionAndSubsectionHeading({ heading }: { heading: string }) {
  return (
    <div className="flex min-w-0 items-center gap-2.5">
      <FolderOpen className="h-4 w-4 shrink-0 text-brand-400" />
      <span className="truncate font-semibold text-ink-100">{heading}</span>
    </div>
  );
}

export default SectionAndSubsectionHeading;
