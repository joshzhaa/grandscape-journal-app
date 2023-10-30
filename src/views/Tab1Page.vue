<template>
  <ion-page>

    <ion-header>
      <ion-toolbar>
        <ion-title>Journal</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true" color="light">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Journal</ion-title>
        </ion-toolbar>
      </ion-header>

      <ion-list :inset="true">
        <ion-item v-for="entry in journalEntries">
          <ion-label>({{ entry.date }}) {{ entry.title }}</ion-label>
        </ion-item>
      </ion-list>
    </ion-content>

    <ion-button id="open-modal" expand="block">
      <ion-icon :icon="create"></ion-icon>
      New Journal Entry
    </ion-button>

    <ion-modal ref="modal" trigger="open-modal" @willDismiss="onWillDismiss">
      <ion-header>
        <ion-toolbar>
          <ion-buttons slot="start">
            <ion-button @click="cancel()">Cancel</ion-button>
          </ion-buttons>
          <ion-title>Compose Entry</ion-title>
          <ion-buttons slot="end">
            <ion-button :strong="true" @click="confirm()">Confirm</ion-button>
          </ion-buttons>
        </ion-toolbar>
      </ion-header>

      <ion-content class="ion-padding">
        <ion-item>
          <ion-input
            label="Title"
            label-placement="stacked"
            ref="title"
            type="text"
            placeholder="Your Journal Entry Title"
          ></ion-input>
        </ion-item>

        <ion-item>
          <ion-input
            label="Date"
            label-placement="stacked"
            ref="date"
            type="text"
            placeholder="Today's Date"
          ></ion-input>
        </ion-item>

        <ion-item>
          <ion-input
            label="Body"
            label-placement="stacked"
            ref="body"
            type="text"
            placeholder="Main Body of Your Journal Entry"
          ></ion-input>
        </ion-item>
      </ion-content>
    </ion-modal>

  </ion-page>
</template>

<script setup lang="ts">
  import {
    IonContent,
    IonItem,
    IonLabel,
    IonList,
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonButtons,
    IonButton,
    IonModal,
    IonInput,
  } from '@ionic/vue';

  import { create } from 'ionicons/icons';
  import { OverlayEventDetail } from '@ionic/core/components';
  import { ref } from 'vue';

  const journalEntries = ref([{ date: '1/1/1990', title: 'Welcome to Grandscape' }]);

  // supports the modal composition menu
  const modal = ref();
  const title = ref();
  const date = ref();
  const body = ref();

  const cancel = () => modal.value.$el.dismiss(null, 'cancel');

  const confirm = () => {
    const newEntry = {};
    newEntry.date = date.value.$el.value;
    newEntry.title = title.value.$el.value;
    journalEntries.value = [newEntry, ...journalEntries.value];
    const name = title.value.$el.value;
    modal.value.$el.dismiss(name, 'confirm');
  };

</script>
