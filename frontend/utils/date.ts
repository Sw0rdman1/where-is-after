import * as Localization from 'expo-localization';

const defaultLocale = Localization.getLocales()[0].languageTag;


export const formatDateWithDay = (date: Date, locale: string = defaultLocale): string => {
    const options: Intl.DateTimeFormatOptions = {
        weekday: 'short',
        day: '2-digit',
        month: 'short',
        year: 'numeric',
    };

    return date.toLocaleDateString(locale, options).replace(/,/g, '');
};

export const formatTime = (date: Date, locale: string = defaultLocale): string => {
    const options: Intl.DateTimeFormatOptions = {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
    }

    return date.toLocaleTimeString(locale, options)
}