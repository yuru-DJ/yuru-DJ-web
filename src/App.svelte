<script lang="ts">
	import CubeMonitor from './components/CubeMonitor.svelte'
	import AudioPlayer from './components/AudioPlayer.svelte'
</script>

<main>
	<AudioPlayer />

	<div class="monitor-container">
		<CubeMonitor role={"音量"}/>
		<CubeMonitor role={"リバーブ"}/>
		<CubeMonitor role={"速度"}/>
		<CubeMonitor role={"音量"}/>
		<CubeMonitor role={"リバーブ"}/>
		<CubeMonitor role={"速度"}/>
	</div>
</main>

<style lang="scss">
  .monitor-container {
		display: grid;
		grid-auto-flow: column;
		grid-template-rows: 30% 30% 30%;
		grid-template-columns: 50% 50%;
		padding: 5px;
		width: 100%;
  }
</style>
