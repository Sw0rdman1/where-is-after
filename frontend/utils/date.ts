import * as Localization from 'expo-localization';

const locale = Localization.getLocales()[0].languageTag;

export const formatDateWithDay = (date: Date): string => {
    const options: Intl.DateTimeFormatOptions = {
        weekday: 'long',
        year: '2-digit',
        month: '2-digit',
        day: 'numeric',

    }
    return date.toLocaleDateString(locale, options)
}

export const formatTime = (date: Date): string => {
    const options: Intl.DateTimeFormatOptions = {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
    }

    return date.toLocaleTimeString(locale, options)
}