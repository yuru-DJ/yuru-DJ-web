<script lang="ts">

import { getNewCube, type Cube } from "../api/toio";
import { addCube, cubeParams, updateCubeParams, latestCubeParam } from "../store";
import RadiusButton from "./RadiusButton.svelte";
import DjSlider from "./DJSlider.svelte";

export let role: string = 'No name';

let cube: Cube;
let cubeLoaded = false;
let index = -1;
let [x, y, angle] = [-1, -1, -1]; // normalized value

const onGetPositionValue = (value: [number, number, number]) => {
  [x, y, angle] = value;

  let prevX = $cubeParams[index].x;
  let prevY = $cubeParams[index].y;
  let prevAngle = $cubeParams[index].angle;

  let numStep = 10;
  let newX = Math.floor(((x - 100) / 300) * numStep) / numStep;
  newX = Math.min(Math.max(newX, 0.001), 1);
  let newY = Math.floor(((y - 150) / 200) * numStep) / numStep;
  newY = Math.min(Math.max(newY, 0.001), 1);
  let newAngle = Math.floor(angle / 180);

  if (newX != prevX || newY != prevY || newAngle != prevAngle) {
    if (index >= 0) {
      latestCubeParam.set([index, newX, newY, newAngle]);
      updateCubeParams(index, {x: newX, y: newY, angle: newAngle});
    }
  }
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

// for debug
/*
let tmpIdx = 0;
let tmpX = 0;
let tmpY = 0;
$: {
  let a = tmpX / 10;
  let b = tmpY / 10;
  latestCubeParam.set([tmpIdx, a, b, 1]);
  updateCubeParams(tmpIdx, {x: a, y: b, angle: 1});
}
*/

</script>

<div class="container">
  <h2 class="role-name">{role}</h2>
  <div class="connect-toio-button-wrapper">
    <DjSlider max={360} min={0} value={angle} disabled={!cubeLoaded} />
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
    width: 5em;
    overflow: hidden;
  }

  .connect-toio-button-wrapper {
    margin-right: 1em;
    width: calc(45%);
  }
</style>
