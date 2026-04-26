// Site Configuration
const siteConfig = {
    footerTagline: 'Built with lots of café and tokens',
    currentYear: new Date().getFullYear()
};

// Update footer on page load
document.addEventListener('DOMContentLoaded', () => {
    const yearElement = document.getElementById('year');
    if (yearElement) {
        yearElement.textContent = siteConfig.currentYear;
    }

    const footerParagraph = document.querySelector('footer p');
    if (footerParagraph) {
        footerParagraph.textContent = `© ${siteConfig.currentYear} Pham Quoc Buu (Bob). ${siteConfig.footerTagline}`;
    }
});
