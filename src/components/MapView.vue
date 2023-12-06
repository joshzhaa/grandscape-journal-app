<template>
  <div id="container">
    <img id="map-image" src="../assets/Equirectangular_projection_world_map_without_borders.svg">
    <img id="pin-image" src="../assets/Map_pin_icon.svg">
  </div>
</template>

<script setup lang="ts">
  import { onMounted } from 'vue';
  const props = defineProps({
    latitude: String,
    longitude: String,
  });
// the conversion is (0, 0) = (670, 325) and (-166.75, 68.33) = (45, 600)
// longitude: px = 3.74813 * lon + 670
// latitude: px = 4.02459 * lat + 325
onMounted(() => {
  const pin = document.querySelector('#pin-image');
  pin.style.left = 3.74813 * props.longitude + 670;
  pin.style.bottom = 4.02459 * props.latitude + 325;
})
</script>

<style scoped>
#container {
  position: relative;
}

#map-image {
  position: relative;
  width: 100%;
  z-index: 1;
}

#pin-image {
  position: absolute;
  width: 20px;
  z-index: 2;
  left: 356px;
  bottom: 495px;
}
</style>
