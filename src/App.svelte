<script lang="ts">
	import CubeMonitor from './components/CubeMonitor.svelte'
	import AudioPlayer from './components/AudioPlayer.svelte'
</script>

<main>
	<AudioPlayer/>
	<CubeMonitor role={"音量"}/>
	<CubeMonitor role={"リバーブ"}/>
	<CubeMonitor role={"速度"}/>
</main>

<style lang="scss">
  main {
    // @media (max-width: 240px) { font-size: .75em }
  }
</style>
