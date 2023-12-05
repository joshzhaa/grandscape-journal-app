<template>
  <div id="container">
    <img id="map-image" src="../assets/Equirectangular_projection_world_map_without_borders.svg">
    <img id="pin-image" src="../assets/Map_pin_icon.svg">
  </div>
</template>

<script setup lang="ts">
defineProps({
  latitude: String,
  longitude: String,
});
</script>

<style scoped>
#map-image {
  width: 100%;
  z-index: 1;
}

#pin-image {
  position: absolute;
  width: 20px;
  z-index: 2;
  top: 100px;
  left: 100px;
}
</style>
