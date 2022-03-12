<script lang="ts">
export let numTicks = 10;
export let degrees = 270;
export let size = 150;
export let min = 1;
export let max = 100;
export let value = 60;

  const startDrag = e => {
    e.preventDefault();
    const knob = e.target.getBoundingClientRect();
    const pts = {
      x: knob.left + knob.width / 2,
      y: knob.top + knob.height / 2
    };
    const moveHandler = e => {
      let currentDeg = getDeg(e.clientX, e.clientY, pts);
      if (currentDeg === startAngle) currentDeg--;
      let newValue = Math.floor(
        convertRange(
          startAngle,
          endAngle,
          min,
          max,
          currentDeg
        )
      );
      deg = currentDeg;
      // onChange(newValue);
    };
    document.addEventListener("mousemove", moveHandler);
    document.addEventListener("mouseup", e => {
      document.removeEventListener("mousemove", moveHandler);
    });
  };

  const getDeg = (cX, cY, pts) => {
    const x = cX - pts.x;
    const y = cY - pts.y;
    let deg = Math.atan(y / x) * 180 / Math.PI;
    if ((x < 0 && y >= 0) || (x < 0 && y < 0)) {
      deg += 90;
    } else {
      deg += 270;
    }
    let finalDeg = Math.min(Math.max(startAngle, deg), endAngle);
    return finalDeg;
  };

  const convertRange = (oldMin, oldMax, newMin, newMax, oldValue) => {
    return (oldValue - oldMin) * (newMax - newMin) / (oldMax - oldMin) + newMin;
  };

  const renderTicks = () => {
    let ticks = [];
    const incr = fullAngle / numTicks;
    const size = margin + 150 / 2;
    for (let deg = startAngle; deg <= endAngle; deg += incr) {
      const tick = {
        deg: deg,
        tickStyle: {
          height: `${size + 10}px`,
          left: `${size - 1}px`,
          top: `${size + 2}px`,
          transform: "rotate(" + deg + "deg)",
          transformOrigin: "center top"
        }
      };
      ticks.push(tick);
    }
    return ticks;
  };

  const dcpy = o => {
    return JSON.parse(JSON.stringify(o));
  };

const hoge = (obj) => {
  let style = '';
  Object.keys(obj).forEach(function (key) {
    style += `${key}: ${obj[key]};`;
  });

return style
}

const fullAngle = degrees;
const startAngle = (360 - degrees) / 2;
const endAngle = startAngle + degrees;
const margin = size * 0.15;
const currentDeg = Math.floor(convertRange(
  min,
  max,
  startAngle,
  endAngle,
  value
));
let deg = currentDeg;
const onChange = () => {}

    let kStyle = {
      width: `${size}px`,
      height: `${size}px`
    };
    let iStyle = dcpy(kStyle);
    let oStyle = dcpy(kStyle);
    oStyle.margin = `${margin}px`;

    console.log(renderTicks())
</script>

<div class="container">
<div class="knob" style={hoge(kStyle)}>
  <div class="knob outer" style={hoge(oStyle)} on:mousedown={startDrag}>
    <div class="knob inner" style={hoge(iStyle) + `transform: rotate(${deg}deg);`}>
      <div class="grip" />
    </div>
  </div>
  </div>
</div>

<style lang="scss">
.container {
  padding: 20px;
height: 80%;
width: 80%;
  display: grid;
  justify-content: center;
  align-items: center;
}

.knob {
  display: flex;
  position: relative;
}
.knob .ticks {
  position: absolute;
}
.knob .ticks .tick {
  position: absolute;
  background: black;
  box-shadow: inset 0 0 0 0 black;
  width: 3px;
  transition: box-shadow 0.5s;
}
.knob .ticks .tick.active {
  box-shadow: inset 0 0 5px 2px #509eec, 0 0 0 1px #369;
}
.knob.outer {
  border-radius: 50%;
  border: 1px solid #222;
  border-bottom: 5px solid #222;
  background-image: radial-gradient(100% 70%, #666 6%, #333 90%);
  box-shadow: 0 5px 15px 2px black, 0 0 5px 3px black, 0 0 0 12px #444;
}
.knob.inner {
  border-radius: 50%;
}
.knob.inner .grip {
  position: absolute;
  width: 5%;
  height: 5%;
  bottom: 2%;
  left: 50%;
  transform: translateX(-50%);
  border-radius: 50%;
  background: #509eec;
  box-shadow: 0 0 3px 1px black;
}
</style>
