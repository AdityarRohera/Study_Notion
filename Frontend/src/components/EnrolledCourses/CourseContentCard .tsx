import { ChevronRight } from "lucide-react";

function CourseContentCard({ title, subtitle, extra, image, onClick }: any) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="sn-card sn-card-hover group flex h-full w-full flex-col overflow-hidden text-left"
    >
      {image && (
        <div className="relative aspect-video overflow-hidden bg-ink-850">
          <img
            src={image}
            alt=""
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
          />
          <div
            className="absolute inset-0 bg-gradient-to-t from-ink-950/75 to-transparent"
            aria-hidden="true"
          />
        </div>
      )}

      <div className="flex flex-1 flex-col p-5">
        <h3 className="sn-clamp-2 font-display text-base font-bold leading-snug text-white transition-colors duration-200 group-hover:text-brand-200">
          {title}
        </h3>

        {subtitle && (
          <p className="sn-clamp-2 mt-2 text-sm leading-relaxed text-ink-400">
            {subtitle}
          </p>
        )}

        <div className="mt-auto flex items-center justify-between gap-3 pt-5">
          {extra ? (
            <span className="text-xs font-medium text-ink-500">{extra}</span>
          ) : (
            <span />
          )}
          <ChevronRight className="h-4 w-4 shrink-0 text-ink-500 transition-all duration-300 group-hover:translate-x-0.5 group-hover:text-brand-300" />
        </div>
      </div>
    </button>
  );
}

export default CourseContentCard;
