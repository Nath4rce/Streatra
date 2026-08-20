export function renderSplash() {
  const container = document.createElement('div');
  container.classList.add('splash-screen');

  const logo = document.createElement('img');
  logo.src = '/assets/logo/logo.png';
  logo.alt = 'Streatra';
  logo.classList.add('splash-screen__logo');

  const title = document.createElement('h1');
  title.textContent = 'Streatra';
  title.classList.add('splash-screen__title');

  container.appendChild(logo);
  container.appendChild(title);

  return container;
}