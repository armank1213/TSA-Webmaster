"use strict";

// Wait for both DOM and complete page load with all assets
window.addEventListener("load", initAnimations);
document.addEventListener("DOMContentLoaded", initAnimations);

let initialized = false;

function initAnimations() {
  // Prevent double initialization
  if (initialized) return;
  initialized = true;

  console.log("Initializing animations"); // Debug log

  // Force FOUC (Flash of Unstyled Content) fix
  document.body.style.visibility = "visible";

  // Get all animation elements
  const fadeInElements = document.querySelectorAll(".fade-in");
  const revealElements = document.querySelectorAll(".reveal-element");

  console.log(
    `Found ${fadeInElements.length} fade-in elements and ${revealElements.length} reveal elements`
  ); // Debug log

  // Ensure elements are in their initial state
  // This helps overcome any race conditions with CSS loading
  fadeInElements.forEach((element) => {
    element.style.opacity = "0";
    element.style.transform = "translateY(20px)";
    element.style.transition = "opacity 0.8s ease, transform 0.8s ease";
  });

  // Add a class to indicate JS has loaded and processed elements
  document.body.classList.add("js-animations-ready");

  // Function to manually trigger animations for elements in viewport on load
  function triggerInitialAnimations() {
    // For fade-in elements
    fadeInElements.forEach((element) => {
      const rect = element.getBoundingClientRect();
      const isInViewport =
        rect.top <=
          (window.innerHeight || document.documentElement.clientHeight) &&
        rect.bottom >= 0;

      if (isInViewport) {
        console.log("Triggering initial fade-in animation"); // Debug log
        element.style.opacity = "1";
        element.style.transform = "translateY(0)";
      }
    });

    // For reveal elements
    revealElements.forEach((element) => {
      const rect = element.getBoundingClientRect();
      const isInViewport =
        rect.top <=
          (window.innerHeight || document.documentElement.clientHeight) &&
        rect.bottom >= 0;

      if (isInViewport) {
        console.log("Triggering initial reveal animation"); // Debug log
        element.classList.add("visible");
      }
    });
  }

  // Set up observers after a delay to ensure DOM is fully rendered
  setTimeout(() => {
    // Trigger animations for elements already in viewport
    triggerInitialAnimations();

    // Fade-in animation observer for elements that come into view later
    const fadeObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            console.log("Fade observer triggered"); // Debug log
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
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
            console.log("Reveal observer triggered"); // Debug log
            entry.target.classList.add("visible");
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
      // Skip elements that are already animated
      if (element.style.opacity !== "1") {
        fadeObserver.observe(element);
      }
    });

    revealElements.forEach((element) => {
      // Skip elements that are already animated
      if (!element.classList.contains("visible")) {
        revealObserver.observe(element);
      }
    });
  }, 300); // Longer delay for Vercel environment

  // Image loading optimization
  const images = document.querySelectorAll('img[loading="lazy"]');
  images.forEach((img) => {
    // For images that might already be loaded
    if (img.complete) {
      img.classList.add("loaded");
    }

    // For images that load later
    img.addEventListener("load", function () {
      this.classList.add("loaded");
    });
  });

  // Fallback for animations if IntersectionObserver isn't working
  // This can happen in some deployment environments
  window.addEventListener(
    "scroll",
    function () {
      // Only run this fallback if no animations have triggered yet
      if (!document.body.classList.contains("animations-triggered")) {
        const fadeAnimated = Array.from(fadeInElements).some(
          (el) => el.style.opacity === "1"
        );
        const revealAnimated = Array.from(revealElements).some((el) =>
          el.classList.contains("visible")
        );

        if (!fadeAnimated && !revealAnimated) {
          console.log("Triggering fallback animations"); // Debug log
          triggerInitialAnimations();
          document.body.classList.add("animations-triggered");
        }
      }
    },
    { passive: true }
  );
}
