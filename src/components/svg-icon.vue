
<template>
  <svg
    :class="svgClass"
    aria-hidden="true"
  >
    <use :xlink:href="icon" />
  </svg>
</template>

<script setup lang="ts">
const prop = defineProps({
  iconName: {
    type: String,
    required: true
  },
  className: {
    type: String,
    default: ''
  }
})
const icon = computed(() => `#icon-${prop.iconName}`)
const svgClass = computed(() => prop.className ? `svg-icon ${prop.className}` : 'svg-icon')

</script>

<style scoped>
  .svg-icon {
    width: 13px;
    height: 13px;
    vertical-align: -0.15em;
    fill: currentColor;
    overflow: hidden;
  }
</style>
