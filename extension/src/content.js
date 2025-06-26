console.log("[LinkedIn Cleaner] Starting modular content script...");

(async () => {
    try {
        const { InstantPostProcessor } = await import('./core/InstantPostProcessor.js');
        const { setupPostScanning, aggressiveInitialScan } = await import('./observers/PostScanner.js');
        const { setupMutationObserver } = await import('./observers/MutationObserver.js');
        const { injectStyles } = await import('./ui/styles.js');
        const { setupNavbarCollisionDetection } = await import('./ui/UIHelper.js');

        console.log("[LinkedIn Cleaner] All modules loaded successfully");

        const processor = new InstantPostProcessor();

        setupPostScanning(processor);
        setupMutationObserver(processor);
        injectStyles();
        setupNavbarCollisionDetection();

        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => aggressiveInitialScan(processor));
        } else {
            aggressiveInitialScan(processor);
        }

        setInterval(() => {
            if (chrome?.runtime?.id) {
                processor.scanForPosts();
            }
        }, 10000);

        console.log("[LinkedIn Cleaner] Content script loaded and ready! 🚀");
    } catch (error) {
        console.error("[LinkedIn Cleaner] Failed to load modules:", error);
        console.error("Module loading error details:", error.stack);
    }
})();