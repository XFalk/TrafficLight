<template>
    <div v-bind:class="{ flash: currentColor === 'red' && flash === true }">
        <p v-bind:class="{ noneopacity: currentColor === 'red' }" >{{time}}</p>
    </div>
</template>
<script>
export default {
  props: ['time','currentColor', 'flash']
}
</script>
<style scoped>
.flash{
  opacity: 0;
}
p {
  font-size: 56px;
  line-height: 100px;
  color: #800000;
  margin: 0;
  opacity: 0;
}
div{
    background-color: #ff0000;
  text-align: center;
  margin: 0;
  padding: 0;
  opacity: 1;
}
.noneopacity{
  opacity: 1;
}
</style>