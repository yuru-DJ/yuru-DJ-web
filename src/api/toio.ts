const TOIO_SERVICE_UUID = "10b20100-5b3b-4571-9508-cf3efcd7bbae";
const MOTOR_CHARACTERISTIC_UUID = "10b20102-5b3b-4571-9508-cf3efcd7bbae";
const MOTION_CHARACTERISTIC_UUID = "10b20106-5b3b-4571-9508-cf3efcd7bbae";
const LIGHT_CHARACTERISTICS_UUID = "10b20103-5b3b-4571-9508-cf3efcd7bbae";
const ID_SENSOR_CHARACTERISTICS_UUID = "10b20101-5b3b-4571-9508-cf3efcd7bbae";

const motorBuf = new Uint8Array([
  0x02, 0x01, 0x01, 0x32, 0x02, 0x02, 0x32, 0x78,
]);
const lightBuf = new Uint8Array([0x03, 0x00, 0x01, 0x01, 0x00, 0xff, 0x00]);

export interface Cube {
  lightCharacteristic: BluetoothRemoteGATTCharacteristic;
  motionCharacteristic: BluetoothRemoteGATTCharacteristic;
  motorCharacteristic: BluetoothRemoteGATTCharacteristic;
  positionCharacteristic: BluetoothRemoteGATTCharacteristic;
}

const getHexVal = (value: DataView, index: number) =>
  value.byteLength > index
    ? ("00" + value.getUint8(index).toString(16)).slice(-2)
    : "00";

const decodeMotion = (value: DataView): number[] =>
  [...Array(value.byteLength).keys()].map(
    (index) => parseInt("0x" + getHexVal(value, index), 16)
  );

const decodePosition = (value: DataView): [number, number, number] => {
  const x = parseInt(`0x${getHexVal(value, 2)}${getHexVal(value, 1)}`, 16);
  const y = parseInt(`0x${getHexVal(value, 4)}${getHexVal(value, 3)}`, 16);
  const angle = parseInt(`0x${getHexVal(value, 6)}${getHexVal(value, 5)}`, 16);

  return [x, y, angle];
};

export const spinCube = (cube: Cube) =>
  cube.motorCharacteristic.writeValue(motorBuf);

export const turnLight = (cube: Cube) =>
  cube.lightCharacteristic.writeValue(lightBuf);

export const getNewCube = async ({
  onGetMotionValue,
  onGetPositionValue,
}: {
  onGetMotionValue: (value: number[]) => void;
  onGetPositionValue: (value: [number, number, number]) => void;
}): Promise<Cube | null> => {
  try {
    console.log("Requesting Bluetooth Device...");
    const device = await navigator.bluetooth.requestDevice({
      filters: [{ services: [TOIO_SERVICE_UUID] }],
    });

    if (!device.gatt) return null;

    console.log("Connecting to GATT Server...");
    const server = await device.gatt.connect();

    console.log("Getting Service...");
    const service = await server.getPrimaryService(TOIO_SERVICE_UUID);

    console.log("Getting Characteristics...");
    const lightCharacteristic = await service.getCharacteristic(
      LIGHT_CHARACTERISTICS_UUID
    );
    const motorCharacteristic = await service.getCharacteristic(
      MOTOR_CHARACTERISTIC_UUID
    );
    const motionCharacteristic = await service.getCharacteristic(
      MOTION_CHARACTERISTIC_UUID
    );
    const positionCharacteristic = await service.getCharacteristic(
      ID_SENSOR_CHARACTERISTICS_UUID
    );

    await motionCharacteristic.startNotifications();
    motionCharacteristic.addEventListener(
      "characteristicvaluechanged",
      (event) => onGetMotionValue(decodeMotion((event.target as any)?.value))
    );
    await positionCharacteristic.startNotifications();
    positionCharacteristic.addEventListener(
      "characteristicvaluechanged",
      (event) => onGetPositionValue(decodePosition((event.target as any)?.value))
    );

    return {
      lightCharacteristic,
      motionCharacteristic,
      motorCharacteristic,
      positionCharacteristic,
    };
  } catch (error) {
    console.error("Error Occured:" + error);

    return null;
  }
};
