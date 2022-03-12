<script lang="ts">
	import CubeMonitor from './components/CubeMonitor.svelte'
	import AudioPlayer from './components/AudioPlayer.svelte'
</script>

<main>
	<AudioPlayer />

	<div class="monitor-container">
		<div class="monitor-wrapper">
			<CubeMonitor role={"音量"}/>
		</div>
		<div class="monitor-wrapper">
			<CubeMonitor role={"リバーブ"}/>
		</div>
		<div class="monitor-wrapper">
			<CubeMonitor role={"速度"}/>
		</div>
		<div class="monitor-wrapper">
			<CubeMonitor role={"音量"}/>
		</div>
		<div class="monitor-wrapper">
			<CubeMonitor role={"リバーブ"}/>
		</div>
		<div class="monitor-wrapper">
			<CubeMonitor role={"速度"}/>
		</div>
	</div>
</main>

<style lang="scss">
  .monitor-container {
		display: grid;
		grid-auto-flow: column;
		grid-template-rows: 30% 30% 30%;
		grid-template-columns: 50% 50%;
		padding: 16px;
		width: 100%;
  }

	.monitor-wrapper {
		margin: 1em;
	}
</style>
