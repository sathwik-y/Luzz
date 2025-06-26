export class StateManager {
    constructor() {
        this.processedElements = new WeakMap();
    }

    setElementData(element, data) {
        this.processedElements.set(element, data);
    }

    getElementData(element) {
        return this.processedElements.get(element);
    }

    hasElement(element) {
        return this.processedElements.has(element);
    }

    deleteElement(element) {
        this.processedElements.delete(element);
    }

    updateElementData(element, updates) {
        const existing = this.processedElements.get(element);
        if (existing) {
            this.processedElements.set(element, { ...existing, ...updates });
        }
    }

    createElementState(originalText, originalHTML, cleaned, status = 'processing') {
        return {
            originalText,
            originalHTML,
            cleaned,
            cleanedHTML: null,
            isShowingOriginal: false,
            status
        };
    }

    isElementProcessed(element) {
        return this.processedElements.has(element);
    }

    getProcessedElements() {
        return this.processedElements;
    }
}