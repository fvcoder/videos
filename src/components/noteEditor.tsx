import { interpolate, useCurrentFrame } from "remotion"

export interface NoteEditorProps {
    readonly text: string
    readonly frameStart: number
}
export function NoteEditor(props: NoteEditorProps) {
    const frame = useCurrentFrame()

    const opacity = interpolate(frame, [props.frameStart, props.frameStart + 5, props.frameStart + 50, props.frameStart + 55 ], [0, 1, 1, 0], { "extrapolateRight": "clamp" })
    const top = interpolate(frame, [props.frameStart, props.frameStart + 5 , props.frameStart + 50, props.frameStart + 55 ], [100, 390, 390, 100], { "extrapolateRight": "clamp" })

    return (
        <div className="absolute left-14 right-[210px] flex items-end justify-center" style={{ opacity, bottom: top }}>
            <div className="bg-white text-4xl border p-4 text-center rounded-3xl">
                {props.text}
            </div>
        </div>
    )

}