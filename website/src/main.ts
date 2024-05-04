import './scss/style.scss'; // for adding project styles

const indeterminateCheckbox = document.getElementById('checkbox-french');
const toggleThemeButton = document.getElementById('theme-button');
const activeOutlineButton = document.getElementById('active-outline-button');
const activeButton = document.getElementById('active-button');

document.addEventListener('DOMContentLoaded', () => {
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

function toggleTheme() {
  const bodyClasslist = document.body.classList;
  const themeChildrenElements = toggleThemeButton?.children;

  const [themeLightSvg, themeDarkSvg] = Array.from(themeChildrenElements as HTMLCollectionOf<HTMLElement>);

  const isLightTheme = bodyClasslist.value === 'light-theme';
  if (isLightTheme) {
    themeLightSvg.style.display = 'block';
    themeDarkSvg.style.display = 'none';
  } else {
    themeLightSvg.style.display = 'none';
    themeDarkSvg.style.display = 'block';
  }

  bodyClasslist.toggle('light-theme');
}
