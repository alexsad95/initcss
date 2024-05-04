import { getCookie, setCookie } from './utils/cookies';

import './scss/style.scss';

type Themes = 'dark' | 'light';

const indeterminateCheckbox = document.getElementById('checkbox-french');
const toggleThemeButton = document.getElementById('theme-button');
const activeOutlineButton = document.getElementById('active-outline-button');
const activeButton = document.getElementById('active-button');

document.addEventListener('DOMContentLoaded', () => {
  // get saved theme from cookie
  const savedTheme = getCookie('theme');
  if (savedTheme) {
    applyTheme(savedTheme as Themes);
  } else {
    applyTheme('dark'); // default theme
  }

  checkThemeForIcons();

  if (!(indeterminateCheckbox && toggleThemeButton && activeOutlineButton && activeButton)) {
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
  const toggleActiveOutliineButtonHandler = () => toggleActiveButton('active-outline-button');
  const toggleActiveButtonHandler = () => toggleActiveButton('active-button');

  activeOutlineButton.addEventListener('click', toggleActiveOutliineButtonHandler);
  activeButton.addEventListener('click', toggleActiveButtonHandler);
  toggleThemeButton.addEventListener('click', toggleTheme);
});

/**
 * Toggles active class for an element based on its id
 * @param {string} elemID Element id
 * @throws {Error} if `elemID` is not a string or empty
 */
function toggleActiveButton(elemID: string) {
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
