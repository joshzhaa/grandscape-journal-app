<template>
  <ion-page>

    <ion-header>
      <ion-toolbar>
        <ion-title>Journal</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true" color="light">
      <ion-list>
        <ion-item>
          <ion-input
            label="Title"
            label-placement="fixed"
            type="text"
            placeholder="Your journal entry's title"
            v-model="title"
          ></ion-input>
        </ion-item>

        <ion-item>
          <ion-input
            label="Date"
            label-placement="fixed"
            type="text"
            placeholder="Today's date"
            v-model="date"
          ></ion-input>
        </ion-item>

        <ion-item>
          <ion-textarea
            label="Body"
            label-placement="stacked"
            placeholder="Main body of your journal entry"
            :auto-grow="true"
            rows="10"
            id="body-input"
          ></ion-textarea>
        </ion-item>

        <div style="height:75px"></div>

        <ion-fab vertical="bottom" horizontal="center" slot="fixed">
          <ion-fab-button @click="photos = addPhotos()">
            <ion-icon :icon="camera"></ion-icon>
          </ion-fab-button>
        </ion-fab>

      </ion-list>

      <ion-button id="confirm-button"
        @click="confirm()"
        vertical="bottom"
        shape="round"
        expand="full"
      >Save Journal Entry</ion-button>

    </ion-content>

    <ion-alert
      trigger="confirm-button"
      header="Successfully Saved!"
    ></ion-alert>

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
    IonTextarea,
    IonFab,
    IonFabButton,
    IonAlert,
  } from '@ionic/vue';

  import { ref } from 'vue';
  import { create, camera } from 'ionicons/icons';
  
  import { useJournalEntries, JournalEntry } from '@/lib/useJournalEntries';

  import { addPhotos } from '@/lib/usePhotos';

  const { journalEntries, saveEntry } = useJournalEntries();
  let photos = [];

  const title = ref();
  const date = ref();
  
  const confirm = async () => {
    const body = document.getElementById('body-input');
    const newEntry: JournalEntry = {
      date: date.value,
      title: title.value,
      body: body.value,
    };
    console.log(photos);
    saveEntry(newEntry, await photos);
    // clear the fields
    document.querySelectorAll('ion-input, ion-textarea').forEach((element) => {
      element.value = '';
    });
    photos = [];
  };

</script>
