// Utility function to navigate to home page sections from other pages
export const navigateToHomeSection = (sectionId) => {
  // If we're already on the home page, just scroll
  if (window.location.pathname === '/') {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  } else {
    // Navigate to home page with hash, will be handled by useEffect
    window.location.href = `/#${sectionId}`;
  }
};
