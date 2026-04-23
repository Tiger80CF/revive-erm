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
        { href: 'index.html#services', label: 'Services',          key: 'services' },
        { href: 'right-brained-risk.html', label: 'Right-Brained Risk', key: 'rbr' },
        { href: 'insights.html',       label: 'Insights',          key: 'insights' },
        { href: 'about.html',          label: 'About',             key: 'about'    },
        { href: 'index.html#contact',  label: 'Contact',           key: 'contact'  },
    ];

    const li = links.map(l =>
        `<li><a href="${l.href}"${currentPage === l.key ? ' class="active"' : ''}>${l.label}</a></li>`
    ).join('\n            ');

    const html = `
    <nav id="nav">
        <a href="index.html" class="nav-brand">
            <img src="logo.png" alt="Revive ERM" class="nav-logo">
        </a>
        <ul class="nav-links" id="navLinks">
            ${li}
        </ul>
        <div class="nav-toggle" id="navToggle" onclick="toggleNav()">
            <span></span><span></span><span></span>
        </div>
    </nav>`;

    document.body.insertAdjacentHTML('afterbegin', html);

    // Scroll shadow
    window.addEventListener('scroll', () => {
        document.getElementById('nav').classList.toggle('scrolled', window.scrollY > 20);
    });
})();

function toggleNav() {
    document.getElementById('navLinks').classList.toggle('active');
}

// Close mobile nav on link click
document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            document.getElementById('navLinks').classList.remove('active');
        });
    });
});
