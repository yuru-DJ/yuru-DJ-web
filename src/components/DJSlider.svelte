<script lang="ts">
export let max: number = 1;
export let min: number = 0;
export let value: number = min;

const onChangeValue = (e) => console.log(e.target)
</script>

<form style={`--min: ${min}; --max: ${max}; --val: ${value}`}>
  <input max={max} min={min} type="range" value={value} on:change={onChangeValue} />
</form>

<style lang="scss">
  $input-p: .375em;
  $input-w: 19.5em;
  $input-h: 2.25em;
  $input-r: .5*$input-h;

  $track-r: $input-r - $input-p;
  $track-h: 2*$track-r;

  $thumb-d: $input-h;
  $thumb-r: .5*$thumb-d;

  $label-w: 3em;
  $label-o: .5*$label-w;

  @mixin track() {
    margin: 0 $input-p;
    height: $track-h;
    border-radius: $track-r;
    box-shadow: inset 0 1px 4px #8c8c8c;
    background:
      linear-gradient(#f8dd36, #d68706) 0/ var(--pos) no-repeat,
      linear-gradient(#efefef, #c9c9c9);
  }

  @mixin thumb() {
    box-sizing: border-box;
    border: solid $input-p transparent;
    width: $thumb-d; height: $thumb-d;
    border-radius: 50%;
    box-shadow: 0 2px 5px #7d7d7d;
    background:
      linear-gradient(#c5c5c5, whitesmoke) padding-box,
      linear-gradient(#fbfbfb, #c2c2c2) border-box;
    cursor: ew-resize
  }

  form {
    display: grid;
    --k: calc((var(--val) - var(--min))/
              (var(--max) - var(--min)));
    --pos: calc(#{$thumb-r} + var(--k)*(100% - #{$thumb-d}));
    grid-gap: .25em;
    place-self: center;
    min-width: 8em;
    width: calc(100% - 1.5em);
    max-width: $input-w;
    // filter: Saturate(var(--hl, 0));
    transition: filter .3s ease-out;

    // &:focus-within, &:hover { --hl: 1 }
  }

  input[type='range'] {
    &,
    &::-webkit-slider-runnable-track,
    &::-webkit-slider-thumb { -webkit-appearance: none }

    height: $input-h;
    border-radius: $input-h;
    box-shadow: 0 -1px #eaeaea, 0 1px #fff;
    background: linear-gradient(#c3c3c3, #f1f1f1);
    cursor: pointer;

    &::-webkit-slider-container {
      -webkit-user-modify: read-write !important;
      @include track
    }

    &::-webkit-slider-runnable-track { margin: -$input-p }
    &::-moz-range-track { @include track }

    &::-webkit-slider-thumb { @include thumb }
    &::-moz-range-thumb { @include thumb }

    &:focus { outline: none }
  }
</style>
