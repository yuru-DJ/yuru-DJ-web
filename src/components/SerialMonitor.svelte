<script lang="ts">
import RadiusButton from "./RadiusButton.svelte";

import { connectSerial, readSerial } from "../api/serial";

let serialConnected = false;

const onClick = async () => {
  const reader = await connectSerial();

  serialConnected = true;

  readSerial(reader, (value) => {
    switch (value) {
      case 'NEAR':
        console.log('near!')
        break;
      case 'FAR':
        console.log('far!')
        break;
      default:
        console.log(value)
    }
  });
}
</script>

<div class="container">
  <RadiusButton onClick={onClick} disabled={serialConnected}>{serialConnected ? '接続済み' : 'シリアル通信'}</RadiusButton>
</div>

<style lang="scss">
  .container {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    width: 100%;
  }
</style>
