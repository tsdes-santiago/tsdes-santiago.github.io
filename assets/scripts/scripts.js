/* =========================================================
 * Scripts da página pessoal — tsantiago.dev.br
 * Baseado no projeto PortfolioTransicao (DIO RiHappyFrontEnd)
 * ========================================================= */

const CERT_BASE_URL = 'https://hermes.dio.me/certificates/';
const DATA_URL = './assets/data/courses.json';

/* ---------- Toggle de tema (dark default, com persistência) ---------- */
const toggleTheme = document.getElementById('toggleTheme');
const html = document.querySelector('html');

function applyThemeIcon() {
    const isLight = html.dataset.theme === 'light';
    toggleTheme.classList.toggle('bi-sun', !isLight);
    toggleTheme.classList.toggle('bi-moon-stars', isLight);
}

/* restaura tema salvo ou segue a preferência do sistema */
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    html.dataset.theme = savedTheme;
} else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
    html.dataset.theme = 'light';
}
applyThemeIcon();

toggleTheme.addEventListener('click', () => {
    html.dataset.theme = html.dataset.theme === 'light' ? 'dark' : 'light';
    localStorage.setItem('theme', html.dataset.theme);
    applyThemeIcon();
});

/* ---------- Cursos renderizados dinamicamente ---------- */

function formatDate(iso) {
    const [y, m, d] = iso.split('-');
    const meses = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
        'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
    return `${parseInt(d, 10)} de ${meses[parseInt(m, 10) - 1]} de ${y}`;
}

function addCoursesSection(type, title) {
    return `
    <section class="${type}">
        <h2 class="courses__type">${title}</h2>
    </section>
    `;
}

function addCourse(course, alter_bool) {
    const class_name = alter_bool ? 'course alter' : 'course';
    const certUrl = CERT_BASE_URL + course.code + '.pdf';
    return `
    <div class="${class_name}">
        <h3 class="course__title">${course.title}</h3>
        <div class="course__badges">
            <span class="badge"><i class="bi bi-clock"></i>${course.hours} horas</span>
            <span class="badge"><i class="bi bi-calendar-check"></i>${formatDate(course.date)}</span>
        </div>
        <div class="course__info">
            <figure class="course__figure">
                <a href="${certUrl}" target="_blank" rel="noopener" title="Abrir certificado ${course.code}">
                    <img class="course__img" src="./assets/images/${course.code}.jpg" alt="Certificado ${course.title}" loading="lazy">
                </a>
            </figure>
            <div class="course__body">
                <p class="course__description">${course.description}</p>
                <a class="course__certlink" href="${certUrl}" target="_blank" rel="noopener">
                    <i class="bi bi-patch-check"></i>Ver certificado na DIO
                </a>
            </div>
        </div>
    </div>
    `;
}

/* lê o json e monta as seções (mais recentes primeiro, alternando fundo) */
let counter = 0;

fetch(DATA_URL)
    .then(response => {
        if (!response.ok) throw new Error('Falha ao carregar courses.json');
        return response.json();
    })
    .then((json) => {
        for (const [key, value] of Object.entries(json['courses_types'])) {
            document.querySelector('.courses').innerHTML += addCoursesSection(key, value);
            const courses = (json[key] || [])
                .slice()
                .sort((a, b) => b.date.localeCompare(a.date));
            for (const course of courses) {
                document.querySelector(`.${key}`).innerHTML += addCourse(course, counter % 2);
                counter++;
            }
        }
    })
    .catch(err => {
        console.error(err);
        document.querySelector('.courses').innerHTML =
            '<p style="padding:2rem;">Não foi possível carregar os cursos. Tente recarregar a página.</p>';
    });

/* ---------- Menu ativo ---------- */

function toggleMenu(element) {
    document.querySelectorAll('.menu__link.active').forEach(el => el.classList.remove('active'));
    element.classList.add('active');
}

/* ---------- Ano do rodapé ---------- */
document.getElementById('footerYear').textContent = new Date().getFullYear();
