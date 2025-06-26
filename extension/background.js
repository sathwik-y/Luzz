// Background script for LinkedIn Cleaner
console.log('LinkedIn Cleaner background script loaded');

const SERVER_URL = 'https://luzz-backend-production.up.railway.app';

// Keep service worker alive
let keepAliveInterval;

function keepServiceWorkerAlive() {
    keepAliveInterval = setInterval(() => {
        console.log('Background script keepalive ping');
    }, 20000); // Every 20 seconds
}

// Start keepalive immediately
keepServiceWorkerAlive();

// Message handler
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    console.log('Background received message:', request);

    if (request.action === 'processBatch') {
        handleBatchProcessing(request.texts, sendResponse);
        return true; // Keep message channel open for async response
    }

    // Respond to unknown actions
    sendResponse({ success: false, error: 'Unknown action' });
    return false;
});

async function handleBatchProcessing(texts, sendResponse) {
    console.log(`Background processing batch of ${texts.length} texts`);

    try {
        console.log('Sending request to server:', `${SERVER_URL}/process-batch`);

        const response = await fetch(`${SERVER_URL}/process-batch`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                texts: texts
            })
        });

        if (!response.ok) {
            throw new Error(`Server error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        console.log('Background server response:', data);

        sendResponse(data);

    } catch (error) {
        console.error('Background batch processing error:', error);

        // Send fallback - mark all as NOT_CRINGE so they don't get processed
        const fallbackResults = texts.map(item => ({
            id: item.id,
            cleanText: 'NOT_CRINGE',
            success: false,
            error: error.message
        }));

        sendResponse({
            results: fallbackResults,
            error: error.message,
            batchId: 'error_' + Date.now()
        });
    }
}

// Extension lifecycle handlers
chrome.runtime.onInstalled.addListener((details) => {
    console.log('LinkedIn Cleaner extension installed/updated:', details.reason);
    keepServiceWorkerAlive();
});

chrome.runtime.onStartup.addListener(() => {
    console.log('LinkedIn Cleaner extension started');
    keepServiceWorkerAlive();
});

chrome.runtime.onSuspend.addListener(() => {
    console.log('LinkedIn Cleaner extension suspending');
    if (keepAliveInterval) {
        clearInterval(keepAliveInterval);
    }
});

// Test server connection on startup
setTimeout(async () => {
    try {
        const response = await fetch(`${SERVER_URL}/health`);
        if (response.ok) {
            const data = await response.json();
            console.log('Server health check passed:', data);
        } else {
            console.warn('Server health check failed:', response.status);
        }
    } catch (error) {
        console.warn('Server not accessible:', error.message);
    }
}, 1000);

console.log('Background script setup complete');