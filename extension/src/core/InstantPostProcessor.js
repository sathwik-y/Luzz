import { TextExtractor } from '../text/TextExtractor.js';
import { TextCleaner } from '../text/TextCleaner.js';
import { HashtagRemover } from '../text/HashtagRemover.js';
import { IndicatorManager } from '../ui/IndicatorManager.js';
import { UIHelper } from '../ui/UIHelper.js';
import { VisibilityObserver } from '../observers/VisibilityObserver.js';
import { APIClient } from '../api/APIClient.js';
import { DOMUtils } from '../utils/DOMUtils.js';
import { BatchManager } from './BatchManager.js';
import { StateManager } from './StateManager.js';

export class InstantPostProcessor {
    constructor() {
        this.stateManager = new StateManager();
        this.batchManager = new BatchManager();

        this.textExtractor = new TextExtractor();
        this.textCleaner = new TextCleaner();
        this.hashtagRemover = new HashtagRemover();
        this.indicatorManager = new IndicatorManager();
        this.uiHelper = new UIHelper(this.stateManager.getProcessedElements(), this.indicatorManager);
        this.apiClient = new APIClient();
        this.domUtils = new DOMUtils();

        this.visibilityObserver = new VisibilityObserver(this);
        this.visibilityObserver.setup();
    }

    get processedElements() {
        return this.stateManager.getProcessedElements();
    }

    extractCleanText(element) {
        return this.textExtractor.extractCleanText(element);
    }

    prioritizeElement(element) {
        const prioritized = this.batchManager.prioritizeElement(element);
        if (prioritized === true) {
            console.log('[LinkedIn Cleaner] Prioritized visible post');
        } else if (prioritized) {
            this.addToQueue(prioritized.element, prioritized.text);
            console.log('[LinkedIn Cleaner] Moved preloaded post to processing queue');
        }
    }

    addToPreloadQueue(element, text) {
        if (this.stateManager.hasElement(element)) return;

        this.batchManager.addToPreload(element, text, Date.now());
        this.visibilityObserver.observe(element);
        console.log(`[LinkedIn Cleaner] Added to preload queue (${this.batchManager.getPreloadQueueLength()})`);
    }

    async processBatch() {
        if (this.batchManager.isProcessing() || !this.batchManager.hasPendingBatches()) return;

        this.batchManager.setProcessing(true);
        const batch = this.batchManager.getBatch();

        console.log(`[LinkedIn Cleaner] Processing batch of ${batch.length} posts`);

        try {
            const response = await this.apiClient.sendBatchRequest(batch.map(item => ({
                text: item.originalText,
                id: item.id
            })));

            if (response && response.results) {
                response.results.forEach(result => {
                    const batchItem = batch.find(item => item.id === result.id);
                    if (batchItem && result.cleanText) {
                        this.applyCleanedText(batchItem.element, batchItem.originalText, result.cleanText);
                    }
                });
            }

        } catch (error) {
            console.error('[LinkedIn Cleaner] Batch processing failed:', error);
            batch.forEach(item => {
                if (document.contains(item.element)) {
                    this.indicatorManager.removeProcessingIndicator(item.element);
                    this.indicatorManager.addCleanedIndicator(item.element, (el) => this.uiHelper.toggleText(el));
                }
            });
        }

        this.batchManager.setProcessing(false);

        if (this.batchManager.hasPendingBatches()) {
            setTimeout(() => this.processBatch(), this.batchManager.getBatchDelay());
        }
    }

    addToQueue(element, text) {
        if (this.stateManager.hasElement(element)) return;

        const cleanedText = this.textExtractor.extractCleanText(element);

        if (cleanedText.length < 50) {
            console.log('[LinkedIn Cleaner] Post too short after hashtag removal, skipping');
            return;
        }

        const id = Math.random().toString(36).substr(2, 9);

        this.applyOptimisticUpdate(element, cleanedText);
        this.batchManager.addToBatch(element, cleanedText, id);

        console.log(`[LinkedIn Cleaner] Added to queue (${this.batchManager.getQueueLength()})`);

        if (!this.batchManager.isProcessing()) {
            setTimeout(() => this.processBatch(), 100);
        }
    }

    applyOptimisticUpdate(element, originalText) {
        const quickClean = this.textCleaner.quickClean(originalText);
        const originalHTML = element.innerHTML;

        element.innerText = quickClean;
        this.indicatorManager.addProcessingIndicator(element);

        const elementState = this.stateManager.createElementState(originalText, originalHTML, quickClean);
        this.stateManager.setElementData(element, elementState);
    }
    incrementPostCount() {
        chrome.storage.local.get(['postsCleanedTotal'], (data) => {
            const currentTotal = data.postsCleanedTotal || 0;
            const newTotal = currentTotal + 1;

            chrome.storage.local.set({ postsCleanedTotal: newTotal }, () => {
                console.log(`[Luzz] Total posts cleaned: ${newTotal}`);

                // Notify popup to update count
                chrome.runtime.sendMessage({
                    action: 'postCleaned',
                    total: newTotal
                });
            });
        });
    }
    applyCleanedText(element, originalText, cleanedText) {
        if (!document.contains(element)) return;

        console.log(`[LinkedIn Cleaner] Applying cleaned text: "${cleanedText.substring(0, 50)}..."`);

        if (cleanedText.trim() === "NOT_CRINGE" || cleanedText.includes("NOT_CRINGE")) {
            const data = this.stateManager.getElementData(element);
            if (data && data.originalHTML) {
                element.innerHTML = data.originalHTML;
            } else {
                element.innerText = originalText;
            }
            this.stateManager.deleteElement(element);
            this.indicatorManager.removeAllIndicators(element);
            console.log('[LinkedIn Cleaner] Post marked as NOT_CRINGE');
            return;
        }
        this.incrementPostCount();
        // element.style.border = '1px solid rgba(138, 43, 226, 0.3)';
        // element.style.borderRadius = '8px';
        // element.style.backgroundColor = 'rgba(138, 43, 226, 0.05)';
        console.log('[Luzz] Post cleaned and counted');
        const finalCleanedText = this.textCleaner.preProcessText(cleanedText);
        const cleanedHTML = this.domUtils.convertTextToLinkedHTML(finalCleanedText, element, this.processedElements);

        this.hashtagRemover.removeHashtagElements(element);

        this.stateManager.updateElementData(element, {
            cleaned: finalCleanedText,
            cleanedHTML: cleanedHTML,
            status: 'completed'
        });

        element.innerHTML = cleanedHTML;
        this.indicatorManager.removeProcessingIndicator(element);
        this.indicatorManager.addCleanedIndicator(element, (el) => this.uiHelper.toggleText(el));
    }
}