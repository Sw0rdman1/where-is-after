import * as Localization from 'expo-localization';

const defaultLocale = Localization.getLocales()[0].languageTag;

type weekdayOptions = 'long' | 'short' | 'narrow';

export const formatDateWithDay = (date: Date, weekday: weekdayOptions, locale: string = defaultLocale): string => {

    const options: Intl.DateTimeFormatOptions = {
        weekday,
        day: '2-digit',
        month: '2-digit',
        year: '2-digit',
    };
    return date.toLocaleDateString(locale, options).charAt(0).toUpperCase() + date.toLocaleDateString(locale, options).slice(1);
};

export const formatTime = (date: Date, locale: string = defaultLocale): string => {
    const options: Intl.DateTimeFormatOptions = {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
    }

    return date.toLocaleTimeString(locale, options)
}