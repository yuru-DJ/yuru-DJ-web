<script lang="ts">

import * as Tone from "tone";
import {latestCubeParam, volume} from "../store";

// status
let fileLoaded = false;
let files;
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

    let index = $latestCubeParam[0];
    let parX = $latestCubeParam[1];
    let parY = $latestCubeParam[2];
    let parAngle = $latestCubeParam[3];

    if (parAngle == 1) {
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
    } else {
        switch (index) {
            case 0:
                filter.wet.value = 0;
            case 1:
                pingpongDelay.wet.value = 0;
            case 2:
                pitchShift.wet.value = 0;
            case 3:
                vibrato.wet.value = 0;
            case 4:
                frequencyShifter.wet.value = 0;
                reverb.wet.value = 0;
            default:
                break;
        }
    }
});


// upload and load audio file
function load() {
    fileLoaded = true;

    const file = files[0];
    filename = file.name;

    const url = URL.createObjectURL(file);

    player.load(url);
}

// start play audio file
function start() {
    player.start();
}
// stop audio file
function stop() {
    player.stop();
}
// restart audio file
function restart() {
    player.start();
    player.restart();
}

// dispose current audio file
function dispose(){
    player.dispose();
    player.fan(filter, pitchShift, reverb);
    fileLoaded = false;
    filename = "";
}

</script>

<h1>audio player</h1>

{#if fileLoaded == false}
<input type="file" bind:files on:change={load}>
{:else}
<p>{filename}</p>
<button on:click={start}>start</button>
<button on:click={stop}>stop</button>
<button on:click={restart}>restart</button>
<button on:click={dispose}>dispose</button>
{/if}

