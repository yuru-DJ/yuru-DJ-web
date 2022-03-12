<script lang="ts">
import { getNewCube, type Cube } from "../api/toio";
import { addCube, cubeParams, updateCubeParams } from "../store";
import RadiusButton from "./RadiusButton.svelte";
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
  <h2 class="role-name">{role}</h2>

  <DjSlider max={360} min={0} value={angle} disabled={!cubeLoaded} />
  <div class="connect-toio-button-wrapper">
    <RadiusButton onClick={onClick} disabled={cubeLoaded}>{cubeLoaded ? '接続済み' : 'Toioと繋ぐ'}</RadiusButton>
  </div>
</div>

<style lang="scss">
  .container {
    display: flex;
    align-items: center;
    justify-content: flex-start;
  }

  .role-name {
    width: 6em;
    overflow: hidden;
  }

  .connect-toio-button-wrapper {
    margin-left: 1em;
  }
</style>
