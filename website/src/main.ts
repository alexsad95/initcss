import tippy from 'tippy.js';

import { defaultTippyOptions } from './utils/constants';
import { getCookie, setCookie } from './utils/cookies';

import './scss/style.scss';

type Themes = 'dark' | 'light';

// Base page elements
const toggleThemeButton = document.getElementById('theme-button');
// const themeChangeButton = document.getElementById('theme-changing');
const activeOutlineButton = document.getElementById('active-outline-button');
const activeButton = document.getElementById('active-button');
// const themeChangingBlock = document.getElementById('theme-changing-block');

/**
 * Main event handler for initializing UI elements and setting up theme
 * and button actions after page load
 */
document.addEventListener('DOMContentLoaded', () => {
  if (!(toggleThemeButton && activeOutlineButton && activeButton)) {
    console.error(
      'Not found some elements: ',
      toggleThemeButton,
      activeOutlineButton,
      activeButton,
    );
    return;
  }

  // Get saved theme from cookie
  const savedTheme = getCookie('theme');
  if (savedTheme) {
    applyTheme(savedTheme as Themes);
  } else {
    applyTheme('dark'); // Default theme
  }

  checkThemeForIcons();
  setupCopyButtons();

  // Indeterminated checkbox
  // (indeterminateCheckbox as HTMLInputElement).indeterminate = true;

  // Add events for buttons
  // document.addEventListener('click', (event) => closeActivatedThemeChanger(event));
  toggleThemeButton.addEventListener('click', toggleTheme);
  activeOutlineButton.addEventListener('click', () => toggleActiveButton(activeOutlineButton));
  activeButton.addEventListener('click', () => toggleActiveButton(activeButton));

  tippy(toggleThemeButton, {
    ...defaultTippyOptions,
    content: 'Theme switcher',
  });
  // tippy(themeChangeButton, {
  //   ...defaultTippyOptions,
  //   content: 'Change themes',
  // });
});

/**
 * Toggles active class for the passed element
 */
function toggleActiveButton(activeButtonEl: HTMLElement | null): void {
  if (!activeButtonEl) {
    console.error('Not found active button');
    return;
  }

  activeButtonEl.classList.toggle('ic-active');
  const isActive = activeButtonEl.innerText === 'active';
  activeButtonEl.innerText = isActive ? 'not active' : 'active';
}

/**
 * For switching theme
 */
function toggleTheme(): void {
  const isLightTheme = document.body.className === 'light';
  const newTheme = isLightTheme ? 'dark' : 'light';

  applyTheme(newTheme);
  checkThemeForIcons();
}

/**
 * For applying a theme
 */
function applyTheme(theme: Themes): void {
  document.body.className = theme;
  setCookie('theme', theme, 365);
}

/**
 * Changing icons in theme button based on current theme
 */
function checkThemeForIcons(): void {
  if (!toggleThemeButton) {
    console.error('Not found theme button');
    return;
  }

  const themeChildrenElements = toggleThemeButton.children;
  if (themeChildrenElements.length < 2) {
    console.error('Expected at least two child elements for the theme button');
    return;
  }

  const [themeLightSvg, themeDarkSvg] = Array.from(themeChildrenElements) as HTMLElement[];
  const isLightTheme = document.body.className === 'light';

  themeLightSvg.style.display = isLightTheme ? 'block' : 'none';
  themeDarkSvg.style.display = isLightTheme ? 'none' : 'block';
}

function setupCopyButtons(): void {
  const buttons = document.querySelectorAll<HTMLButtonElement>('.ic-code-block__copy-btn');

  buttons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const codeElement = btn.closest('.ic-code-block')?.querySelector('code');
      if (!codeElement) return;

      const code = codeElement.textContent || '';
      navigator.clipboard.writeText(code).then(() => {
        btn.textContent = 'Copied!';
        setTimeout(() => (btn.textContent = 'Copy'), 1000);
      });
    });
  });
}

/**
 * Activates or deactivates theme changing block
 */
// function activateThemeChanger(): void {
//   if (!themeChangingBlock) {
//     console.error('Not found theme changing block');
//     return;
//   }

//   themeChangingBlock.classList.toggle('active');
// }

/**
 * Closes theme changing block if it's activated and user clicked outside of it
 */
// function closeActivatedThemeChanger(event: MouseEvent): void {
//   if (!themeChangingBlock) {
//     console.error('Not found theme changing block');
//     return;
//   }

//   const target = event.target as HTMLElement;

//   if (
//     target &&
//     !target.closest('#theme-changing') &&
//     !target.closest('#theme-changing-block') &&
//     themeChangingBlock.classList.contains('active')
//   ) {
//     themeChangingBlock.classList.remove('active');
//   }
// }
