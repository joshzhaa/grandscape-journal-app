import { watch } from 'vue';
import { Camera, GalleryPhoto, GalleryPhotos } from '@capacitor/camera';

export const addPhotos = async () => {
  const galleryPhotos: GalleryPhotos = await Camera.pickImages({
    quality: 100,
  });
  const photos = galleryPhotos.photos.map((image: GalleryPhoto) => {
    return image.webPath;
  });
  return photos;
}
