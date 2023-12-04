import { Camera, GalleryPhoto, GalleryPhotos } from '@capacitor/camera';

export const usePhotos = () => {
  let photos: string[] = [];
  const pickPhotos = async () => {
    const galleryPhotos: GalleryPhotos = await Camera.pickImages({
      quality: 100,
    });
    photos = galleryPhotos.photos.map((image: GalleryPhoto) => {
      return image.path;
    });
  };
  return {
    photos,
    pickPhotos,
  }
}
