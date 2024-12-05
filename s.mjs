import { program } from 'commander';
import ora from 'ora';
import { resolve } from 'path';
import {
    downloadWhisperModel,
    installWhisperCpp,
    transcribe,
    toCaptions,
} from '@remotion/install-whisper-cpp';
import { mkdir } from 'fs/promises';
import { execSync } from 'child_process';
import { existsSync, writeFileSync } from 'fs';
import ffmpegPath from 'ffmpeg-static';

const aiPath = resolve(process.cwd(), "whisper.cpp");
const audioPath = resolve(process.cwd(), "temp", "audio.wav")
const outputPath = resolve(process.cwd(), "public")

const extractToTempAudioFile = (fileToTranscribe, tempOutFile) => {
    // Extracting audio from mp4 and save it as 16khz wav file
    const l = ora("Extracting audio from file").start();
    execSync(
      `${ffmpegPath} -i ${fileToTranscribe} -ar 16000 ${tempOutFile} -y`,
      { stdio: ["ignore", "inherit"] }
    );
    l.stop();
};

async function setup() {
    if (!existsSync(aiPath)) {
        await installWhisperCpp({
            "to": aiPath,
            "printOutput": true,
            "version": "1.6.0",
        })
    }

    if (!existsSync(resolve(aiPath, "ggml-medium.bin"))) {
        await downloadWhisperModel({
            "folder": aiPath,
            "model": "medium",
            "printOutput": true
        });
    }

    await mkdir(resolve(process.cwd(), "temp"), { recursive: true });
}

function isUrl(url) {
    try {
        // eslint-disable-next-line no-new
        new URL(url);
        return true;
    } catch {
        return false;
    }
}

program.option("--url <url>", "URL of the video to process")
program.option("--json-output <jsonOutput>", "Path to save the JSON output")

program.action(async (options) => {
    console.log(ffmpegPath)
    await setup();
    if (!options.url) {
        console.error("Please provide a URL");
        process.exit(1);
    }

    if (!isUrl(options.url)) {
        console.error("Please provide a valid URL");
        process.exit(1);
    }

    extractToTempAudioFile(options.url, audioPath);

    const whisperCppOutput = await transcribe({
        inputPath: audioPath,
        model: "medium",
        tokensPerItem: true,
        whisperPath: aiPath,
        printOutput: true,
        language: "es",
        translateToEnglish: false,
        splitOnWord: true,
        tokenLevelTimestamps: true,
    });

    const { captions } = toCaptions({
        whisperCppOutput
    })

    console.log(captions)

    writeFileSync(
        resolve(outputPath, options.jsonOutput ?? "subs.json"),
        JSON.stringify(captions, null, 2),
    );
    process.exit(0)
});

program.parse(process.argv);