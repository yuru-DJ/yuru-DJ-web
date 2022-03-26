<script lang="ts">
import * as Tone from "tone";
import { latestCubeParam, volume, playing } from "../store";

import Dropzone from "svelte-file-dropzone";

let files = {
    accepted: [],
    rejected: [],
};

// status
let fileLoaded = false;
let filename = "";

const player = new Tone.Player();
// filters
// toio0
const filter = new Tone.AutoFilter({frequency: 0.1, depth: 0.1}).start();
// toio1
const pingpongDelay = new Tone.PingPongDelay({delayTime:0.1, feedback:0.1});
// toio2
const pitchShift = new Tone.PitchShift({pitch: 0.1, delayTime: 0.1});
// toio3
const vibrato = new Tone.Vibrato({frequency: 0.1, depth: 0.1});
// toio4
const frequencyShifter = new Tone.FrequencyShifter({frequency: 0.1});
const reverb = new Tone.JCReverb({roomSize: 0.1});
// connect
player.fan(filter, pitchShift, frequencyShifter);
filter.chain(pingpongDelay, Tone.Destination);
pitchShift.chain(vibrato, Tone.Destination);
frequencyShifter.chain(reverb, Tone.Destination);

// store
volume.subscribe(value => {
    player.volume.value = $volume;
});

// update fx params
latestCubeParam.subscribe(value => {
    const [index, parX, parY, parAngle] = $latestCubeParam;

    // switch filter by wet value
    switch (index) {
        case 0:
            filter.wet.value = 1;
            filter.frequency.value = parX * 10;
            filter.depth.value = parY;
        case 1:
            pingpongDelay.wet.value = 1;
            pingpongDelay.delayTime.value = parX * 0.2;
            pingpongDelay.feedback.value = parY * 0.6;
        case 2:
            pitchShift.wet.value = 1;
            pitchShift.pitch = parX * 12;
            pitchShift.delayTime.value = parY * 0.01;
        case 3:
            vibrato.wet.value = 1;
            vibrato.frequency.value = parX * 100;
            vibrato.depth.value = parY;
        case 4:
            frequencyShifter.wet.value = 1;
            frequencyShifter.frequency.value = parX * 80;
            reverb.wet.value = 1;
            reverb.roomSize.value = parY * 0.6;
        default:
            break;
    }
});


// upload and load audio file
function onSelectFiles(e) {
    const { acceptedFiles, fileRejections } = e.detail;
    files.accepted = [...files.accepted, ...acceptedFiles];
    files.rejected = [...files.rejected, ...fileRejections];

    if (!files?.accepted?.length) return;

    const file = files.accepted[0];
    const url = URL.createObjectURL(file);
    player.load(url);

    filename = file.name;
    fileLoaded = true;
}

// start play audio file
function start() {
    player.start();
    playing.set(true);
}
// stop audio file
function stop() {
    player.stop();
    playing.set(false);
}
// restart audio file
function restart() {
    player.start();
    player.restart();
    playing.set(true);
}

// dispose current audio file
function dispose() {
    player.dispose();
    player.fan(filter, pitchShift, reverb);
    playing.set(false);

    files = {
        accepted: [],
        rejected: []
    };
    fileLoaded = false;
    filename = "";
}

</script>

<div class="container">
    {#if !fileLoaded}
        <Dropzone class="dropzone" on:drop={onSelectFiles}>
            音源データをドラッグ&ドロップ<br/>またはクリックしてアップロード
        </Dropzone>
    {:else}
        <div class="player-buttons-container">
            <h2>{filename}</h2>
            <div class="buttons">
                {#if !$playing}
                   <button on:click={start}>start</button>
                {:else}
                    <button on:click={stop}>stop</button>
                {/if}
                <button on:click={restart}>restart</button>
                <button on:click={dispose}>dispose</button>
            </div>
        </div>
    {/if}
</div>

<style lang="scss">
    .container {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 30%;
        width: 100%;
    }
    :global(.dropzone) {
        font-weight: bold;
        color: #61677C !important;
        max-width: 50%;
        border: none !important;
        border-radius: 16px !important;
        box-sizing: border-box;
        box-shadow: -5px -5px 20px #ccc,  5px 5px 20px #BABECC;
        cursor: pointer;
    }

    .player-buttons-container {
        text-align: center;
        height: 100%;
        width: 100%;

        .buttons {
            display: flex;
            align-items: center;
            justify-content: center;
        }
    }
</style>
