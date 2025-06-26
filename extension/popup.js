// Minimal popup.js with backend status checking

const postsCleanedCount = document.getElementById('postsCleanedCount');
const settingsToggle = document.getElementById('settingsToggle');
const settingsPanel = document.getElementById('settingsPanel');
const closeSettings = document.getElementById('closeSettings');
const statusDot = document.getElementById('statusDot');
const statusText = document.getElementById('statusText');
const serverDetails = document.getElementById('serverDetails');

// Settings panel toggle
settingsToggle.addEventListener('click', () => {
    settingsPanel.classList.add('active');
    checkBackendStatus(); // Check status when settings open
});

closeSettings.addEventListener('click', () => {
    settingsPanel.classList.remove('active');
});

// Check backend server status
async function checkBackendStatus() {
    try {
        const response = await fetch('https://luzz-backend-production.up.railway.app/health', {
            method: 'GET',
            timeout: 5000
        });

        if (response.ok) {
            const data = await response.json();

            // Server is online
            statusDot.className = 'status-dot';
            statusText.textContent = 'Connected';

            if (data.apiKeys) {
                serverDetails.textContent = `Using ${data.apiKeys.current}/${data.apiKeys.total} API keys • ${data.rateLimit.remainingBatches} batches available`;
            } else {
                serverDetails.textContent = `${data.rateLimit.remainingBatches}/${data.rateLimit.maxBatchesPerMinute} batches available`;
            }
        } else {
            throw new Error('Server error');
        }

    } catch (error) {
        // Server is offline
        statusDot.className = 'status-dot offline';
        statusText.textContent = 'Offline';
        serverDetails.textContent = 'Cannot connect to processing server';
    }
}

// Load and update post count
function updatePostCount() {
    chrome.storage.local.get(['postsCleanedTotal'], (data) => {
        const total = data.postsCleanedTotal || 0;
        postsCleanedCount.textContent = total;
    });
}

// Update count when popup opens
document.addEventListener('DOMContentLoaded', () => {
    updatePostCount();
});

// Listen for updates from content script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === 'postCleaned') {
        updatePostCount();
    }
});