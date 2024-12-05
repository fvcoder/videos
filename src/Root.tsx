import './tailwind.css';
import { Composition, staticFile } from "remotion";
import {
  CaptionedVideo,
  calculateCaptionedVideoMetadata,
  captionedVideoSchema,
} from "./CaptionedVideo";
import { Day1, day1Schema } from './video/day1';
import { Day2, day2Schema } from './video/day2';
import { IntroYouTube } from './video-utils/intro-youtube';
import { OutYouTube } from './video-utils/out-youtube';

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
        id="day2"
        component={Day2}
        schema={day2Schema}
        width={1080}
        height={1920}
        fps={30}
        durationInFrames={7629}
        defaultProps={{
          isProd: false,
          notes: []
        }}
      />
      <Composition
        id="day1"
        component={Day1}
        schema={day1Schema}
        width={1080}
        height={1920}
        fps={30}
        durationInFrames={1450}
        defaultProps={{
          "isProd": true,
          "notes": [
            {
              "text": "Decidí bautizarlo como Loproda",
              "frameStart": 200
            },
            {
              "text": "Para registrarse busquen \"Loproda\" en Google y entren en el primer enlace",
              "frameStart": 300
            },
            {
              "text": "Mañana les dare un tutorial (mas detallado)",
              "frameStart": 350
            }
          ]
        }}
      />
      <Composition
        id="intro-youTube"
        component={IntroYouTube}
        width={1920}
        height={1080}
        fps={30}
        durationInFrames={1.5 * 30}
      />
      <Composition
        id="out-youTube"
        component={OutYouTube}
        width={1920}
        height={1080}
        fps={30}
        durationInFrames={14.5 * 30}
      />
    </>
  );
};
