import { themes } from '../utils/constants';

export class ThemeCustomizer extends HTMLElement {
  private selectedTheme: string = 'gruvbox-dark';
  private isModalOpen: boolean = false;

  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
    this.attachEventListeners();
  }

  disconnectedCallback() {
    document.removeEventListener('keydown', this.handleKeyDown);
  }

  private toggleModal() {
    this.isModalOpen = !this.isModalOpen;
    this.render();
    this.attachEventListeners();
  }

  private closeModalAndRerender() {
    this.isModalOpen = false;
    this.render();
    this.attachEventListeners();
  }

  private formatName(name: string): string {
    return name.replace(/-/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase());
  }

  private attachEventListeners() {
    const button = this.querySelector('button');
    if (button) {
      button.addEventListener('click', () => this.toggleModal());
    }

    const body = document.querySelector('body');
    const options = this.querySelectorAll('.theme-option');
    options.forEach((el) =>
      el.addEventListener('click', () => {
        const name = el.getAttribute('data-name');
        if (name) {
          body?.setAttribute('data-theme', name);
          this.selectedTheme = name;
          this.querySelectorAll('.theme-option.selected').forEach((el) =>
            el.classList.remove('selected'),
          );

          el.classList.add('selected');
        }
      }),
    );

    const container = this.querySelector('.container');
    const modal = this.querySelector('.theme-modal');
    if (container && modal) {
      container.addEventListener('click', (e) => {
        if (!modal.contains(e.target as Node)) {
          this.closeModalAndRerender();
        }
      });
    }

    document.addEventListener('keydown', this.handleKeyDown);
  }

  private handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      this.closeModalAndRerender();
    }
  };

  private render() {
    const roundedBlock = `
      <h4 class="ic-pb-s ic-underline-dotted">Rounded corners</h4>
      <hstack class="ic-space-s ic-align-y-center">
        <label>
          <span>0</span>
          <input type="radio" name="rounded" value="0" />
        </label>
        <label>
          <span>3xs</span>
          <input type="radio" name="rounded" value="3xs" />
        </label>
        <label>
          <span>2xs</span>
          <input type="radio" name="rounded" value="2xs" />
        </label>
        <label>
          <span>xs</span>
          <input type="radio" name="rounded" value="xs" />
        </label>
        <label>
          <span>s</span>
          <input type="radio" name="rounded" value="s" />
        </label>
      </hstack>
    `;

    const fontsBlock = `
      <h4 class="ic-py-s ic-underline-dotted">Change fonts</h4>
      <vstack class="ic-space-xs">
        <hstack class="ic-space-s ic-align-y-center ic-shrink">
          <span>Font-base</span>
          <select name="font">
            <option value="firaCode">Fira Code</option>
            <option value="roboto">Roboto</option>
            <option value="jetBrains">JetBrains</option>
            <option value="sourceCode">Source Code Pro</option>
          </select>
        </hstack>
        <hstack class="ic-space-s ic-align-y-center ic-shrink">
        <span>Font-heading</span>
          <select name="font">
            <option value="firaCode">Fira Code</option>
            <option value="roboto">Roboto</option>
            <option value="jetBrains">JetBrains</option>
            <option value="sourceCode">Source Code Pro</option>
          </select>
        </hstack>
        <hstack class="ic-space-s ic-align-y-center ic-shrink">
          <span>Font-mono</span>
          <select name="font">
            <option value="firaCode">Fira Code</option>
            <option value="roboto">Roboto</option>
            <option value="jetBrains">JetBrains</option>
            <option value="sourceCode">Source Code Pro</option>
          </select>
        </hstack>
      </vstack>
    `;

    const options = themes
      .map(
        (t) => `
        <div 
          class="theme-option ${t.name === this.selectedTheme ? 'selected' : ''}" 
          data-name="${t.name}"
          style="background:${t.colors.background};};"
        >
          <span style="color:${t.colors.text}">${this.formatName(t.name)}</span>
          <div class="colors">
            <div class="dot" style="background:${t.colors.main}"></div>
            <div class="dot" style="background:${t.colors.sub}"></div>
            <div class="dot" style="background:${t.colors.subAlt}"></div>
          </div>
        </div>
      `,
      )
      .join('');

    const themeBlock = `
      <h4 class="ic-py-s ic-underline-dotted">Change theme</h4>
      <div class="options-grid">
        ${options}
      </div>
    `;

    this.innerHTML = `
      <button id="theme-customizer-button" class="ic-button ic-mr-s ic-py-2xs ic-px-xs">
        <svg class="ic-w-s" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path fill="currentColor" d="M12 22C6.49 22 2 17.51 2 12S6.49 2 12 2s10 4.04 10 9c0 3.31-2.69 6-6 6h-1.77c-.28 0-.5.22-.5.5c0 .12.05.23.13.33c.41.47.64 1.06.64 1.67A2.5 2.5 0 0 1 12 22m0-18c-4.41 0-8 3.59-8 8s3.59 8 8 8c.28 0 .5-.22.5-.5a.54.54 0 0 0-.14-.35c-.41-.46-.63-1.05-.63-1.65a2.5 2.5 0 0 1 2.5-2.5H16c2.21 0 4-1.79 4-4c0-3.86-3.59-7-8-7"/>
          <circle cx="6.5" cy="11.5" r="1.5" fill="currentColor"/>
          <circle cx="9.5" cy="7.5" r="1.5" fill="currentColor"/>
          <circle cx="14.5" cy="7.5" r="1.5" fill="currentColor"/>
          <circle cx="17.5" cy="11.5" r="1.5" fill="currentColor"/>
        </svg>
      </button>
      <div class="container${this.isModalOpen ? ' open' : ''}">
        <div class="theme-modal">
          ${roundedBlock}
          ${fontsBlock}
          ${themeBlock}
        </div>
      </div>
    `;
  }
}

customElements.define('theme-customizer', ThemeCustomizer);
