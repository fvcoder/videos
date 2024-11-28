import {Img, OffthreadVideo, staticFile} from 'remotion'
import React from "react";
import { AbsoluteFill } from "remotion";
import { NoteEditor, NoteEditorSchema } from './../../components/noteEditor';
import { baseSchema } from '../../schema/base.schema';
import { z } from 'zod';
import { Title } from '../../components/title';

export const day1Schema = baseSchema.extend({
    notes: z.array(NoteEditorSchema)
})

export const Day1: React.FC<z.infer<typeof day1Schema>> = (props) => {
  return (
    <AbsoluteFill className={`relative ${props.isProd ? "bg-black" : "bg-red-500"}`}>
        <div className={`absolute inset-0 size-full `}>
            <OffthreadVideo
                src={staticFile("day1/video.mp4")}
                className="size-full"
                startFrom={70}
                endAt={1450 + 70}
            />
            <Img src={staticFile("day1/p.jpg")} className="size-full object-cover" />
        </div>

        {props.notes.map((x) => (
            <NoteEditor
                key={x.text}
                {...x}
            />
        ))}
        
        <Title text="Dia 1" subTitle="Creando un SaaS" frameStart={0} />
        <div className={`absolute inset-0 size-full ${props.isProd ? "hidden" : ""}`}>
            <Img src={staticFile("safeArea.png")} className="size-full" />
        </div>
    </AbsoluteFill>
    )
}