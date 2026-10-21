import { renderIcon } from './icons.js';

/**
 * Barra lateral de navegación principal y flyouts desplegables (Lecciones, Componentes, Configuración).
 */
export class Sidebar {
  /**
   * @param {HTMLElement} root - Elemento <nav class="sidebar">.
   * @param {HTMLElement} flyout - Elemento <aside class="flyout">.
   * @param {object} api - Métodos de control provistos por la aplicación.
   */
  constructor(root, flyout, api) {
    this.root = root;
    this.flyout = flyout;
    this.api = api;
    this.open = null;
    this.toggleBtn = root.querySelector('.side-toggle');

    this.toggleBtn?.addEventListener('click', () => {
      this.setExpanded(!root.classList.contains('is-open'));
    });

    for (const btn of root.querySelectorAll('[data-nav]')) {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        this.act(btn.dataset.nav, btn);
      });
    }

    document.addEventListener('pointerdown', (e) => {
      if (this.open && !e.target.closest('.flyout') && !e.target.closest('[data-nav]')) {
        this.close();
      }
    });
  }

  setExpanded(expanded) {
    this.root.classList.toggle('is-open', expanded);
    this.toggleBtn?.setAttribute('aria-expanded', String(expanded));
    this.toggleBtn?.setAttribute('aria-label', expanded ? 'Contraer barra lateral' : 'Expandir barra lateral');
    this.flyout.classList.toggle('beside-open', expanded);
  }

  act(action, navButton) {
    if (action === 'home') {
      this.close();
      this.api.home();
    } else if (action === 'run') {
      this.close();
      this.api.toggleRun();
    } else if (this.open === action) {
      this.close();
    } else {
      this.show(action, navButton);
    }
  }

  setActive(action, isActive) {
    this.root.querySelector(`[data-nav="${action}"]`)?.parentElement?.classList.toggle('is-on', isActive);
  }

  close() {
    if (this.open) {
      this.setActive(this.open, false);
      this.open = null;
      this.flyout.classList.remove('is-open');
    }
  }

  refresh() {
    if (this.open) {
      this.show(this.open, null, true);
    }
  }

  show(kind, navButton, isRefresh = false) {
    if (this.open && this.open !== kind) {
      this.setActive(this.open, false);
    }
    this.open = kind;
    this.setActive(kind, true);

    const f = this.flyout;
    if (navButton) {
      f.style.setProperty('--top', `${Math.max(40, navButton.parentElement.offsetTop - 6)}px`);
    }

    f.dataset.kind = kind;
    const renderFn = this[`render_${kind}`];
    if (renderFn) {
      f.innerHTML = renderFn.call(this);
      this.bind(kind);
    }

    if (!isRefresh) {
      f.classList.remove('is-open');
      void f.offsetWidth;
    }
    f.classList.add('is-open');
  }

  render_lessons() {
    const { lessons, current, done } = this.api.state();
    return `
      <header><h2>Lecciones</h2><span>${done.size}/${lessons.length} completadas</span></header>
      <ol class="fly-list">${lessons
        .map(
          (l, idx) => `
        <li><button data-lesson="${l.id}" class="${l.id === current ? 'is-current' : ''}">
          <span class="fly-num">${done.has(l.id) ? renderIcon('check') : idx + 1}</span>
          <span class="fly-text"><b>${l.title}</b><small>${l.heading}</small></span>
        </button></li>`
        )
        .join('')}</ol>`;
  }

  render_parts() {
    const parts = this.api.parts();
    return `
      <header><h2>Componentes</h2><span>${parts.length} en escena</span></header>
      <ul class="fly-list">${parts
        .map(
          (p, idx) => `
        <li><button data-part="${idx}">
          <span class="fly-num">${renderIcon('focus')}</span>
          <span class="fly-text"><b>${p.name}</b><small>${p.desc ?? ''}</small></span>
        </button></li>`
        )
        .join('')}</ul >`;
  }

  render_settings() {
    const s = this.api.settings();
    const row = (key, title, desc) => `
      <li><label class="switch">
        <span class="fly-text"><b>${title}</b><small>${desc}</small></span>
        <input type="checkbox" data-setting="${key}" ${s[key] ? 'checked' : ''} />
        <span class="switch-track"><span></span></span>
      </label></li>`;

    return `
      <header><h2>Configuración</h2></header>
      <ul class="fly-list">
        <li style="padding: 12px 14px; border-bottom: 1px solid var(--line-soft);">
          <span class="fly-text" style="display:block; margin-bottom:8px;">
            <b>Identidad Visual / Tema</b>
            <small>Selecciona la dirección estética de la interfaz</small>
          </span>
          <select class="theme-select" data-theme-select style="width:100%; padding:8px 10px; border-radius:6px; background:var(--card); color:var(--ink); border:1px solid var(--line); font-family:var(--cond); font-size:14px; cursor:pointer;">
            <option value="laboratorio-calido">1. Laboratorio Cálido (Papel Técnico / Kraft)</option>
            <option value="swiss-blueprint">2. Swiss Blueprint (Plano Técnico Cobalto)</option>
            <option value="nordic-minimal">3. Nordic Minimal (Estudio Blanco y Esmeralda)</option>
          </select>
        </li>
        ${row('labels', 'Etiquetas y llamadas 3D', 'Indicadores sobre pines y componentes')}
        ${row('grid', 'Cuadrícula de suelo', 'Líneas guía tenues debajo de la placa')}
        ${row('autoRotate', 'Rotación automática', 'Giro suave continuo cuando la vista está en reposo')}
        ${row('sound', 'Efectos de audio', 'Permitir que el zumbador emita sonido real por los altavoces')}
        ${row('reducedMotion', 'Reducir animaciones', 'Transiciones directas sin aceleración pesada')}
      </ul>
      <button class="fly-reset" data-reset>Reiniciar progreso</button>`;
  }

  bind(kind) {
    const f = this.flyout;
    if (kind === 'lessons') {
      f.querySelectorAll('[data-lesson]').forEach((btn) => {
        btn.addEventListener('click', () => {
          this.close();
          this.api.selectLesson(btn.dataset.lesson);
        });
      });
    } else if (kind === 'parts') {
      const parts = this.api.parts();
      f.querySelectorAll('[data-part]').forEach((btn) => {
        btn.addEventListener('click', () => {
          const part = parts[Number(btn.dataset.part)];
          if (part) this.api.focusPart(part);
        });
      });
    } else if (kind === 'settings') {
      const themeSelect = f.querySelector('[data-theme-select]');
      if (themeSelect) {
        themeSelect.value = document.documentElement.dataset.theme || 'laboratorio-calido';
        themeSelect.addEventListener('change', (e) => {
          const val = e.target.value;
          document.documentElement.dataset.theme = val;
          localStorage.setItem('ingtelecto:theme', val);
        });
      }

      f.querySelectorAll('[data-setting]').forEach((input) => {
        input.addEventListener('change', () => {
          this.api.setSetting(input.dataset.setting, input.checked);
        });
      });
      f.querySelector('[data-reset]')?.addEventListener('click', () => {
        this.api.resetProgress();
        this.refresh();
      });
    }
  }
}
