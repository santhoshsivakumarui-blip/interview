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
      { href: 'polyfills-guide.html', label: 'Polyfills' },
      { href: 'array-object-operations-guide.html', label: 'Array & Object Ops' }
    ]
  },
  {
    title: 'Web Performance',
    pages: [
      { href: 'webworkers-animation.html', label: 'Web Workers' },
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

    groupWrap.appendChild(groupLabel);
    groupWrap.appendChild(groupMenu);
    linkContainer.appendChild(groupWrap);
  });

  const body = document.body;
  if (body) {
    body.insertBefore(nav, body.firstChild);
  }
}

if (document.body) {
  buildNav();
} else {
  document.addEventListener('DOMContentLoaded', buildNav);
}
