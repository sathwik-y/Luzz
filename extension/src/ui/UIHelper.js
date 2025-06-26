export class UIHelper {
    constructor(processedElements, indicatorManager) {
        this.processedElements = processedElements;
        this.indicatorManager = indicatorManager;
    }

    static getPostContainer(textElement) {
        const selectors = [
            '.feed-shared-update-v2',
            '[data-urn*="activity"]',
            '.fie-impression-container',
            '.occludable-update',
            '.update-components-article'
        ];

        for (const selector of selectors) {
            const container = textElement.closest(selector);
            if (container) {
                console.log(`[LinkedIn Cleaner] Found container: ${selector}`);
                return container;
            }
        }

        let parent = textElement.parentElement;
        while (parent && parent !== document.body) {
            if (parent.offsetHeight > 150 && parent.offsetWidth > 400) {
                console.log('[LinkedIn Cleaner] Using fallback container');
                return parent;
            }
            parent = parent.parentElement;
        }

        console.warn('[LinkedIn Cleaner] No suitable container found');
        return null;
    }

    toggleText(textElement) {
        const data = this.processedElements.get(textElement);
        if (!data) return;

        const isShowingOriginal = data.isShowingOriginal;

        textElement.style.transition = 'opacity 0.2s ease';
        textElement.style.opacity = '0.7';

        setTimeout(() => {
            if (isShowingOriginal) {
                textElement.innerHTML = data.cleanedHTML || data.cleaned;
            } else {
                textElement.innerHTML = data.originalHTML;
            }

            data.isShowingOriginal = !isShowingOriginal;

            const container = UIHelper.getPostContainer(textElement);
            const indicator = container?.querySelector('.luzz-cleaned-indicator');
            const toggleBtn = indicator?.querySelector('.luzz-toggle');

            if (toggleBtn) {
                toggleBtn.textContent = isShowingOriginal ? '⚪' : '🔵';
                toggleBtn.title = isShowingOriginal ? 'Showing cleaned version' : 'Showing original version';
            }

            if (indicator) {
                indicator.style.background = isShowingOriginal
                    ? 'linear-gradient(135deg, #10b981 0%, #059669 100%)'
                    : 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)';
            }

            textElement.style.opacity = '1';
        }, 200);

        console.log(`[LinkedIn Cleaner] Toggled to ${isShowingOriginal ? 'cleaned' : 'original'} version`);
    }
}

export function setupNavbarCollisionDetection() {
    const navbar = document.querySelector('.global-nav') || document.querySelector('[role="banner"]');
    if (!navbar) return;

    const navbarHeight = navbar.offsetHeight || 60;

    function checkBadgeCollisions() {
        const badges = document.querySelectorAll('.luzz-processing-indicator, .luzz-cleaned-indicator');

        badges.forEach(badge => {
            const rect = badge.getBoundingClientRect();
            const isNearNavbar = rect.top < (navbarHeight + 10);

            if (isNearNavbar) {
                badge.style.opacity = '0';
                badge.style.pointerEvents = 'none';
            } else {
                badge.style.opacity = '1';
                badge.style.pointerEvents = 'auto';
            }
        });
    }

    let scrollTimeout;
    window.addEventListener('scroll', () => {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(checkBadgeCollisions, 10);
    });

    setInterval(checkBadgeCollisions, 500);
}