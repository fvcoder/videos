import './tailwind.css';
import { Composition, staticFile } from "remotion";
import {
  CaptionedVideo,
  calculateCaptionedVideoMetadata,
  captionedVideoSchema,
} from "./CaptionedVideo";
import { Day1, day1Schema } from './video/day1';

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="CaptionedVideo"
        component={CaptionedVideo}
        calculateMetadata={calculateCaptionedVideoMetadata}
        schema={captionedVideoSchema}
        width={1080}
        height={1920}
        defaultProps={{
          src: staticFile("sample-video.mp4"),
        }}
      />
      <Composition
        id="day1"
        component={Day1}
        schema={day1Schema}
        width={1080}
        height={1920}
        fps={30}
        durationInFrames={60 * 30}
        defaultProps={{
          isProd: false
        }}
      />
    </>
  );
};
