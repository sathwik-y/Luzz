import { debounce } from '../utils/helpers.js';

export function setupMutationObserver(processor) {
    const debouncedScan = debounce(() => processor.scanForPosts(), 300);

    const observer = new MutationObserver((mutations) => {
        if (!chrome?.runtime?.id) {
            console.log('[LinkedIn Cleaner] Extension context lost');
            observer.disconnect();
            return;
        }

        let hasNewContent = false;

        for (const mutation of mutations) {
            if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
                for (const node of mutation.addedNodes) {
                    if (node.nodeType === Node.ELEMENT_NODE) {
                        if (node.matches && node.matches('.break-words') ||
                            node.querySelector && node.querySelector('.break-words') ||
                            node.classList?.contains('feed-shared-update-v2')) {
                            hasNewContent = true;
                            break;
                        }
                    }
                }
            }
            if (hasNewContent) break;
        }

        if (hasNewContent) {
            console.log('[LinkedIn Cleaner] New content detected');
            debouncedScan();
        }
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true,
        attributes: false,
        characterData: false
    });
}