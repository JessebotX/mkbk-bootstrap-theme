const THEME_KEY = 'theme';
const THEME_DARK = 'dark';
const THEME_LIGHT = 'light';
const THEME_ATTRIBUTE = 'data-bs-theme'

function main() {
    enableCopyButtonFeature();
    enableThemeFeature();
}

function enableCopyButtonFeature() {
    const elements = document.querySelectorAll('[data-mkbk-theme-copy-id]');
    elements.forEach(element => {
        element.addEventListener('click', (e) => {
            const copyTextID = element.getAttribute('data-mkbk-theme-copy-id');
            const copyTextElement = document.getElementById(copyTextID);

            navigator.clipboard.writeText(copyTextElement.textContent.trim());

            const prevTextContent = element.innerHTML;
            element.textContent = "Copied!";

            setTimeout(() => element.innerHTML = prevTextContent, 2000)
        });
    });
}

function enableThemeFeature() {
    const checkbox = document.querySelector('#settings-toggle-theme');
    const currentTheme = localStorage.getItem(THEME_KEY);
    if (currentTheme == THEME_DARK) {
        setTheme(THEME_DARK, checkbox)
    } else {
        setTheme(THEME_LIGHT, checkbox);
    }

    if (checkbox) {
        checkbox.addEventListener('change', (e) => toggleSetTheme(checkbox));
    }
}

function toggleSetTheme(checkbox) {
    const currentTheme = localStorage.getItem(THEME_KEY);
    switch (currentTheme) {
    case THEME_DARK:
        setTheme(THEME_LIGHT, checkbox);
        break;
    default:
        setTheme(THEME_DARK, checkbox);
    }
}

function setTheme(theme, checkbox) {
    document.querySelector('html').setAttribute(THEME_ATTRIBUTE, theme);
    localStorage.setItem(THEME_KEY, theme);
    if (theme == THEME_LIGHT) {
        checkbox.checked = false;
    } else {
        checkbox.checked = true;
    }
}

main();
