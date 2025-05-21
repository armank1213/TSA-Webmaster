"use strict";

document.addEventListener("DOMContentLoaded", function () {
  // Ensure all animation elements are properly initialized
  const fadeInElements = document.querySelectorAll(".fade-in");
  const revealElements = document.querySelectorAll(".reveal-element");

  // Set initial state for fade-in elements if not already set by CSS
  fadeInElements.forEach((element) => {
    // Make sure they start invisible
    element.style.opacity = "0";
    element.style.transform = "translateY(20px)";
    element.style.transition = "opacity 0.8s ease, transform 0.8s ease";
  });

  // Create the observers after ensuring initial states
  setTimeout(() => {
    // Fade-in animation observer
    const fadeObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
            // Once animation is complete, disconnect to prevent flicker on scroll
            fadeObserver.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px",
      }
    );

    // Timeline reveal animation observer
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            // Once animation is complete, disconnect to prevent flicker on scroll
            revealObserver.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px",
      }
    );

    // Start observing elements
    fadeInElements.forEach((element) => {
      fadeObserver.observe(element);
    });

    revealElements.forEach((element) => {
      revealObserver.observe(element);
    });
  }, 100); // Small delay to ensure CSS is applied

  // Image loading optimization
  const images = document.querySelectorAll('img[loading="lazy"]');
  images.forEach((img) => {
    img.addEventListener("load", function () {
      this.classList.add("loaded");
    });
  });
});
