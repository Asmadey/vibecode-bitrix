// Interactive logic for the Bitrix24 VibeCode showcase
document.addEventListener('DOMContentLoaded', () => {
  const sidebar = document.getElementById('sidebar');
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const navLinks = document.querySelectorAll('.nav-link');
  const accordionItems = document.querySelectorAll('.accordion-item');
  const categorySections = document.querySelectorAll('.category-section');

  // Mobile sidebar: the button reports its state and its label follows it
  function setMenuOpen(open) {
    sidebar.classList.toggle('mobile-open', open);
    mobileMenuBtn.setAttribute('aria-expanded', String(open));
    mobileMenuBtn.setAttribute('aria-label', open ? 'Закрыть меню' : 'Открыть меню');
  }

  if (mobileMenuBtn && sidebar) {
    mobileMenuBtn.addEventListener('click', () => {
      setMenuOpen(!sidebar.classList.contains('mobile-open'));
    });

    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        if (window.innerWidth <= 1024) {
          setMenuOpen(false);
        }
      });
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && sidebar.classList.contains('mobile-open')) {
        setMenuOpen(false);
        mobileMenuBtn.focus();
      }
    });
  }

  // Accordion: the header is a native button, so Enter and Space already work
  function setOpen(item, open) {
    item.classList.toggle('active', open);
    const header = item.querySelector('.accordion-header');
    if (header) header.setAttribute('aria-expanded', String(open));
  }

  accordionItems.forEach(item => {
    const header = item.querySelector('.accordion-header');
    if (!header) return;

    header.addEventListener('click', () => {
      setOpen(item, !item.classList.contains('active'));
    });
  });

  // Expand / collapse all
  const expandAllBtn = document.getElementById('expandAllBtn');
  const collapseAllBtn = document.getElementById('collapseAllBtn');

  if (expandAllBtn) {
    expandAllBtn.addEventListener('click', () => {
      accordionItems.forEach(item => setOpen(item, true));
    });
  }

  if (collapseAllBtn) {
    collapseAllBtn.addEventListener('click', () => {
      accordionItems.forEach(item => setOpen(item, false));
    });
  }

  // Live search by title, author and description
  const searchInput = document.getElementById('searchInput');
  const searchClear = document.getElementById('searchClear');
  const totalCountElem = document.getElementById('totalCasesCount');
  const emptyState = document.getElementById('emptyState');
  const emptyQuery = document.getElementById('emptyQuery');
  const emptyReset = document.getElementById('emptyReset');

  function clearSearch() {
    searchInput.value = '';
    runSearch();
    searchInput.focus();
  }

  function runSearch() {
    const raw = searchInput.value.trim();
    const query = raw.toLowerCase();
    let visibleCount = 0;

    accordionItems.forEach(item => {
      const matches = item.textContent.toLowerCase().includes(query);
      item.style.display = matches ? '' : 'none';

      if (matches) {
        visibleCount++;
        if (query.length > 1) setOpen(item, true);
      }
    });

    categorySections.forEach(section => {
      const visible = section.querySelectorAll('.accordion-item:not([style*="display: none"])');
      section.style.display = visible.length === 0 ? 'none' : '';
    });

    if (totalCountElem) {
      totalCountElem.textContent = query ? visibleCount : accordionItems.length;
    }

    if (emptyState) {
      emptyQuery.textContent = raw;
      emptyState.hidden = visibleCount > 0 || query === '';
    }

    if (searchClear) {
      searchClear.hidden = searchInput.value === '';
    }
  }

  if (searchInput) {
    searchInput.addEventListener('input', runSearch);

    if (searchClear) searchClear.addEventListener('click', clearSearch);
    if (emptyReset) emptyReset.addEventListener('click', clearSearch);

    document.addEventListener('keydown', (e) => {
      const tag = document.activeElement.tagName;
      const typing = tag === 'INPUT' || tag === 'TEXTAREA';

      // "/" focuses the search from anywhere, as in most documentation sites
      if (e.key === '/' && !typing && !e.ctrlKey && !e.metaKey) {
        e.preventDefault();
        searchInput.focus();
      }

      if (e.key === 'Escape' && document.activeElement === searchInput && searchInput.value) {
        clearSearch();
      }
    });
  }

  // The banner asks for a booking window; this page has none, so the click opens the advertiser's site
  window.addEventListener('message', (e) => {
    if (e.origin !== location.origin || e.data !== 'openBooking') return;
    window.open('https://proshinsky.com', '_blank', 'noopener');
  });

  // Highlight the nav link of the category currently on screen (at most once per frame)
  function highlightNav() {
    let currentCategory = '';

    categorySections.forEach(section => {
      if (window.scrollY >= section.offsetTop - 120) {
        currentCategory = section.getAttribute('id');
      }
    });

    if (currentCategory) {
      navLinks.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === `#${currentCategory}`);
      });
    }
  }

  let scrollQueued = false;
  window.addEventListener('scroll', () => {
    if (scrollQueued) return;
    scrollQueued = true;
    requestAnimationFrame(() => {
      scrollQueued = false;
      highlightNav();
    });
  }, { passive: true });
});
