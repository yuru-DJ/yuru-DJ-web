<script lang="ts">
</script>

<div class="container">
  <input type="checkbox" name="" />
  <div class="icon-box">
    <i class="fas fa-play"></i>
  </div>
</div>

<style lang="scss">
.container {
  position: relative;
  background:var(--mainDark);

  input[type="checkbox"] {
    height: 100%;
    width: 100%;
    ~ .icon-box{
      background:var(--mainDark);
      box-shadow:var(--buttonDark);
      i{
        color:var(--iconDarkVer);
      }
    }
    &:checked ~ .icon-box {
      box-shadow:var(--buttonDarkActive);
      i {
        text-shadow:var(--iconDarkVerActive);
        color:white;
      }
    }
  }
}

input[type="checkbox"] {
  position:absolute;
  opacity:0;
  cursor:pointer;
  ~ .icon-box{
    width:60px; height:60px;
    display:flex;
    align-items:center;
    justify-content:center;
    border-radius:4px;
    i{
      font-size:20px;
    }
  }
  &:checked ~ .icon-box{
    i{
      transform:scale(.95);
    }
  }
}
</style>
