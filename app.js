// Interactive Logic for Bitrix24 VibeCode Showcase
document.addEventListener('DOMContentLoaded', () => {
  // Mobile Sidebar Toggle
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const sidebar = document.getElementById('sidebar');

  if (mobileMenuBtn && sidebar) {
    mobileMenuBtn.addEventListener('click', () => {
      sidebar.classList.toggle('mobile-open');
    });

    // Close mobile menu on clicking nav link
    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        if (window.innerWidth <= 1024) {
          sidebar.classList.remove('mobile-open');
        }
      });
    });
  }

  // Accordion Expand / Collapse Logic
  const accordionHeaders = document.querySelectorAll('.accordion-header');

  accordionHeaders.forEach(header => {
    header.addEventListener('click', (e) => {
      const item = header.closest('.accordion-item');
      if (!item) return;

      const isActive = item.classList.contains('active');

      // Optional: Close other accordions in the same group if desired
      // For showcase flexibility, we allow multiple open accordions
      
      item.classList.toggle('active');
    });
  });

  // Global Expand / Collapse Controls
  const expandAllBtn = document.getElementById('expandAllBtn');
  const collapseAllBtn = document.getElementById('collapseAllBtn');

  if (expandAllBtn) {
    expandAllBtn.addEventListener('click', () => {
      document.querySelectorAll('.accordion-item').forEach(item => {
        item.classList.add('active');
      });
    });
  }

  if (collapseAllBtn) {
    collapseAllBtn.addEventListener('click', () => {
      document.querySelectorAll('.accordion-item').forEach(item => {
        item.classList.remove('active');
      });
    });
  }

  // Live Instant Search Filter
  const searchInput = document.getElementById('searchInput');
  const allAccordionItems = document.querySelectorAll('.accordion-item');
  const categorySections = document.querySelectorAll('.category-section');

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      const query = e.target.value.trim().toLowerCase();

      let visibleCount = 0;

      allAccordionItems.forEach(item => {
        const text = item.textContent.toLowerCase();
        const matches = text.includes(query);

        if (matches) {
          item.style.display = '';
          visibleCount++;
          // Auto-expand items if query is entered
          if (query.length > 1) {
            item.classList.add('active');
          }
        } else {
          item.style.display = 'none';
        }
      });

      // Hide category sections that have zero visible items
      categorySections.forEach(section => {
        const visibleChildItems = section.querySelectorAll('.accordion-item:not([style*="display: none"])');
        if (visibleChildItems.length === 0) {
          section.style.display = 'none';
        } else {
          section.style.display = '';
        }
      });

      // Update visible count stat if exists
      const totalCountElem = document.getElementById('totalCasesCount');
      if (totalCountElem) {
        totalCountElem.textContent = query ? visibleCount : allAccordionItems.length;
      }
    });
  }

  // Smooth Scroll Highlight for Active Nav Link
  const navLinks = document.querySelectorAll('.nav-link');
  
  window.addEventListener('scroll', () => {
    let currentCategory = '';

    categorySections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      if (window.scrollY >= sectionTop) {
        currentCategory = section.getAttribute('id');
      }
    });

    if (currentCategory) {
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentCategory}`) {
          link.classList.add('active');
        }
      });
    }
  });
});
