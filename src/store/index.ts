import { writable, derived } from "svelte/store";

// x, y, angle are normalized value
export interface CubeParams {
  x: number;
  y: number;
  angle: number;
}

export const cubeParams = writable<CubeParams[]>([]);
export const latestCubeParam = writable<number[]>([0, 0, 0, 0]); // [index, x, y, angle](normalized)
export const volume = writable<number>(1);

export const addCube = () =>
  cubeParams.update((params) => [...params, { x: -1, y: -1, angle: -1, fx: -1}]);

export const updateCubeParams = (index: number, newParams: CubeParams) => {
  cubeParams.update((cubeParams) => {
    const params = [...cubeParams];
    params.splice(index, 1, newParams);

    return params;
  });

  latestCubeParam.set([index, newParams.x, newParams.y, newParams.angle]);
}
