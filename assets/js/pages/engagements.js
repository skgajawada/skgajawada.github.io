/**
 * Professional Engagements & Certifications Module
 * Path: assets/js/pages/engagements.js
 */

(function () {
  'use strict';

  // 1. Category Themes & Color Configurations
  const CATEGORY_THEMES = Object.freeze({
    sttp: {
      icon: 'fa-graduation-cap',
      title: 'Short Term Courses / STTPs',
      desc: 'Specialized technical training programs and intensive skill workshops.',
      color: '#1d4ed8', // Navy Blue
      bgColor: '#eff6ff',
      borderColor: '#bfdbfe'
    },
    workshops: {
      icon: 'fa-chalkboard-teacher',
      title: 'Workshops / Seminars',
      desc: 'Interactive academic workshops, domain seminars, and collaborative forums.',
      color: '#d97706', // Warm Amber
      bgColor: '#fffbeb',
      borderColor: '#fde68a'
    },
    fdp: {
      icon: 'fa-university',
      title: 'Faculty Development Programs',
      desc: 'Pedagogical training, research methodologies, and faculty orientation.',
      color: '#be123c', // Crimson Red
      bgColor: '#fff1f2',
      borderColor: '#fecdd3'
    },
    webinars: {
      icon: 'fa-laptop-house',
      title: 'Webinars',
      desc: 'Online technical lectures, virtual symposia, and web discourses.',
      color: '#0d9488', // Teal
      bgColor: '#f0fdfa',
      borderColor: '#99f6e4'
    },
    quizzes: {
      icon: 'fa-award',
      title: 'Quizzes',
      desc: 'National-level knowledge evaluations and subject assessments.',
      color: '#6d28d9', // Deep Purple
      bgColor: '#f5f3ff',
      borderColor: '#ddd6fe'
    },
    conferences: {
      icon: 'fa-users',
      title: 'Conferences',
      desc: 'International and national research presentations and proceedings.',
      color: '#047857', // Emerald Green
      bgColor: '#ecfdf5',
      borderColor: '#a7f3d0'
    }
  });

  // 2. Helper Utilities
  const Utils = {
    escapeHTML(str) {
      if (typeof str !== 'string') return str || '';
      return str.replace(/[&<>"']/g, (tag) => {
        const charsToReplace = {
          '&': '&amp;',
          '<': '&lt;',
          '>': '&gt;',
          '"': '&quot;',
          "'": '&#39;'
        };
        return charsToReplace[tag] || tag;
      });
    },

    getTheme(categoryId) {
      return (
        CATEGORY_THEMES[categoryId] || {
          icon: 'fa-certificate',
          title: 'Engagements',
          desc: 'Professional activities and development.',
          color: '#4b5563',
          bgColor: '#f3f4f6',
          borderColor: '#e5e7eb'
        }
      );
    }
  };

  // 3. UI Generator Methods
  const UI = {
    renderCategoryHeader(catKey) {
      const theme = Utils.getTheme(catKey);
      const safeTitle = Utils.escapeHTML(theme.title);
      const safeDesc = Utils.escapeHTML(theme.desc);

      return `
        <div class="category-header d-flex align-items-center gap-3 mb-4 pb-2 border-bottom">
          <div class="category-icon-wrapper rounded-3 d-flex align-items-center justify-content-center"
               style="width: 48px; height: 48px; background-color: ${theme.bgColor}; border: 1px solid ${theme.borderColor}; color: ${theme.color};">
            <i class="fas ${theme.icon} fa-lg"></i>
          </div>
          <div>
            <h3 class="h4 mb-0 font-weight-bold" style="color: ${theme.color};">${safeTitle}</h3>
            <p class="text-muted small mb-0">${safeDesc}</p>
          </div>
        </div>
      `;
    },

    renderEngagementCard(item, catKey) {
      const theme = Utils.getTheme(catKey);

      const title = Utils.escapeHTML(item.title || 'Untitled Engagement');
      const organizer = Utils.escapeHTML(item.organizer || 'Organizing Body N/A');
      const date = Utils.escapeHTML(item.date || '');
      const link = item.certificateUrl || item.link || '#';
      const isExternalLink = link !== '#';

      return `
        <div class="col-12 col-md-6 col-lg-4 mb-4">
          <div class="card h-100 engagement-card shadow-sm border-0 position-relative"
               style="border-top: 4px solid ${theme.color} !important; transition: transform 0.2s ease, box-shadow 0.2s ease;">
            <div class="card-body d-flex flex-column justify-content-between p-4">
              <div>
                <div class="d-flex justify-content-between align-items-start mb-2">
                  <span class="badge rounded-pill px-2 py-1"
                        style="background-color: ${theme.bgColor}; color: ${theme.color}; border: 1px solid ${theme.borderColor}; font-size: 0.75rem;">
                    <i class="fas ${theme.icon} me-1"></i> ${Utils.escapeHTML(catKey.toUpperCase())}
                  </span>
                  ${date ? `<span class="text-muted extra-small"><i class="far fa-calendar-alt me-1"></i>${date}</span>` : ''}
                </div>
                <h5 class="card-title h6 fw-bold text-dark mt-2 mb-2 line-clamp-2">${title}</h5>
                <p class="card-text text-muted small mb-3"><i class="fas fa-sitemap me-1 text-secondary"></i>${organizer}</p>
              </div>

              <div class="pt-2 border-top mt-auto">
                <a href="${Utils.escapeHTML(link)}" 
                   class="engagement-link text-decoration-none fw-semibold small d-inline-flex align-items-center"
                   style="color: ${theme.color};"
                   ${isExternalLink ? 'target="_blank" rel="noopener noreferrer"' : 'role="button"'}>
                  <span>View Details / Certificate</span>
                  <i class="fas ${isExternalLink ? 'fa-external-link-alt' : 'fa-chevron-right'} ms-2" style="font-size: 0.8rem;"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      `;
    },

    renderSection(catKey, items) {
      if (!Array.isArray(items) || items.length === 0) return '';

      const cardsHtml = items.map((item) => this.renderEngagementCard(item, catKey)).join('');

      return `
        <section id="section-${catKey}" class="engagement-category-section mb-5">
          ${this.renderCategoryHeader(catKey)}
          <div class="row g-3">
            ${cardsHtml}
          </div>
        </section>
      `;
    },

    renderEmptyState() {
      return `
        <div class="text-center py-5 my-4">
          <div class="text-muted mb-3">
            <i class="fas fa-folder-open fa-3x"></i>
          </div>
          <h4 class="h5 text-secondary">No engagements found</h4>
          <p class="text-muted small">Check back later for updated activities and certifications.</p>
        </div>
      `;
    }
  };

  // 4. Page Class (Compatible with router.js instantiated via `new EngagementsPage()`)
  class EngagementsPage extends Component {
    constructor() {
      this.title = 'Professional Engagements & Certifications';
    }

    /**
     * Called by router.js to render or mount the page
     * @param {string|HTMLElement} container - Selector string or DOM element
     * @param {Object} dataMap - Key-Value pair of categories and item arrays
     */
    async render(container = '#app', dataMap = {}) {
      const targetEl = typeof container === 'string' ? document.querySelector(container) : container;
      if (!targetEl) return;

      // If data is fetched dynamically via DataManager, retrieve it if not passed
      if (Object.keys(dataMap).length === 0 && window.DataManager && window.DataManager.getEngagements) {
        dataMap = await window.DataManager.getEngagements();
      }

      const categories = Object.keys(CATEGORY_THEMES);
      let fullHtml = '';
      let totalCount = 0;

      categories.forEach((catKey) => {
        const items = dataMap[catKey] || [];
        if (items.length > 0) {
          totalCount += items.length;
          fullHtml += UI.renderSection(catKey, items);
        }
      });

      targetEl.innerHTML = totalCount === 0 ? UI.renderEmptyState() : fullHtml;
      this.attachHoverEffects();
    }

    /**
     * Card hover interaction listeners
     */
    attachHoverEffects() {
      const cards = document.querySelectorAll('.engagement-card');
      cards.forEach((card) => {
        card.addEventListener('mouseenter', () => {
          card.style.transform = 'translateY(-4px)';
          card.style.boxShadow = '0 0.5rem 1rem rgba(0, 0, 0, 0.12)';
        });
        card.addEventListener('mouseleave', () => {
          card.style.transform = 'translateY(0)';
          card.style.boxShadow = '0 0.125rem 0.25rem rgba(0, 0, 0, 0.075)';
        });
      });
    }
  }

  // 5. Expose globally for router.js
  window.EngagementsPage = EngagementsPage;
  window.EngagementsModule = EngagementsPage; // Backward compatibility alias
})();
