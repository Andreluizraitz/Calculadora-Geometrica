// Tema: claro / escuro universal
(() => {
    const STORAGE_KEY = 'site-theme-preference';
    const CLASS_DARK = 'theme-dark';
    const CLASS_LIGHT = 'theme-light';
    const EVENT_NAME = 'themechange';

    // Detecta preferência do sistema
    const systemPrefersDark = () =>
        window.matchMedia &&
        window.matchMedia('(prefers-color-scheme: dark)').matches;

    // Lê preferencia salva ou usa sistema
    const getStoredPreference = () => {
        try {
            return localStorage.getItem(STORAGE_KEY);
        } catch (e) {
            return null;
        }
    };

    const storePreference = (theme) => {
        try {
            localStorage.setItem(STORAGE_KEY, theme);
        } catch (e) {
            // Silenciar falhas (ex: modo privado)
        }
    };

    // Aplica tema ao <html>
    const applyTheme = (theme) => {
        const html = document.documentElement;
        html.classList.remove(CLASS_DARK, CLASS_LIGHT);
        if (theme === 'dark') {
            html.classList.add(CLASS_DARK);
        } else {
            html.classList.add(CLASS_LIGHT);
        }
        // Dispara evento para listeners externos
        const event = new CustomEvent(EVENT_NAME, { detail: { theme } });
        window.dispatchEvent(event);
    };

    // Decide e aplica tema inicial
    const init = () => {
        let theme = getStoredPreference();
        if (theme !== 'light' && theme !== 'dark') {
            theme = systemPrefersDark() ? 'dark' : 'light';
        }
        applyTheme(theme);

        // Escuta mudança da preferência do sistema, se o usuário não tiver fixado
        if (!getStoredPreference()) {
            if (window.matchMedia) {
                window
                    .matchMedia('(prefers-color-scheme: dark)')
                    .addEventListener('change', (e) => {
                        const newTheme = e.matches ? 'dark' : 'light';
                        applyTheme(newTheme);
                    });
            }
        }
    };

    // API pública
    const themeSwitcher = {
        toggle: () => {
            const current = document.documentElement.classList.contains(CLASS_DARK)
                ? 'dark'
                : 'light';
            const next = current === 'dark' ? 'light' : 'dark';
            applyTheme(next);
            storePreference(next);
        },
        set: (theme) => {
            if (theme !== 'dark' && theme !== 'light') return;
            applyTheme(theme);
            storePreference(theme);
        },
        clearPreference: () => {
            try {
                localStorage.removeItem(STORAGE_KEY);
            } catch (e) { }
            // Re-apply based on system
            const theme = systemPrefersDark() ? 'dark' : 'light';
            applyTheme(theme);
        },
        current: () =>
            document.documentElement.classList.contains(CLASS_DARK) ? 'dark' : 'light',
        onChange: (callback) => {
            window.addEventListener(EVENT_NAME, (e) => callback(e.detail.theme));
        },
    };
    
    // Expõe globalmente (nome ajustável)
    window.themeSwitcher = themeSwitcher;

    // Inicializa imediatamente
    document.addEventListener('DOMContentLoaded', init);
})();
