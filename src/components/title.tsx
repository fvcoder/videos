import { interpolate, useCurrentFrame } from "remotion"

export interface NoteEditorProps {
    readonly text: string
    readonly frameStart: number
    readonly subTitle: string
}
export function Title(props: NoteEditorProps) {
    const frame = useCurrentFrame()

    const opacity = interpolate(frame, [props.frameStart, props.frameStart + 5, props.frameStart + 50, props.frameStart + 55 ], [0, 1, 1, 0], { "extrapolateRight": "clamp" })
    const top = interpolate(frame, [props.frameStart, props.frameStart + 5 , props.frameStart + 50, props.frameStart + 55 ], [100, 500, 500, 100], { "extrapolateRight": "clamp" })

    return (
        <div className="absolute left-14 right-[210px] flex items-end justify-center" style={{ opacity, bottom: top }}>
            <div className="bg-white text-6xl font-bold border p-4 text-center rounded-3xl">
                <h1>{props.text}</h1>
                <p className="font-normal text-4xl text-neutral-500 mt-2">{props.subTitle}</p>
            </div>
        </div>
    )

}