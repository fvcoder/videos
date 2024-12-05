import {Audio, staticFile} from 'remotion'
import { Img } from 'remotion'
import { AbsoluteFill } from "remotion"

export const OutYouTube: React.FC = () => {
    return (
        <AbsoluteFill style={{ background: "black" }}>
            <div className="absolute inset-0 p-10 flex items-center justify-center">
                <div className="text-center">
                    <div>
                        <Img src="https://github.com/fvcoder.png" className="w-20 h-20 rounded-full mx-auto mb-4" />
                        <h1 className="text-3xl" style={{ color: "white" }}>fvcoder</h1>
                    </div>
                    <p className="text-neutral-400 text-2xl">Gracias por ver el video</p>
                    <p className="text-neutral-400 text-2xl">&lt;- Suscríbete Aquí</p>
                </div>
            </div>
            <div  className="absolute inset-0 p-10 flex items-end justify-center">
                <div className="text-neutral-400 text-xl text-center">
                    <p>Desarrollador Frontend</p>
                    <p>https://fvcoder.com</p>
                </div>
            </div>
            <div  className="absolute inset-0 p-10 flex items-end justify-center">
                <div className="text-neutral-400 text-xl text-center">
                    <p>Desarrollador Frontend</p>
                    <p>https://fvcoder.com</p>
                </div>
            </div>
            <Audio src={staticFile("out.mp3")} />
        </AbsoluteFill>
    )
}