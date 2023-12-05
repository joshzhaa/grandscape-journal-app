<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Timeline</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
      <ion-card v-for="entry in journalEntries">
        <img v-if="entry.photos.length > 0" :src="entry.photos[0]"/>

        <ion-card-header>
          <ion-card-title>{{ entry.title }}</ion-card-title>
          <ion-card-subtitle>{{ entry.date }}</ion-card-subtitle>
        </ion-card-header>

        <ion-card-content>{{ entry.body }}{{ JSON.stringify(entry.photos) }}</ion-card-content>
      </ion-card>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
  import { IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonButton,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardSubtitle,
    IonCardTitle,
  } from '@ionic/vue';

  import {
    useJournalEntries,
  } from '@/lib/useJournalEntries';

  const { journalEntries, saveEntry } = useJournalEntries();
</script>
