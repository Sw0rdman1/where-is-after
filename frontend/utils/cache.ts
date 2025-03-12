import { Image } from "expo-image";
import { Asset } from 'expo-asset';

export function cacheImages(images: any) {
    return images.map((image: any) => {
        if (typeof image === 'string') {
            return Image.prefetch(image);
        } else {
            return Asset.fromModule(image).downloadAsync();
        }
    });
}