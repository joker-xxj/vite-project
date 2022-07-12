<template>
  <div class="blank-container">
    <div class="child">
      <svg-icon
        icon-name="echartEmpty"
        style="height: 75px; width: 75px"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import svgIcon from './svg-icon.vue'
</script>

<style lang="less" scoped>
.blank-container {
  height: 100%;
  width: 100%;
  text-align: center;
  display: flex;
  align-items: center;
  .child {
    margin: 0 auto;
  }
}
</style>
