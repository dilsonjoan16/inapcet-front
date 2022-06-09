<template>
  <!-- <div class="card"> -->
    <div class="loader">
      <div class="ball"></div>
      <div class="ball"></div>
      <div class="ball"></div>
      <span>Cargando...</span>
    </div>
  <!-- </div> -->
</template>
<script>
export default {
  name: "Loader"
}
</script>
<style scoped>
.loader{
  width: 180px;
  height: 125px;
  display: flex;
  flex-wrap: wrap;
  align-items: flex-end;
  justify-content: space-between;
  padding: 25px !important;
}
.loader span{
  font-size: 22px;
  text-transform: uppercase;
  margin: auto;
}
.ball{
  width: 25px;
  height: 25px;
  border-radius: 50px;
  background-color: #93291E;
  animation: bounce .5s alternate infinite;
}
.ball:nth-child(2){
  animation-delay: .16s;
}
.ball:nth-child(3){
  animation-delay: .32s;
}
@keyframes bounce {
  from {
    /* transform: scaleX(1.25); */
    margin-top: 50%;

  }
  to{
    /* transform: scaleY(-50px) scaleX(1); */
    margin-bottom: 50%;

  }
}
</style>
