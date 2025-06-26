export class APIClient {
    async sendBatchRequest(texts) {
        console.log('[LinkedIn Cleaner] Sending batch:', texts);

        return new Promise((resolve, reject) => {
            if (!chrome?.runtime?.id) {
                reject(new Error('Extension context lost'));
                return;
            }

            const timeout = setTimeout(() => {
                reject(new Error('Request timeout'));
            }, 15000);

            chrome.runtime.sendMessage({
                action: "processBatch",
                texts: texts
            }, (response) => {
                clearTimeout(timeout);

                if (chrome.runtime.lastError) {
                    console.error('[LinkedIn Cleaner] Runtime error:', chrome.runtime.lastError);
                    reject(new Error(chrome.runtime.lastError.message));
                    return;
                }

                console.log('[LinkedIn Cleaner] Background response:', response);
                resolve(response);
            });
        });
    }
}