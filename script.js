/*
 * Interaction script for the premium portfolio.
 * Handles typing animation, experience modals, mobile menu toggling
 * and email copy-to-clipboard with toast notifications.
 */

document.addEventListener('DOMContentLoaded', () => {
  /* Typing animation for hero role */
  // Roles for the typing animation without leading articles
  const roles = ['AI Engineer', 'ML Engineer'];
  let roleIndex = 0;
  let charIndex = 0;
  const dynamicTextEl = document.getElementById('dynamic-text');
  const typingSpeed = 120;
  const deletingSpeed = 80;
  const pauseAfterTyping = 2000;

  function typeRole() {
    const current = roles[roleIndex];
    if (charIndex < current.length) {
      dynamicTextEl.textContent += current.charAt(charIndex);
      charIndex++;
      setTimeout(typeRole, typingSpeed);
    } else {
      setTimeout(deleteRole, pauseAfterTyping);
    }
  }

  function deleteRole() {
    const current = roles[roleIndex];
    if (charIndex > 0) {
      dynamicTextEl.textContent = current.substring(0, charIndex - 1);
      charIndex--;
      setTimeout(deleteRole, deletingSpeed);
    } else {
      roleIndex = (roleIndex + 1) % roles.length;
      setTimeout(typeRole, typingSpeed);
    }
  }
  // Start the typing loop
  typeRole();

  /* Experience modal handling */
  const cards = document.querySelectorAll('.experience-card');
  const overlay = document.getElementById('overlay');
  const modalRole = document.getElementById('modal-role');
  const modalCompany = document.getElementById('modal-company');
  const modalLocDur = document.getElementById('modal-location-duration');
  const modalDetails = document.getElementById('modal-details');
  const closeModalBtn = document.getElementById('close-modal');

  cards.forEach(card => {
    card.addEventListener('click', () => {
      modalRole.textContent = card.dataset.role;
      modalCompany.textContent = card.dataset.company;
      modalLocDur.textContent = `${card.dataset.location} | ${card.dataset.duration}`;
      modalDetails.innerHTML = card.dataset.details;
      overlay.classList.remove('hidden');
    });
  });
  closeModalBtn.addEventListener('click', () => {
    overlay.classList.add('hidden');
  });
  overlay.addEventListener('click', event => {
    if (event.target === overlay) {
      overlay.classList.add('hidden');
    }
  });

  /* Mobile menu toggle */
  const mobileMenuButton = document.getElementById('mobile-menu-button');
  const mobileMenu = document.getElementById('mobile-menu');
  if (mobileMenuButton && mobileMenu) {
    mobileMenuButton.addEventListener('click', () => {
      mobileMenu.classList.toggle('open');
    });
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.remove('open');
      });
    });
  }

  /* Update active nav item on click */
  const navItems = document.querySelectorAll('.nav-item');
  navItems.forEach(item => {
    item.addEventListener('click', () => {
      navItems.forEach(el => el.classList.remove('active'));
      item.classList.add('active');
    });
  });

  /* Copy email to clipboard */
  const emailItem = document.getElementById('email-item');
  const toast = document.getElementById('toast');
  function showToast(message) {
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 2000);
  }
  if (emailItem) {
    emailItem.addEventListener('click', () => {
      const email = emailItem.dataset.email;
      navigator.clipboard.writeText(email).then(() => {
        showToast('Email copied to clipboard');
      });
    });
  }

  /* Toggle a white background on the sidebar once the user scrolls past the hero section.
     This keeps the sidebar transparent over the hero image but gives it a solid background
     when floating above subsequent sections. */
  const sidebar = document.getElementById('sidebar');
  const heroSection = document.getElementById('hero');
  function updateSidebarBackground() {
    if (!sidebar || !heroSection) return;
    const heroHeight = heroSection.offsetHeight;
    if (window.pageYOffset >= heroHeight) {
      sidebar.classList.add('scrolled');
    } else {
      sidebar.classList.remove('scrolled');
    }
  }
  window.addEventListener('scroll', updateSidebarBackground);
  // Run once on load in case the page is not at the top
  updateSidebarBackground();
});