<script lang="ts">
import { getNewCube, type Cube } from "../api/toio";
import { addCube, cubeParams, updateCubeParams } from "../store";
import DjSlider from "./DJSlider.svelte";

export let role: string = 'No name';

let cube: Cube;
let cubeLoaded = false;
let index = -1;
let [x, y, angle] = [-1, -1, -1];
const onGetPositionValue = (value: [number, number, number]) => {
  [x, y, angle] = value;

  if (index >= 0)
    updateCubeParams(index, { x, y, angle });
};
const onGetMotionValue = (value: number[]) => console.log('motion:', value);

const onClick = () => {
  getNewCube({ onGetMotionValue, onGetPositionValue }).then((c) => {
    if (!c) return

    cube = c;
    addCube();
    index = $cubeParams.length - 1;
    cubeLoaded = true;
  })
}
</script>

<div class="container">
  <h2>{role}</h2>

  {#if cubeLoaded}
  <div>({x}, {y}, {angle})</div>
  {:else}
  <button on:click={onClick}>add</button>
  {/if}
  <DjSlider max={360} min={0} value={angle} />
</div>
