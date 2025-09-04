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
    <div className="w-full h-screen bg-black flex items-center justify-center">
      <video
        ref={videoRef}
        className="video-js vjs-big-play-centered w-full h-full"
      />
    </div>
  );
}

export default VideoPlayerPage;
