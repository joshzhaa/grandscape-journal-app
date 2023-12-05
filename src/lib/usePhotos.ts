import { watch } from 'vue';
import { Camera, GalleryPhoto, GalleryPhotos } from '@capacitor/camera';

export const usePhotos = () => {
  let photos: string[] = [];
  const pickPhotos = async () => {
    const galleryPhotos: GalleryPhotos = await Camera.pickImages({
      quality: 100,
    });
    console.log(galleryPhotos)
    // photos = galleryPhotos.photos.map((image: GalleryPhoto) => {
    //   return image.path;
    // });
    photos = ['example/path'];
    console.log(photos)
  };
  return {
    photos,
    pickPhotos,
  }
}

export const addPhotos = async () => {
  const galleryPhotos: GalleryPhotos = await Camera.pickImages({
    quality: 100,
  });
  const photos = galleryPhotos.photos.map((image: GalleryPhoto) => {
    return image.path;
  });
  return photos;
}
