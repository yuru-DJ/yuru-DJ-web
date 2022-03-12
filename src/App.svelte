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

<style>
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}

	h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>
