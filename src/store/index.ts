import { writable, derived } from "svelte/store";

export type RoleType = 'filter' | 'pingpongDelay' | 'pitchShift' | 'vibrato' | 'frequencyShifter' | 'reverb';

// x, y, angle are normalized value
export interface CubeParams {
  x: number;
  y: number;
  angle: number;
  role: RoleType;
}

export const cubeParams = writable<CubeParams[]>([]);
export const latestCubeParam = writable<CubeParams>();
export const volume = writable<number>(1);

export const addCube = (role: RoleType) =>
  cubeParams.update((params) => [...params, { x: -1, y: -1, angle: -1, role }]);

export const updateCubeParams = (index: number, newParams: CubeParams) => {
  cubeParams.update((cubeParams) => {
    const params = [...cubeParams];
    params.splice(index, 1, newParams);

    return params;
  });

  latestCubeParam.set({ ...newParams });
}
