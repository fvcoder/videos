import { AbsoluteFill, Img, staticFile } from "remotion"
import { VideoSubtitled } from "../../components/videoSubtitled"
import { baseSchema } from "../../schema/base.schema"
import { NoteEditorSchema } from "../../components/noteEditor"
import { z } from "zod"

export const day2Schema = baseSchema.extend({
    notes: z.array(NoteEditorSchema)
})

export const Day2: React.FC<z.infer<typeof day2Schema>> = (props) => {
    return (
        <AbsoluteFill>
            <VideoSubtitled url="https://cdn.fvcoder.com/video/day2/video4.mp4" jsonStaticDir="day2/video4.json" from={5006} />
            <VideoSubtitled url="https://cdn.fvcoder.com/video/day2/video3.mp4" jsonStaticDir="day2/video3.json" from={2550} />
            <VideoSubtitled url="https://cdn.fvcoder.com/video/day2/video2.mp4" jsonStaticDir="day2/video2.json" from={827} end={1727} />
            <VideoSubtitled url="https://cdn.fvcoder.com/video/day2/video1.mp4" jsonStaticDir="day2/video1.json" from={0} />
            <div className={`absolute inset-0 size-full ${props.isProd ? "hidden" : ""}`}>
                <Img src={staticFile("safeArea.png")} className="size-full opacity-50" />
            </div>
        </AbsoluteFill>
    )
} 