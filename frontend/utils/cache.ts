import { Image } from "expo-image";
import { Asset } from 'expo-asset';
import * as Font from 'expo-font';

export function cacheImages(images: any) {
    return images.map((image: any) => {
        if (typeof image === 'string') {
            return Image.prefetch(image);
        } else {
            return Asset.fromModule(image).downloadAsync();
        }
    });
}

export function cacheFonts(fonts: any) {
    return fonts.map((font: any) => Font.loadAsync(font));
}