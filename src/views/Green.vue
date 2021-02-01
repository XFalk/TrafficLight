<template>
  <div v-bind:class="{ flash: currentColor === 'green' && flash === true }">
    <p v-bind:class="{ noneopacity: currentColor === 'green' }">{{time}}</p>
  </div>
</template>
<script>
export default {
  props: ['time', 'currentColor', 'flash']
}
</script>
<style scoped>
.flash{
  opacity: 0;
}
p {
  font-size: 56px;
  line-height: 100px;
  color: #047a04;
  margin: 0;
  opacity: 0;
}
div {
  background-color: #00ff00;
  text-align: center;
  margin: 0;
  padding: 0;
  opacity: 1;
}
.noneopacity{
  opacity: 1;
}
</style>