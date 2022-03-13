<script lang="ts">

import { getNewCube, type Cube } from "../api/toio";
import { addCube, cubeParams, updateCubeParams, latestCubeParam } from "../store";
import RadiusButton from "./RadiusButton.svelte";
import DjSlider from "./DJSlider.svelte";

export let role: string = 'No name';

// let cube: Cube;
let cubeLoaded = false;
let index;
let [x, y, angle] = [-1, -1, -1]; // normalized value

// const near = (now: number, prev: number): boolean => Math.abs(now - prev) < 0.01;
const near = (now: number, prev: number): boolean => now !== prev;

const onGetPositionValue = (value: [number, number, number]) => {
  [x, y, angle] = value;

  const params = $cubeParams[index];
  const prevX = params.x;
  const prevY = params.y;
  const prevAngle = params.angle;

  let numStep = 10;
  let normX = Math.floor(((x - 100) / 300) * numStep) / numStep;
  normX = Math.min(Math.max(normX, 0.001), 1);
  let normY = Math.floor(((y - 150) / 200) * numStep) / numStep;
  normY = Math.min(Math.max(normY, 0.001), 1);
  let normAngle = Math.floor(angle / 180);

  if (near(normX, prevX) || near(normY, prevY) || near(normAngle, prevAngle)) {
    latestCubeParam.set([index, normX, normY, normAngle]);
    updateCubeParams(index, {x: normX, y: normY, angle: normAngle});
  }
};
const onGetMotionValue = (value: number[]) => console.log('motion:', value);

const onClick = () => {
  getNewCube({ onGetMotionValue, onGetPositionValue }).then((c) => {
    if (!c) return

    // cube = c;
    addCube();
    index = $cubeParams.length - 1;
    cubeLoaded = true;
  })
}

</script>

<div class="container">
  <h2 class="role-name">{role}</h2>
  <div class="connect-toio-button-wrapper">
    <DjSlider max={360} min={0} value={x} disabled={!cubeLoaded} />
  </div>
  <RadiusButton onClick={onClick} disabled={cubeLoaded}>{cubeLoaded ? '接続済み' : 'Toioと繋ぐ'}</RadiusButton>
</div>

<style lang="scss">
  .container {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    width: 100%;
  }

  .role-name {
    width: 6em;
    overflow: hidden;
  }

  .connect-toio-button-wrapper {
    margin-right: 12px;
    width: calc(50%);
  }
</style>
