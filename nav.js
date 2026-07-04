const siteTitle = 'Interview Hub';
const siteDescription = 'Curated technical study notes, architecture guides, and interview prep resources for modern frontend and backend engineers.';

function cleanText(value) {
  return value
    .replace(/\s+/g, ' ')
    .replace(/\u00a0/g, ' ')
    .trim();
}

function getPageMetadata() {
  const titleTag = document.querySelector('title');
  const existingTitle = titleTag ? cleanText(titleTag.textContent) : siteTitle;
  const pageTitle = existingTitle.includes(siteTitle) ? existingTitle : `${existingTitle} | ${siteTitle}`;

  const candidates = [
    '.page-subhead',
    '.hero p',
    '.hero-intro p',
    'main p',
    '.sec-desc',
    'main .content-card p'
  ];

  let description = '';
  for (const selector of candidates) {
    const node = document.querySelector(selector);
    if (node) {
      description = cleanText(node.textContent);
      if (description) {
        break;
      }
    }
  }

  if (!description) {
    description = siteDescription;
  }

  if (description.length > 160) {
    description = `${description.slice(0, 157).trim()}…`;
  }

  const pathname = window.location.pathname.replace(/index\.html$/, '');
  const canonicalUrl = new URL(pathname || '/', window.location.origin).toString();
  const pageUrl = canonicalUrl.endsWith('/') ? canonicalUrl : `${canonicalUrl}/`;

  return {
    title: pageTitle,
    description,
    canonicalUrl: pageUrl,
    url: pageUrl
  };
}

function ensureMetaTag(attributes) {
  const existing = document.querySelector(`meta[${attributes.name ? 'name' : 'property'}="${attributes.name || attributes.property}"]`);
  if (existing) {
    if (attributes.content) {
      existing.setAttribute('content', attributes.content);
    }
    return existing;
  }

  const meta = document.createElement('meta');
  Object.entries(attributes).forEach(([key, value]) => {
    if (value) {
      meta.setAttribute(key, value);
    }
  });
  document.head.appendChild(meta);
  return meta;
}

function injectSeoMetadata() {
  const metadata = getPageMetadata();

  document.title = metadata.title;
  ensureMetaTag({ name: 'description', content: metadata.description });
  ensureMetaTag({ name: 'robots', content: 'index,follow' });
  ensureMetaTag({ name: 'keywords', content: 'interview prep, javascript, node.js, system design, backend engineering, frontend engineering, technical guides' });
  ensureMetaTag({ name: 'theme-color', content: '#0B0E14' });

  const canonical = document.querySelector('link[rel="canonical"]');
  if (canonical) {
    canonical.setAttribute('href', metadata.canonicalUrl);
  } else {
    const link = document.createElement('link');
    link.rel = 'canonical';
    link.href = metadata.canonicalUrl;
    document.head.appendChild(link);
  }

  ensureMetaTag({ property: 'og:title', content: metadata.title });
  ensureMetaTag({ property: 'og:description', content: metadata.description });
  ensureMetaTag({ property: 'og:type', content: 'website' });
  ensureMetaTag({ property: 'og:url', content: metadata.url });
  ensureMetaTag({ property: 'og:site_name', content: siteTitle });
  ensureMetaTag({ name: 'twitter:card', content: 'summary' });
  ensureMetaTag({ name: 'twitter:title', content: metadata.title });
  ensureMetaTag({ name: 'twitter:description', content: metadata.description });

  const existingSchema = document.querySelector('script[type="application/ld+json"]');
  if (!existingSchema) {
    const schema = document.createElement('script');
    schema.type = 'application/ld+json';
    schema.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: metadata.title,
      description: metadata.description,
      url: metadata.url,
      inLanguage: 'en',
      publisher: {
        '@type': 'Organization',
        name: siteTitle,
        url: metadata.url
      }
    });
    document.head.appendChild(schema);
  }
}

const navGroups = [
  {
    title: 'Home',
    pages: [
      { href: 'index.html', label: 'Overview' }
    ]
  },
  {
    title: 'JavaScript Core',
    pages: [
      { href: 'js-design-patterns.html', label: 'JS Patterns' },
      { href: 'advanced-javascript-concepts.html', label: 'Advanced JS Concepts' },
      { href: 'browser-event-loop.html', label: 'Browser Event Loop' },
      { href: 'nodejs_event_loop_lifecycle.html', label: 'Node.js Event Loop' },
      { href: 'node-deep-dive.html', label: 'Node.js Deep Dive' },
      { href: 'polyfills-guide.html', label: 'Polyfills' },
      { href: 'array-object-operations-guide.html', label: 'Array & Object Ops' },
      { href: 'js-interview-questions.html', label: 'JS Interview Questions' },
      { href: 'typescript-essentials.html', label: 'TypeScript Essentials' }
    ]
  },
  {
    title: 'Web Performance',
    pages: [
      { href: 'webworkers-animation.html', label: 'Web Workers Explained' },
      { href: 'service-workers-animation.html', label: 'Service Workers' },
      { href: 'redux_complete_guide.html', label: 'Redux Guide' }
    ]
  },
  {
    title: 'Backend & Systems',
    pages: [
      { href: 'project-architecture-guide.html', label: 'Project Architecture' },
      { href: 'microservice-api-communication.html', label: 'Microservices API' },
      { href: 'microservice_patterns.html', label: 'Microservice Patterns' },
      { href: 'postgres-like-a-pro.html', label: 'Postgres' },
      { href: 'redis-like-a-pro.html', label: 'Redis' },
      { href: 'kafka-mastery-roadmap.html', label: 'Kafka' }
    ]
  },
  {
    title: 'Cloud & Dev',
    pages: [
      { href: 'aws-compute-comparison.html', label: 'AWS Compute' },
      { href: 'aws-deployment-lifecycle.html', label: 'AWS Deployment' },
      { href: 'aws-iam-ec2-security.html', label: 'IAM & EC2' },
      { href: 'senior_developer_roadmap.html', label: 'Senior Dev Roadmap' },
      { href: 'system-design-like-a-pro.html', label: 'System Design' }
    ]
  }
];

function setTheme(theme) {
  const resolvedTheme = theme || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  document.documentElement.setAttribute('data-theme', resolvedTheme);
  document.documentElement.style.colorScheme = resolvedTheme;
  try {
    localStorage.setItem('theme', resolvedTheme);
  } catch (error) {
    console.warn('Unable to persist theme', error);
  }
  const toggle = document.querySelector('.theme-toggle');
  if (toggle) {
    toggle.textContent = resolvedTheme === 'dark' ? '☀️' : '🌙';
    toggle.setAttribute('aria-label', resolvedTheme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
  }
}

function buildNav() {
  const favicon = document.querySelector('link[rel="icon"], link[rel="shortcut icon"]');
  if (!favicon) {
    const newFavicon = document.createElement('link');
    newFavicon.rel = 'icon';
    newFavicon.type = 'image/svg+xml';
    newFavicon.href = 'logo.svg';
    document.head.appendChild(newFavicon);
  }

  const current = window.location.pathname.split('/').pop() || 'index.html';
  const nav = document.createElement('nav');
  nav.className = 'site-nav';
  nav.innerHTML = `
    <div class="wrap">
      <a class="site-nav-brand" href="index.html">
        <img src="logo.svg" alt="Interview Hub logo" />
        <span>Interview Hub</span>
      </a>
      <div class="site-nav-links"></div>
    </div>
  `;

  const linkContainer = nav.querySelector('.site-nav-links');

  navGroups.forEach((group) => {
    const groupWrap = document.createElement('div');
    groupWrap.className = 'nav-group';

    const groupLabel = document.createElement('button');
    groupLabel.className = 'nav-group-label';
    groupLabel.type = 'button';
    groupLabel.textContent = group.title;

    const groupMenu = document.createElement('div');
    groupMenu.className = 'nav-group-menu';

    group.pages.forEach((page) => {
      const link = document.createElement('a');
      link.href = page.href;
      link.textContent = page.label;
      if (current === page.href || (current === '' && page.href === 'index.html')) {
        link.classList.add('active');
      }
      groupMenu.appendChild(link);
    });

    groupLabel.addEventListener('click', (event) => {
      event.stopPropagation();
      const isOpen = groupWrap.classList.contains('open');
      document.querySelectorAll('.nav-group.open').forEach((item) => item.classList.remove('open'));
      if (!isOpen) {
        groupWrap.classList.add('open');
      }
    });

    groupWrap.appendChild(groupLabel);
    groupWrap.appendChild(groupMenu);
    linkContainer.appendChild(groupWrap);
  });

  const themeToggle = document.createElement('button');
  themeToggle.className = 'theme-toggle';
  themeToggle.type = 'button';
  themeToggle.setAttribute('aria-label', 'Switch color theme');
  themeToggle.addEventListener('click', (event) => {
    event.stopPropagation();
    const nextTheme = document.documentElement.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
    setTheme(nextTheme);
  });
  linkContainer.appendChild(themeToggle);

  document.addEventListener('click', (event) => {
    if (!event.target.closest('.nav-group')) {
      document.querySelectorAll('.nav-group.open').forEach((item) => item.classList.remove('open'));
    }
  });

  const body = document.body;
  if (body) {
    body.insertBefore(nav, body.firstChild);
  }

  try {
    const storedTheme = localStorage.getItem('theme');
    setTheme(storedTheme || 'dark');
  } catch (error) {
    setTheme('dark');
  }
}

if (document.head) {
  injectSeoMetadata();
}

if (document.body) {
  buildNav();
} else {
  document.addEventListener('DOMContentLoaded', () => {
    injectSeoMetadata();
    buildNav();
  });
}
