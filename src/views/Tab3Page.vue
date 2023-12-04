<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Map</ion-title>
      </ion-toolbar>
    </ion-header>
    <div>
      <ion-button @click="getCurrentPosition">
        Get Current Location
      </ion-button>
      <br>
      <ion-text>Latitude: {{ loc.lat }}</ion-text>
      <ion-text>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Longitude: {{ loc.long }}</ion-text>
      <br>

    
  </div>


  <ion-icon :icon="pin" style="z-index: 2;
    position: absolute;
    left: 29%;
    top: 58%;
    margin: auto;"></ion-icon>
  <ion-img
          src="https://geology.com/world/world-map.gif"
          style="width:58%"
          alt="World map"
        ></ion-img>

  
    
  </ion-page>
</template>

<script lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonImg } from '@ionic/vue';
import ExploreContainer from '@/components/ExploreContainer.vue';

import { defineComponent, ref } from 'vue';
import { Geolocation } from '@capacitor/geolocation';
import { IonIcon } from '@ionic/vue';
import { pin } from 'ionicons/icons';

export default defineComponent({

  components: { IonImg, IonIcon },
  setup() {
    const loc = ref<{
      lat: null | number;
      long: null | number;
    }>({
      lat: null,
      long: null,
    });

    const getCurrentPosition = async () => {
      const pos = await Geolocation.getCurrentPosition();
      loc.value = {
        lat: pos.coords.latitude,
        long: pos.coords.longitude,
      };
    };
    return { getCurrentPosition, loc, pin };
  },
});
</script>
