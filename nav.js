/* ============================================================
   Revive ERM — Shared Navigation
   One file. Every page includes it. Edit here to update all.

   To mark a nav item active on a given page, add
   data-nav-active="insights" (or "about", "rbr") to the
   <body> tag of that page.
   ============================================================ */

(function () {
    const currentPage = document.body.dataset.navActive || '';

    const links = [
        { href: 'index.html#services',     label: 'Services',          key: 'services' },
        { href: 'right-brained-risk.html', label: 'Right-Brained Risk', key: 'rbr'     },
        { href: 'insights.html',           label: 'Insights',          key: 'insights' },
        { href: 'about.html',              label: 'About',             key: 'about'    },
        { href: 'index.html#contact',      label: 'Contact',           key: 'contact'  },
    ];

    const li = links.map(l =>
        `<li><a href="${l.href}"${currentPage === l.key ? ' class="active" aria-current="page"' : ''}>${l.label}</a></li>`
    ).join('\n            ');

    const html = `
    <nav id="nav" role="navigation" aria-label="Main navigation">
        <a href="index.html" class="nav-brand" aria-label="Revive ERM — home">
            <img src="logo.png" alt="Revive ERM" class="nav-logo" loading="eager">
        </a>
        <ul class="nav-links" id="navLinks" role="list">
            ${li}
        </ul>
        <button
            class="nav-toggle"
            id="navToggle"
            aria-label="Open navigation menu"
            aria-expanded="false"
            aria-controls="navLinks"
        >
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
        </button>
    </nav>`;

    document.body.insertAdjacentHTML('afterbegin', html);

    // Scroll shadow
    window.addEventListener('scroll', () => {
        document.getElementById('nav').classList.toggle('scrolled', window.scrollY > 20);
    }, { passive: true });

})();

function toggleNav() {
    const navLinks = document.getElementById('navLinks');
    const navToggle = document.getElementById('navToggle');
    const isOpen = navLinks.classList.toggle('active');

    navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    navToggle.setAttribute('aria-label', isOpen ? 'Close navigation menu' : 'Open navigation menu');
}

// Wire up the toggle button (replaces inline onclick — works with CSP)
document.addEventListener('DOMContentLoaded', function () {
    const navToggle = document.getElementById('navToggle');
    if (navToggle) {
        navToggle.addEventListener('click', toggleNav);
    }

    // Close mobile nav on any link click
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            const navLinks = document.getElementById('navLinks');
            const navToggle = document.getElementById('navToggle');
            navLinks.classList.remove('active');
            if (navToggle) {
                navToggle.setAttribute('aria-expanded', 'false');
                navToggle.setAttribute('aria-label', 'Open navigation menu');
            }
        });
    });

    // Close mobile nav on outside click
    document.addEventListener('click', function (e) {
        const nav = document.getElementById('nav');
        const navLinks = document.getElementById('navLinks');
        if (nav && !nav.contains(e.target) && navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            const navToggle = document.getElementById('navToggle');
            if (navToggle) {
                navToggle.setAttribute('aria-expanded', 'false');
                navToggle.setAttribute('aria-label', 'Open navigation menu');
            }
        }
    });

    // Close mobile nav on Escape key
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') {
            const navLinks = document.getElementById('navLinks');
            const navToggle = document.getElementById('navToggle');
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                if (navToggle) {
                    navToggle.setAttribute('aria-expanded', 'false');
                    navToggle.setAttribute('aria-label', 'Open navigation menu');
                    navToggle.focus();
                }
            }
        }
    });
});
