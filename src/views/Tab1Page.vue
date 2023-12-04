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
            ref="body"
          ></ion-textarea>
        </ion-item>


        <ion-fab vertical="bottom" horizontal="center" slot="fixed">
          <ion-fab-button @click="alert()">
            <ion-icon :icon="camera"></ion-icon>
          </ion-fab-button>
        </ion-fab>

      </ion-list>

      <ion-button @click="confirm()" vertical="bottom" shape="round" expand="full">Confirm</ion-button>
    </ion-content>

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
  } from '@ionic/vue';

  import { create, camera } from 'ionicons/icons';
  import { OverlayEventDetail } from '@ionic/core/components';
  import { ref } from 'vue';
  
  import {
    useJournalEntries,
    JournalEntry,
  } from '@/lib/useJournalEntries';

  const { journalEntries, saveEntry } = useJournalEntries();

  // supports the modal composition menu
  const title = ref();
  const date = ref();
  const body = ref();

  const confirm = () => {
    console.log(title.value, body.value.value);
    const newEntry: JournalEntry = {
      date: date.value,
      title: title.value,
      body: body.value.value,
    };
    saveEntry(newEntry);
  };

</script>
