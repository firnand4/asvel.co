import { createContext, useContext, useEffect, useState } from 'react';
import id from './id';
import en from './en';

const dictionaries = { id, en };
export const LANGUAGES = ['id', 'en'];
const STORAGE_KEY = 'asvel_lang';

const LanguageContext = createContext(null);

function readStoredLang() {
    try {
        const stored = window.localStorage.getItem(STORAGE_KEY);
        return LANGUAGES.includes(stored) ? stored : 'id';
    } catch {
        return 'id';
    }
}

export function LanguageProvider({ children }) {
    // Indonesian is the default; English is opt-in via the switcher.
    const [lang, setLangState] = useState('id');

    useEffect(() => {
        setLangState(readStoredLang());
    }, []);

    useEffect(() => {
        document.documentElement.lang = lang;
    }, [lang]);

    const setLang = (next) => {
        setLangState(next);
        try {
            window.localStorage.setItem(STORAGE_KEY, next);
        } catch {
            // Storage unavailable (private mode etc.): the choice just won't persist.
        }
    };

    return (
        <LanguageContext.Provider value={{ lang, setLang, t: dictionaries[lang] }}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLang() {
    return useContext(LanguageContext);
}

// Build a wa.me link with a prefilled message.
export function waLink(number, message) {
    return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}
