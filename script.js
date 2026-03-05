/*
 * JavaScript interactions for the portfolio site.
 *
 * Provides a typewriter‑style animation for the hero section,
 * handles modal popups for experience cards and implements
 * clipboard copying with toast notifications for contact links.
 */

document.addEventListener('DOMContentLoaded', () => {
  /**
   * Typing animation for the hero role descriptions.
   * Loops through a list of phrases, typing each out character by
   * character, pausing, then deleting before moving to the next.
   */
  const roles = ['a AI Engineer', 'a ML Engineer'];
  let roleIndex = 0;
  let charIndex = 0;
  const dynamicTextEl = document.getElementById('dynamic-text');
  const typingSpeed = 120;
  const deletingSpeed = 80;
  const pauseAfterTyping = 2000;

  function typeRole() {
    const currentRole = roles[roleIndex];
    if (charIndex < currentRole.length) {
      dynamicTextEl.textContent += currentRole.charAt(charIndex);
      charIndex++;
      setTimeout(typeRole, typingSpeed);
    } else {
      // Completed typing current role, pause then delete
      setTimeout(deleteRole, pauseAfterTyping);
    }
  }

  function deleteRole() {
    const currentRole = roles[roleIndex];
    if (charIndex > 0) {
      dynamicTextEl.textContent = currentRole.substring(0, charIndex - 1);
      charIndex--;
      setTimeout(deleteRole, deletingSpeed);
    } else {
      // Move to next role and type again
      roleIndex = (roleIndex + 1) % roles.length;
      setTimeout(typeRole, typingSpeed);
    }
  }
  // Initialise typing effect
  typeRole();

  /**
   * Experience card modal handling.
   * Clicking on a card will populate and show the modal with the
   * details stored in data attributes on the card element.
   */
  const cards = document.querySelectorAll('.experience-card');
  const overlay = document.getElementById('overlay');
  const modalRole = document.getElementById('modal-role');
  const modalCompany = document.getElementById('modal-company');
  const modalLocDur = document.getElementById('modal-location-duration');
  const modalDetails = document.getElementById('modal-details');
  const closeModalBtn = document.getElementById('close-modal');

  cards.forEach(card => {
    card.addEventListener('click', () => {
      // Populate modal fields from data attributes
      modalRole.textContent = card.dataset.role;
      modalCompany.textContent = card.dataset.company;
      modalLocDur.textContent = `${card.dataset.location} | ${card.dataset.duration}`;
      // Use innerHTML to render HTML inside data-details safely
      modalDetails.innerHTML = card.dataset.details;
      overlay.classList.remove('hidden');
    });
  });

  // Close modal when clicking the close button
  closeModalBtn.addEventListener('click', () => {
    overlay.classList.add('hidden');
  });
  // Close modal when clicking outside the modal content
  overlay.addEventListener('click', (event) => {
    if (event.target === overlay) {
      overlay.classList.add('hidden');
    }
  });

  /**
   * Copy email to clipboard with feedback toast.
   */
  const emailItem = document.getElementById('email-item');
  const toastEl = document.getElementById('toast');
  if (emailItem) {
    emailItem.addEventListener('click', () => {
      const email = emailItem.dataset.email;
      navigator.clipboard.writeText(email).then(() => {
        showToast('Email copied to clipboard');
      });
    });
  }

  /**
   * Display a toast message at bottom right.
   * @param {string} message
   */
  function showToast(message) {
    toastEl.textContent = message;
    toastEl.classList.add('show');
    // Hide after 2 seconds
    setTimeout(() => {
      toastEl.classList.remove('show');
    }, 2000);
  }
});