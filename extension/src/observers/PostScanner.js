export function setupPostScanning(processor) {
    processor.scanForPosts = function() {
        console.log('[LinkedIn Cleaner] Scanning for posts...');

        const candidates = Array.from(document.querySelectorAll('.break-words'))
            .filter(el => {
                return el.closest('.update-components-text') &&
                    (el.closest('.feed-shared-update-v2') ||
                        el.closest('.fie-impression-container') ||
                        el.closest('[data-urn*="activity"]'));
            })
            .filter(el => {
                const cleanText = processor.extractCleanText(el);
                const isValid = cleanText.length > 50 &&
                    !processor.processedElements.has(el) &&
                    isActualPost(el);

                if (isValid) {
                    console.log(`[LinkedIn Cleaner] Found post: ${cleanText.substring(0, 100)}...`);
                }

                return isValid;
            });

        if (candidates.length > 0) {
            console.log(`[LinkedIn Cleaner] Processing ${candidates.length} new posts`);

            candidates.forEach(el => {
                const cleanText = processor.extractCleanText(el);
                processor.addToQueue(el, cleanText);
            });
        } else {
            console.log('[LinkedIn Cleaner] No new posts found');
        }
    };
}

export function isActualPost(element) {
    const isInFeed = element.closest('.feed-shared-update-v2') ||
        element.closest('[data-urn*="activity"]') ||
        element.closest('.fie-impression-container');

    const isComment = element.closest('.comments-comment-item') ||
        element.closest('.social-details-social-counts') ||
        element.closest('.feed-shared-social-action-bar');

    return isInFeed && !isComment;
}

export function aggressiveInitialScan(processor) {
    console.log("[LinkedIn Cleaner] Starting aggressive preload scan...");

    processor.scanForPosts();
    setTimeout(() => processor.scanForPosts(), 100);
    setTimeout(() => processor.scanForPosts(), 300);
    setTimeout(() => processor.scanForPosts(), 600);
    setTimeout(() => processor.scanForPosts(), 1200);
    setTimeout(() => processor.scanForPosts(), 2500);
}