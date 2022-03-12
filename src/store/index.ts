import { writable, derived } from "svelte/store";

export interface CubeParams {
  x: number;
  y: number;
  angle: number;
}

export const cubeParams = writable<CubeParams[]>([]);

export const addCube = () =>
  cubeParams.update((params) => [...params, { x: -1, y: -1, angle: -1 }]);

export const updateCubeParams = (index: number, newParams: CubeParams) =>
  cubeParams.update((cubeParams) => {
    const params = [...cubeParams];
    params.splice(index, 1, newParams);

    return params;
  });
