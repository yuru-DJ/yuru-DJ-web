<script lang="ts">
import { connectCube } from "../api/toio";
import { addCube, cubeParams, updateCubeParams, latestCubeParam } from "../store";
import RadiusButton from "./RadiusButton.svelte";
import DjSlider from "./DJSlider.svelte";

export let role: string = 'No name';

// let cube: Cube;
let cubeLoaded = false;
let cubeDisabled = false;
let index;
let [x, y, angle] = [-1, -1, -1]; // normalized value

const MIN_X = 100;
const MAX_X = 400;
const MIN_Y = 150;
const MAX_Y = 350;

const onGetPositionValue = (values: [number, number, number]) => {
  if (cubeDisabled || values.every((val) => val === 0)) return;

  [x, y, angle] = values;

  const params = $cubeParams[index];
  const prevX = params.x;
  const prevY = params.y;
  const prevAngle = params.angle;

  const normX = Math.min(Math.max((x - MIN_X) / (MAX_X - MIN_X), 0.001), 1);
  const normY = Math.min(Math.max((y - MIN_Y) / (MAX_Y - MIN_Y), 0.001), 1);
  const normAngle = Math.floor(angle / 180);

  const near = (now: number, prev: number): boolean => Math.abs(now - prev) < 0.1;
  if (near(normX, prevX) || near(normY, prevY) || near(normAngle, prevAngle)) {
    latestCubeParam.set([index, normX, normY, normAngle]);
    updateCubeParams(index, {x: normX, y: normY, angle: normAngle});
  }
};

const onGetMotionValue = (values: number[]) => {
  if (values[4] === 1) {
    cubeDisabled = false;
  } else if (values[4] > 1) {
    cubeDisabled = true;
  }
}

const onClick = () => {
  connectCube({ onGetMotionValue, onGetPositionValue }).then((c) => {
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
    <DjSlider max={MAX_X} min={MIN_X} value={x} disabled={!cubeLoaded || cubeDisabled} />
    <DjSlider max={MAX_Y} min={MIN_Y} value={y} disabled={!cubeLoaded || cubeDisabled} />
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
    margin-right: 12px;
    width: calc(50%);
  }
</style>
