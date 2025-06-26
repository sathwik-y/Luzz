export class BatchManager {
    constructor() {
        this.batchQueue = [];
        this.preloadQueue = [];
        this.processing = false;
        this.batchSize = 10;
        this.batchDelay = 1500;
    }

    addToBatch(element, originalText, id) {
        this.batchQueue.push({
            element,
            originalText,
            id
        });
    }

    addToPreload(element, text, timestamp) {
        this.preloadQueue.push({
            element,
            text,
            timestamp
        });
    }

    prioritizeElement(element) {
        const queueIndex = this.batchQueue.findIndex(item => item.element === element);
        if (queueIndex > -1) {
            const item = this.batchQueue.splice(queueIndex, 1)[0];
            this.batchQueue.unshift(item);
            return true;
        }

        const preloadIndex = this.preloadQueue.findIndex(item => item.element === element);
        if (preloadIndex > -1) {
            const item = this.preloadQueue.splice(preloadIndex, 1)[0];
            return item;
        }

        return false;
    }

    getBatch() {
        if (this.batchQueue.length === 0) return null;
        return this.batchQueue.splice(0, this.batchSize);
    }

    isProcessing() {
        return this.processing;
    }

    setProcessing(status) {
        this.processing = status;
    }

    hasPendingBatches() {
        return this.batchQueue.length > 0;
    }

    getBatchDelay() {
        return this.batchDelay;
    }

    getQueueLength() {
        return this.batchQueue.length;
    }

    getPreloadQueueLength() {
        return this.preloadQueue.length;
    }
}