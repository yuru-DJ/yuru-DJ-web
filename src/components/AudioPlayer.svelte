<script lang="ts">

import * as Tone from "tone";

// status
let fileLoaded = false;
let files;
let filename = "";

const player = new Tone.Player();
// filter
const gain = new Tone.Gain(0);
const filter = new Tone.AutoFilter({frequency: 2,depth: 0.5}).start();
const tremolo = new Tone.Tremolo({frequency: 0.5, depth: 0.5}).start();
const distortion = new Tone.Distortion({distortion: 0.5, wet: 0.5}); 
const feedback_delay = new Tone.FeedbackDelay({delayTime: 1, feedback: 0.5});
const reverb = new Tone.Reverb({decay: 2, preDelay: 0.5});
gain.gain.value = 1.0;

// output
player.chain(filter, tremolo, distortion, feedback_delay, reverb, gain, Tone.Destination);

function load() {
    fileLoaded = true;
    console.log(files);

    const file = files[0];
    filename = file.name;
    console.log(file.size);
    const url = URL.createObjectURL(file);
    
    player.load(url);
}

function play() {
    player.start();
}
</script>

<h2>Test</h2>

{#if fileLoaded == false}
<input type="file" bind:files on:change={load}>
{:else}
<p>{filename}</p>
<button on:click={play}>play</button>
{/if}

