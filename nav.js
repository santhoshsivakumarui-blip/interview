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
  const current = window.location.pathname.split('/').pop() || 'index.html';
  const nav = document.createElement('nav');
  nav.className = 'site-nav';
  nav.innerHTML = `
    <div class="wrap">
      <a class="site-nav-brand" href="index.html">Interview Hub</a>
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

if (document.body) {
  buildNav();
} else {
  document.addEventListener('DOMContentLoaded', buildNav);
}
