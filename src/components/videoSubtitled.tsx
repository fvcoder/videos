import { Caption, createTikTokStyleCaptions } from "@remotion/captions";
import { useCallback, useEffect, useMemo, useState } from "react"
import { AbsoluteFill, cancelRender, continueRender, delayRender, OffthreadVideo, Sequence, staticFile, useVideoConfig, watchStaticFile } from "remotion"
import SubtitlePage from "../CaptionedVideo/SubtitlePage";
import { loadFont } from "../load-font";
import { getVideoMetadata, VideoMetadata } from "@remotion/media-utils";

const SWITCH_CAPTIONS_EVERY_MS = 1200;

interface VideoSubtitledProps {
    readonly url: string
    readonly jsonStaticDir: string
    readonly from?: number
    readonly end?: number
}

export function VideoSubtitled(props: VideoSubtitledProps) {
    const { fps } = useVideoConfig();
    const [subtitles, setSubtitles] = useState<Caption[]>([]);
    const [videoConfig, setVideoConfig] = useState<VideoMetadata | undefined>(undefined);
    const [handle] = useState(() => delayRender())

    const fetchSubtitles = useCallback(async () => {
        try {
            await loadFont();
            setVideoConfig(await getVideoMetadata(props.url));

            const res = await fetch(staticFile(props.jsonStaticDir))
            const data = (await res.json()) as Caption[]

            setSubtitles(data)
            continueRender(handle)
        } catch (e) {
            cancelRender(e)
        }
    }, [handle, props.jsonStaticDir, props.url])

    useEffect(() => {
        fetchSubtitles();

        const c = watchStaticFile(staticFile(props.jsonStaticDir), () => {
            fetchSubtitles();
        })

        return () => {
            c.cancel();
        }
    }, [fetchSubtitles, props.jsonStaticDir])
    
    const { pages } = useMemo(() => {
        return createTikTokStyleCaptions({
          combineTokensWithinMilliseconds: SWITCH_CAPTIONS_EVERY_MS,
          captions: subtitles ?? [],
        });
      }, [subtitles]);
    
    return (
        <Sequence
            from={props.from ?? 0}
            durationInFrames={props.end ? props.end : (videoConfig ? videoConfig.durationInSeconds * fps : undefined)}
        >
            <AbsoluteFill>
                <AbsoluteFill>
                    <OffthreadVideo
                        className="object-cover"
                        src={props.url}
                    />
                </AbsoluteFill>
                {pages.map((page, index) => {
                    const key = `${props.url}-${index}`
                    const nextPage = pages[index + 1] ?? null;
                    const subtitleStartFrame = (page.startMs / 1000) * fps;
                    const subtitleEndFrame = Math.min(
                        nextPage ? (nextPage.startMs / 1000) * fps : Infinity,
                        subtitleStartFrame + SWITCH_CAPTIONS_EVERY_MS,
                    );
                    const durationInFrames = subtitleEndFrame - subtitleStartFrame;
                    if (durationInFrames <= 0) {
                        return null;
                    }

                    return (
                        <Sequence
                            key={key}
                            from={subtitleStartFrame}
                            durationInFrames={durationInFrames}
                            showInTimeline={false}
                        >
                            <SubtitlePage key={index} page={page} />;
                        </Sequence>
                    );
                })}
            </AbsoluteFill>
        </Sequence>

    )
}