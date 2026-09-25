document.addEventListener('DOMContentLoaded', async () => {
  try {
    const response = await fetch('portfolio.json', { cache: 'no-store' });
    if (!response.ok) {
      throw new Error(`Could not load portfolio.json (${response.status})`);
    }

    const portfolio = await response.json();
    renderPortfolio(portfolio);
    initializeInteractions();
  } catch (error) {
    console.error(error);
    document.querySelector('#portfolio-content').innerHTML = '<p class="data-error">Portfolio data could not be loaded. Run the site through a local web server.</p>';
  }

});

function renderPortfolio(portfolio) {
  const { site, sections, footer } = portfolio;

  document.title = site.title;
  const nameElement = document.querySelector('[data-name]');
  nameElement.innerHTML = formatName(site.name);
  nameElement.dataset.text = site.name.toUpperCase();
  document.querySelector('[data-year]').textContent = site.year;
  document.querySelector('.hero-details').style.setProperty('--hero-role', `'${site.role}'`);
  document.querySelector('.hero-left').style.setProperty('--hero-location', `'${site.location}'`);
  document.querySelector('.logo').alt = site.logoAlt;

  const content = document.querySelector('#portfolio-content');
  content.replaceChildren(...sections.map(renderSection));

  document.querySelector('[data-footer-message]').textContent = footer.message;
  document.querySelector('[data-footer-availability]').textContent = footer.availability;
  document.querySelector('[data-footer-links]').replaceChildren(...footer.links.map(renderFooterLink));
}

function formatName(name) {
  const words = name.trim().split(/\s+/);
  if (words.length < 2) {
    return escapeHtml(name);
  }

  return `${escapeHtml(words.slice(0, -1).join(' '))}<br>${escapeHtml(words.at(-1))}`;
}

function renderSection(section) {
  const element = document.createElement('section');
  element.className = 'section';

  const heading = document.createElement('h2');
  heading.className = 'section-title';
  heading.textContent = section.title;

  const list = document.createElement('ul');
  list.className = 'list';
  list.append(...section.items.map(renderItem));

  element.append(heading, list);
  return element;
}

function renderItem(item) {
  const element = document.createElement('li');
  element.className = 'list-item';
  element.tabIndex = 0;

  const title = document.createElement('span');
  title.className = 'item-title';
  title.textContent = item.title;

  const description = document.createElement('span');
  description.className = 'item-desc';
  description.textContent = item.description;
  if (item.meta) {
    const meta = document.createElement('small');
    meta.className = 'item-meta';
    meta.textContent = item.meta;
    description.append(document.createElement('br'), meta);
  }

  element.append(title, description);

  if (item.url) {
    const link = document.createElement('a');
    link.className = 'project-link';
    link.href = item.url;
    link.target = '_blank';
    link.rel = 'noreferrer';
    link.setAttribute('aria-label', `${item.title} (opens in a new tab)`);
    element.prepend(link);
    link.append(title, description);
  }

  return element;
}

function renderFooterLink(linkData) {
  const link = document.createElement('a');
  link.className = 'social-link';
  link.href = linkData.url;
  link.textContent = linkData.label;
  if (linkData.url.startsWith('http')) {
    link.target = '_blank';
    link.rel = 'noreferrer';
  }
  return link;
}

function initializeInteractions() {
  const listItems = document.querySelectorAll('.list-item');
  listItems.forEach(item => {
    item.style.setProperty('--row-index', [...item.parentElement.children].indexOf(item));
    item.addEventListener('click', () => {
      item.style.transform = 'scale(0.98)';
      setTimeout(() => {
        item.style.transform = 'scale(1)';
      }, 150);
    });

    item.addEventListener('keydown', event => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        item.click();
      }
    });
  });

  const emailLink = document.querySelector('a[href^="mailto:"]');
  if (emailLink) {
    emailLink.addEventListener('click', event => {
      event.preventDefault();
      copyToClipboard(emailLink.href.replace('mailto:', ''));
    });
  }

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

  document.querySelectorAll('.section').forEach((section, index) => {
    section.style.setProperty('--section-index', index);
    observer.observe(section);
    setTimeout(() => section.classList.add('is-visible'), index * 120 + 300);
  });

  const revealVisibleSections = () => {
    document.querySelectorAll('.section:not(.is-visible)').forEach(section => {
      const bounds = section.getBoundingClientRect();
      if (bounds.top < window.innerHeight * 0.9 && bounds.bottom > 0) {
        section.classList.add('is-visible');
      }
    });
  };

  window.addEventListener('scroll', revealVisibleSections, { passive: true });
  revealVisibleSections();

  initializePixelField();
}

function initializePixelField() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return;
  }

  const canvas = document.querySelector('.pixel-canvas');
  const context = canvas.getContext('2d');
  const pixels = [];

  function resize() {
    const ratio = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = window.innerWidth * ratio;
    canvas.height = window.innerHeight * ratio;
    canvas.style.width = `${window.innerWidth}px`;
    canvas.style.height = `${window.innerHeight}px`;
    context.setTransform(ratio, 0, 0, ratio, 0, 0);
  }

  function seed() {
    pixels.length = 0;
    const count = Math.min(90, Math.floor((window.innerWidth * window.innerHeight) / 18000));
    for (let index = 0; index < count; index += 1) {
      pixels.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        size: Math.random() > 0.84 ? 4 : 2,
        speed: 0.15 + Math.random() * 0.45,
        phase: Math.random() * Math.PI * 2,
        gold: Math.random() > 0.72,
        mint: Math.random() > 0.68
      });
    }
  }

  function draw(time) {
    context.clearRect(0, 0, window.innerWidth, window.innerHeight);
    pixels.forEach(pixel => {
      pixel.y -= pixel.speed;
      if (pixel.y < -8) pixel.y = window.innerHeight + 8;
      const pulse = 0.18 + (Math.sin(time * 0.002 + pixel.phase) + 1) * 0.18;
      const color = pixel.gold ? '246, 213, 138' : pixel.mint ? '169, 229, 208' : '201, 196, 255';
      context.fillStyle = `rgba(${color}, ${pulse})`;
      context.fillRect(Math.round(pixel.x), Math.round(pixel.y), pixel.size, pixel.size);
    });
    requestAnimationFrame(draw);
  }

  resize();
  seed();
  window.addEventListener('resize', () => {
    resize();
    seed();
  });
  requestAnimationFrame(draw);
}

async function copyToClipboard(text) {
  try {
    await navigator.clipboard.writeText(text);
    console.log('Email copied to clipboard!');
  } catch {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    textArea.remove();
  }
}

function escapeHtml(value) {
  return value.replace(/[&<>"']/g, character => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  })[character]);
}
