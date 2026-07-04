const pages = [
  { href: 'index.html', label: 'Home' },
  { href: 'aws-compute-comparison.html', label: 'AWS Compute' },
  { href: 'aws-deployment-lifecycle.html', label: 'AWS Deployment' },
  { href: 'aws-iam-ec2-security.html', label: 'IAM & EC2' },
  { href: 'js-design-patterns.html', label: 'JS Patterns' },
  { href: 'kafka-mastery-roadmap.html', label: 'Kafka' },
  { href: 'microservice-api-communication.html', label: 'Microservices API' },
  { href: 'microservice_patterns.html', label: 'Microservice Patterns' },
  { href: 'nodejs_event_loop_lifecycle.html', label: 'Node.js Event Loop' },
  { href: 'browser-event-loop.html', label: 'Browser Event Loop' },
  { href: 'webworkers-animation.html', label: 'Web Workers Animation' },
  { href: 'service-workers-animation.html', label: 'Service Workers' },
  { href: 'advanced-javascript-concepts.html', label: 'Advanced JS Concepts' },
  { href: 'project-architecture-guide.html', label: 'Project Architecture' },
  { href: 'polyfills-guide.html', label: 'Polyfills' },
  { href: 'array-object-operations-guide.html', label: 'Array & Object Ops' },
  { href: 'postgres-like-a-pro.html', label: 'Postgres' },
  { href: 'redis-like-a-pro.html', label: 'Redis' },
  { href: 'redux_complete_guide.html', label: 'Redux Guide' },
  { href: 'senior_developer_roadmap.html', label: 'Senior Dev Roadmap' },
  { href: 'system-design-like-a-pro.html', label: 'System Design' }
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
  pages.forEach((page) => {
    const link = document.createElement('a');
    link.href = page.href;
    link.textContent = page.label;
    if (current === page.href || (current === '' && page.href === 'index.html')) {
      link.classList.add('active');
    }
    linkContainer.appendChild(link);
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
