import { useParams } from "react-router-dom";
import { useEffect, useRef } from "react";
import videojs from "video.js";
import "video.js/dist/video-js.css";

function VideoPlayerPage() {
  const { videoUrl } = useParams<{ videoUrl: string }>();
  const decodedUrl = decodeURIComponent(videoUrl || "");
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (videoRef.current && decodedUrl) {
      const player = videojs(videoRef.current, {
        controls: true,
        autoplay: true,
        preload: "auto",
        fluid: true,
      });

      player.src({ src: decodedUrl, type: "video/mp4" });

      return () => {
        player.dispose();
      };
    }
  }, [decodedUrl]);

  return (
    <div className="flex min-h-dvh w-full flex-col bg-ink-950">
      <div className="flex items-center justify-between border-b border-ink-800 px-4 py-3 sm:px-6">
        <button
          type="button"
          onClick={() => window.close()}
          className="text-sm font-medium text-ink-400 transition-colors hover:text-white"
        >
          ← Close player
        </button>
        <span className="text-xs font-semibold uppercase tracking-wider text-ink-500">
          StudyNotion
        </span>
      </div>

      <div className="flex flex-1 items-center justify-center p-4 sm:p-8">
        <div className="w-full max-w-6xl overflow-hidden rounded-2xl border border-ink-800 bg-black shadow-lifted">
          <video
            ref={videoRef}
            className="video-js vjs-big-play-centered w-full"
            playsInline
          />
        </div>
      </div>
    </div>
  );
}

export default VideoPlayerPage;
