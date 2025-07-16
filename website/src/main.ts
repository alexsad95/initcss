import tippy from 'tippy.js';

import { defaultTippyOptions } from './utils/constants';
import { getCookie, setCookie } from './utils/cookies';

import './components/theme-customizer';
import './scss/main.scss';

// Base page elements
const themeCustomizerButton = document.getElementById('theme-customizer-button');
const githubButton = document.getElementById('github-link-button');
const activeButton = document.getElementById('active-button');
const activeOutlineButton = document.getElementById('active-outline-button');

/**
 * Main event handler for initializing UI elements and setting up theme
 * and button actions after page load
 */
document.addEventListener('DOMContentLoaded', () => {
  initTheme();

  if (!(themeCustomizerButton && githubButton && activeOutlineButton && activeButton)) {
    console.error(
      'Not found some elements: ',
      themeCustomizerButton,
      activeButton,
      activeOutlineButton,
    );
    return;
  }

  setupCopyButtons();

  // Add events for buttons
  activeButton.addEventListener('click', () => toggleActiveButton(activeButton));
  activeOutlineButton.addEventListener('click', () => toggleActiveButton(activeOutlineButton));

  tippy(themeCustomizerButton, {
    ...defaultTippyOptions,
    content: 'Theme customizing',
  });

  tippy(githubButton, {
    ...defaultTippyOptions,
    content: 'Github link',
  });
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
  const isActive = activeButtonEl.innerText === 'Active';
  activeButtonEl.innerText = isActive ? 'Not active' : 'Active';
}

/**
 * Sets up code block copy buttons.
 */
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

function applyTheme(themeName: string): void {
  document.documentElement.setAttribute('data-theme', themeName);
  setCookie('theme', themeName);
}

function initTheme(): void {
  const saved = getCookie('theme');
  const theme = saved || 'gruvbox-dark';
  applyTheme(theme);
}
