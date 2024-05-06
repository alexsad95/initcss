import tippy from 'tippy.js';
import type { Props } from 'tippy.js';

import { getCookie, setCookie } from './utils/cookies';

import 'tippy.js/dist/tippy.css';
import './scss/style.scss';

type Themes = 'dark' | 'light';

const defaultTippyOptions = {
  delay: [500, 100],
  theme: 'custom',
} as Props;

const indeterminateCheckbox = document.getElementById('checkbox-french');
const toggleThemeButton = document.getElementById('theme-button');
const themeChangeButton = document.getElementById('theme-changing');
const activeOutlineButton = document.getElementById('active-outline-button');
const activeButton = document.getElementById('active-button');
const themeChangingBlockElement = document.getElementById('theme-changing-block');

document.addEventListener('DOMContentLoaded', () => {
  // get saved theme from cookie
  const savedTheme = getCookie('theme');
  if (savedTheme) {
    applyTheme(savedTheme as Themes);
  } else {
    applyTheme('dark'); // default theme
  }

  checkThemeForIcons();

  if (!(indeterminateCheckbox && toggleThemeButton && activeOutlineButton && activeButton && themeChangeButton)) {
    console.error(
      'Not found some elements: ',
      indeterminateCheckbox,
      toggleThemeButton,
      activeOutlineButton,
      activeButton,
    );
    return;
  }

  // indeterminated checkbox
  (indeterminateCheckbox as HTMLInputElement).indeterminate = true;

  // add events for buttons
  document.addEventListener('click', (event) => closeActivatedThemeChanger(event));
  toggleThemeButton.addEventListener('click', toggleTheme);
  activeOutlineButton.addEventListener('click', () => toggleActiveButton('active-outline-button'));
  activeButton.addEventListener('click', () => toggleActiveButton('active-button'));
  themeChangeButton.addEventListener('click', () => activateThemeChanger());

  tippy(toggleThemeButton, {
    ...defaultTippyOptions,
    content: 'Theme switcher',
  });
  tippy(themeChangeButton, {
    ...defaultTippyOptions,
    content: 'Change themes',
  });
});

/**
 * Toggles active class for an element based on its id
 * @param {string} elemID Element id
 * @throws {Error} if `elemID` is not a string or empty
 */
function toggleActiveButton(elemID: string): void {
  if (!(elemID && typeof elemID === 'string')) {
    throw new Error('Not a string or empty');
  }

  const activeButtonElement = document.getElementById(elemID);
  if (!activeButtonElement) {
    return;
  }

  activeButtonElement.classList.toggle('active');

  const isActive = activeButtonElement.innerText === 'active';
  activeButtonElement.innerText = isActive ? 'not active' : 'active';
}

/**
 * Function for switching theme
 */
function toggleTheme(): void {
  const isLightTheme = document.body.className === 'light';
  const newTheme = isLightTheme ? 'dark' : 'light';

  applyTheme(newTheme);
  checkThemeForIcons();
}

/**
 * Function for applying a theme
 * @param theme Theme name: 'dark' or 'light'
 */
function applyTheme(theme: Themes): void {
  document.body.className = theme;
  setCookie('theme', theme, 365);
}

/**
 * Function for changing icons in theme button based on current theme
 */
function checkThemeForIcons(): void {
  const themeChildrenElements = toggleThemeButton?.children;
  const [themeLightSvg, themeDarkSvg] = Array.from(themeChildrenElements as HTMLCollectionOf<HTMLElement>);

  const isLightTheme = document.body.className === 'light';
  if (isLightTheme) {
    themeLightSvg.style.display = 'block';
    themeDarkSvg.style.display = 'none';
  } else {
    themeLightSvg.style.display = 'none';
    themeDarkSvg.style.display = 'block';
  }
}

/**
 * Activates or deactivates theme changing block
 */
function activateThemeChanger(): void {
  if (!themeChangingBlockElement) {
    return;
  }

  themeChangingBlockElement.classList.toggle('active');
}

/**
 * Closes theme changing block if it's activated and user clicked outside of it
 * @param event MouseEvent
 */
function closeActivatedThemeChanger(event: MouseEvent): void {
  const target = event.target as HTMLElement;

  if (themeChangingBlockElement?.classList.contains('active')) {
    if (target && !target.closest('#theme-changing') && !target.closest('#theme-changing-block')) {
      themeChangingBlockElement?.classList.remove('active');
    }
  }
}
