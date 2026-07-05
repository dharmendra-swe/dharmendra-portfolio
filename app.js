const resumeLink = 'https://drive.google.com/drive/folders/1rM6Wv2hZxs5wKrRYjK3mJHoiCQEGvVIn?usp=drive_link';

function myMenuFunction() {
    const menu = document.getElementById('myNavMenu');
    const toggle = document.getElementById('menuToggle');
    menu.classList.toggle('responsive');
    const isOpen = menu.classList.contains('responsive');
    toggle.setAttribute('aria-label', isOpen ? 'Close navigation' : 'Open navigation');
    toggle.innerHTML = isOpen ? '<i class="uil uil-times"></i>' : '<i class="uil uil-bars"></i>';
}

function resumeDownload() {
    window.open(resumeLink, '_blank', 'noopener,noreferrer');
}

function hireMe() {
    window.location.href = 'hire-me.html';
}

const header = document.getElementById('header');
const progress = document.getElementById('scrollProgress');
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

function updateScrollUI() {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progressWidth = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    progress.style.width = `${progressWidth}%`;

    header.classList.toggle('shadow-[0_20px_60px_rgba(0,0,0,0.28)]', scrollTop > 40);

    sections.forEach((section) => {
        const top = section.offsetTop - 120;
        const bottom = top + section.offsetHeight;
        const id = section.getAttribute('id');

        if (scrollTop >= top && scrollTop < bottom) {
            navLinks.forEach((link) => {
                link.classList.toggle('active-link', link.getAttribute('href') === `#${id}`);
            });
        }
    });
}

window.addEventListener('scroll', updateScrollUI, { passive: true });
window.addEventListener('load', updateScrollUI);

navLinks.forEach((link) => {
    link.addEventListener('click', () => {
        const menu = document.getElementById('myNavMenu');
        if (menu.classList.contains('responsive')) {
            myMenuFunction();
        }
    });
});

const revealTargets = document.querySelectorAll('.section-shell, .project-card, .skill-card, .service-card, .stat-card, .fade-up');
revealTargets.forEach((target) => target.classList.add('reveal'));

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            revealObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.14
});

revealTargets.forEach((target) => revealObserver.observe(target));

const counters = document.querySelectorAll('[data-count]');
let countersStarted = false;

function animateCounters() {
    if (countersStarted) return;
    countersStarted = true;

    counters.forEach((counter) => {
        const target = Number(counter.dataset.count);
        const isDecimal = !Number.isInteger(target);
        const duration = 1400;
        const start = performance.now();

        function tick(now) {
            const progressValue = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progressValue, 3);
            const value = target * eased;
            counter.textContent = isDecimal ? value.toFixed(1) : Math.round(value);

            if (progressValue < 1) {
                requestAnimationFrame(tick);
            } else {
                counter.textContent = isDecimal ? target.toFixed(1) : target;
            }
        }

        requestAnimationFrame(tick);
    });
}

const statsSection = document.querySelector('.stat-card');
if (statsSection) {
    const statsObserver = new IntersectionObserver((entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
            animateCounters();
            statsObserver.disconnect();
        }
    }, { threshold: 0.4 });

    statsObserver.observe(statsSection);
}

const cursorGlow = document.getElementById('cursorGlow');
window.addEventListener('pointermove', (event) => {
    if (window.matchMedia('(pointer: coarse)').matches) return;
    cursorGlow.style.opacity = '1';
    cursorGlow.style.left = `${event.clientX}px`;
    cursorGlow.style.top = `${event.clientY}px`;
}, { passive: true });

document.getElementById('year').textContent = new Date().getFullYear();
