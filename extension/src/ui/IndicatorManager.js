import { UIHelper } from './UIHelper.js';

export class IndicatorManager {
    addProcessingIndicator(textElement) {
        const container = UIHelper.getPostContainer(textElement);
        if (!container) return;

        this.removeExistingIndicators(container);

        const indicator = document.createElement('div');
        indicator.className = 'luzz-processing-indicator';
        indicator.innerHTML = `
        <div class="luzz-spinner"></div>
        <span>L</span>
    `;

        indicator.style.cssText = `
        position: absolute !important;
        top: 35px !important;
        right: 35px !important;
        background: linear-gradient(135deg, rgba(102, 126, 234, 0.9) 0%, rgba(118, 75, 162, 0.9) 100%) !important;
        color: white !important;
        padding: 6px 10px !important;
        border-radius: 16px !important;
        font-size: 11px !important;
        font-weight: 700 !important;
        z-index: 1000 !important;
        pointer-events: none !important;
        display: flex !important;
        align-items: center !important;
        gap: 4px !important;
        box-shadow: 0 2px 8px rgba(0,0,0,0.2) !important;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif !important;
        backdrop-filter: blur(10px) !important;
        border: 1px solid rgba(255,255,255,0.2) !important;
        min-width: 45px !important;
    `;

        const containerStyle = window.getComputedStyle(container);
        if (containerStyle.position === 'static') {
            container.style.position = 'relative';
        }

        container.appendChild(indicator);
        console.log('[LinkedIn Cleaner] Added minimal processing L indicator');
    }

    addCleanedIndicator(textElement, toggleCallback) {
        const container = UIHelper.getPostContainer(textElement);
        if (!container) return;

        this.removeExistingIndicators(container);

        const indicator = document.createElement('div');
        indicator.className = 'luzz-cleaned-indicator';
        indicator.innerHTML = `
        <span class="luzz-brand">L</span>
        <button class="luzz-toggle">⚪</button>
    `;

        indicator.style.cssText = `
        position: absolute !important;
        top: 35px !important;
        right: 35px !important;
        background: linear-gradient(135deg, rgba(16, 185, 129, 0.9) 0%, rgba(5, 150, 105, 0.9) 100%) !important;
        color: white !important;
        padding: 6px 10px !important;
        border-radius: 16px !important;
        font-size: 11px !important;
        font-weight: 700 !important;
        z-index: 1000 !important;
        cursor: move !important;
        display: flex !important;
        align-items: center !important;
        gap: 6px !important;
        box-shadow: 0 2px 8px rgba(0,0,0,0.2) !important;
        transition: all 0.2s ease !important;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif !important;
        backdrop-filter: blur(10px) !important;
        border: 1px solid rgba(255,255,255,0.2) !important;
        user-select: none !important;
        min-width: 45px !important;
    `;

        const toggleBtn = indicator.querySelector('.luzz-toggle');
        toggleBtn.style.cssText = `
        background: rgba(255,255,255,0.25) !important;
        border: none !important;
        border-radius: 50% !important;
        width: 16px !important;
        height: 16px !important;
        cursor: pointer !important;
        font-size: 8px !important;
        display: flex !important;
        align-items: center !important;
        justify-content: center !important;
        transition: all 0.2s ease !important;
        color: white !important;
    `;

        let isDragging = false;
        let dragOffset = { x: 0, y: 0 };

        indicator.addEventListener('mousedown', (e) => {
            if (e.target === toggleBtn) return;

            isDragging = true;
            const rect = indicator.getBoundingClientRect();
            const containerRect = container.getBoundingClientRect();

            dragOffset.x = e.clientX - rect.left;
            dragOffset.y = e.clientY - rect.top;

            indicator.style.cursor = 'grabbing';
            indicator.style.transform = 'scale(1.1)';
            e.preventDefault();
        });

        document.addEventListener('mousemove', (e) => {
            if (!isDragging) return;

            const containerRect = container.getBoundingClientRect();
            const newX = e.clientX - containerRect.left - dragOffset.x;
            const newY = e.clientY - containerRect.top - dragOffset.y;

            const maxX = containerRect.width - indicator.offsetWidth;
            const maxY = containerRect.height - indicator.offsetHeight;

            const clampedX = Math.max(0, Math.min(newX, maxX));
            const clampedY = Math.max(0, Math.min(newY, maxY));

            indicator.style.left = clampedX + 'px';
            indicator.style.right = 'auto';
            indicator.style.top = clampedY + 'px';
        });

        document.addEventListener('mouseup', () => {
            if (isDragging) {
                isDragging = false;
                indicator.style.cursor = 'move';
                indicator.style.transform = 'scale(1)';
            }
        });

        indicator.addEventListener('mouseenter', () => {
            if (!isDragging) {
                indicator.style.transform = 'scale(1.05)';
                indicator.style.boxShadow = '0 4px 12px rgba(0,0,0,0.3)';
            }
        });

        indicator.addEventListener('mouseleave', () => {
            if (!isDragging) {
                indicator.style.transform = 'scale(1)';
                indicator.style.boxShadow = '0 2px 8px rgba(0,0,0,0.2)';
            }
        });

        toggleBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            e.preventDefault();
            toggleCallback(textElement);
        });

        indicator.addEventListener('click', (e) => {
            if (e.target !== toggleBtn && !isDragging) {

            }
        });

        const containerStyle = window.getComputedStyle(container);
        if (containerStyle.position === 'static') {
            container.style.position = 'relative';
        }

        container.appendChild(indicator);
        console.log('[LinkedIn Cleaner] Added minimal draggable L indicator');
    }

    removeExistingIndicators(container) {
        const indicators = container.querySelectorAll('.luzz-processing-indicator, .luzz-cleaned-indicator');
        indicators.forEach(el => el.remove());
    }

    removeProcessingIndicator(textElement) {
        const container = UIHelper.getPostContainer(textElement);
        if (container) {
            const indicator = container.querySelector('.luzz-processing-indicator');
            if (indicator) indicator.remove();
        }
    }

    removeAllIndicators(textElement) {
        const container = UIHelper.getPostContainer(textElement);
        if (container) {
            this.removeExistingIndicators(container);
        }
    }
}