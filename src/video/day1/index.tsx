import {Img, staticFile} from 'remotion'
import React from "react";
import { AbsoluteFill } from "remotion";
import { NoteEditor } from './../../components/noteEditor';
import { baseSchema } from '../../schema/base.schema';
import { z } from 'zod';
import { Title } from '../../components/title';

export const day1Schema = baseSchema.extend({})

export const Day1: React.FC<z.infer<typeof day1Schema>> = (props) => {
  return (
    <AbsoluteFill className={`relative ${props.isProd ? "bg-black" : "bg-red-500"}`}>
        <div className={`absolute inset-0 size-full `}>
            <Img src={staticFile("day1/p.jpg")} className="size-full object-cover" />
        </div>
        <NoteEditor text="este es un mensaje personalizado para que aparezca en la pantalla en el momento adecuado donde nesesite coregir algo que dije" frameStart={100} />
        <Title text="Dia 1" subTitle="Creando un SaaS" frameStart={0} />
        <div className={`absolute inset-0 size-full ${props.isProd ? "hidden" : ""}`}>
            <Img src={staticFile("safeArea.png")} className="size-full" />
        </div>
    </AbsoluteFill>
    )
}