<script lang="ts">
	import CubeMonitor from './components/CubeMonitor.svelte'
	import SerialMonitor from './components/SerialMonitor.svelte'
	import AudioPlayer from './components/AudioPlayer.svelte'
</script>

<main>
	<header>
		<h1>bokuiijima.com</h1>
		<AudioPlayer />
	</header>

	<div class="monitor-container">
		<div class="monitor-wrapper">
			<CubeMonitor label="High/Low-pass Filter" role="filter" />
		</div>
		<div class="monitor-wrapper">
			<CubeMonitor label="Ping Pong Delay" role="pingpongDelay" />
		</div>
		<div class="monitor-wrapper">
			<CubeMonitor label="Pitch Shifter" role="pitchShift" />
		</div>
		<div class="monitor-wrapper">
			<CubeMonitor label={"Vibrato"} role="vibrato" />
		</div>
		<div class="monitor-wrapper">
			<CubeMonitor label="Frequency Shifter" role="frequencyShifter" />
		</div>
		<div class="monitor-wrapper">
			<CubeMonitor label="Reverb" role="filter" />
		</div>
	</div>

	<footer>
		<SerialMonitor />
	</footer>
</main>

<style lang="scss">
	main {
		height: 100%;
		width: 100%;
	}
	header {
		padding: 16px;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	footer {
		padding: 16px;
		display: flex;
		align-items: center;
		justify-content: flex-end;
	}

  .monitor-container {
		display: grid;
		grid-auto-flow: column;
		grid-template-rows: 30% 30% 30%;
		grid-template-columns: 48% 48%;
		padding: 16px;
		width: 100%;
  }

	.monitor-wrapper {
		margin: 1em;
	}
</style>
