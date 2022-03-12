<script lang="ts">
import { getNewCube } from "../api/toio";

export let role: string = 'No name';

let cubeLoaded = false;
let [x, y, angle] = [-1, -1, -1]
const onGetPositionValue = (value: [number, number, number]) => {
  [x, y, angle] = value;
};
const onGetMotionValue = (value: number[]) => console.log('motion:', value);

const onClick = () => {
  getNewCube({ onGetMotionValue, onGetPositionValue }).then(() => cubeLoaded = true)
}
</script>

<h2>{role}</h2>

{#if cubeLoaded}
<div>added!</div>
<div>({x}, {y}, {angle})</div>
{:else}
<button on:click={onClick}>add</button>
{/if}
