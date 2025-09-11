// Utility to clear intro session storage for testing
// Run this in the browser console to reset the intro

if (typeof window !== 'undefined') {
  sessionStorage.removeItem('intro:played');
  console.log('✅ Intro session storage cleared. Refresh the page to see the intro again.');
} else {
  console.log('❌ This script must be run in the browser console.');
}
