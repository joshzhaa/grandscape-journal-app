import { ref, onMounted, watch } from 'vue';
import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';
import { Preferences } from '@capacitor/preferences';
import { isPlatform } from '@ionic/vue';
import { Capacitor } from '@capacitor/core';

// for saving non-text encoded data
const convertBlobToBase64 = (blob: Blob) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = reject;
    reader.onload = () => {
      resolve(reader.result);
    };
    reader.readAsDataURL(blob);
  });

export interface JournalEntry {
  dirname: string;
  photos: string[];
  title: string;
  date: string;
  body: string;
}

export const useJournalEntries = () => {
  const journalEntries = ref<JournalEntry>([]);
  const JOURNAL_KEY = 'journalEntries';
  // save list of journalEntries to Preferences reactively
  const cacheEntries = () => {
    Preferences.set({
      key: JOURNAL_KEY,
      value: JSON.stringify(journalEntries.value)
    });
  };
  watch(journalEntries, cacheEntries);
  // load saved journalEntries on mount
  const loadSaved = async () => {
    const journalList = await Preferences.get({ key: JOURNAL_KEY });
    journalEntries.value = journalList.value ? JSON.parse(journalList.value) : [];
  }
  onMounted(loadSaved);
  
  const saveEntry = async (newEntry: JournalEntry, imagePaths: string[]) => {
    newEntry.dirname = `entry${journalEntries.value.length}`;
    newEntry.photos = [...imagePaths];
    journalEntries.value = [newEntry, ...journalEntries.value];
    console.log(journalEntries);

    // write to device Filesystem
    await Filesystem.writeFile({
      path: `${newEntry.dirname}/metadata.json`,
      data: JSON.stringify({
        title: newEntry.title,
        date: newEntry.date,
        photos: newEntry.photos,
      }),
      directory: Directory.Documents,
      encoding: Encoding.UTF8,
    });

    await Filesystem.writeFile({
      path: `${newEntry.dirname}/body.txt`,
      data: newEntry.body,
      directory: Directory.Documents,
      encoding: Encoding.UTF8,
    });
  }

  return {
    journalEntries,
    saveEntry,
  };
}
