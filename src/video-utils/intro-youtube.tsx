import {Audio, staticFile} from 'remotion'
import {Img, useCurrentFrame} from 'remotion'
import { AbsoluteFill, interpolateColors } from "remotion"

export const IntroYouTube: React.FC = () => {
    const frame = useCurrentFrame()
    const background = interpolateColors(frame, [0, 5], ["white", "black"])
    const color = interpolateColors(frame, [0, 5], ["black", "white"])

    return (
        <AbsoluteFill style={{ background }}>
            <div className="absolute inset-0 p-10 flex items-center justify-center">
                <div className="text-center">
                    <div>
                        <Img src="https://github.com/fvcoder.png" className="w-20 h-20 rounded-full mx-auto mb-4" />
                        <h1 className="text-3xl" style={{ color }}>Fernando Ticona</h1>
                    </div>
                    <p className="text-neutral-400 text-2xl">fvcoder</p>
                </div>
            </div>
            <div  className="absolute inset-0 p-10 flex items-end justify-center">
                <div className="text-neutral-400 text-xl text-center">
                    <p>Desarrollador Frontend</p>
                    <p>https://fvcoder.com</p>
                </div>
            </div>
            <Audio src={staticFile("intro.mp3")} />
        </AbsoluteFill>
    )
}