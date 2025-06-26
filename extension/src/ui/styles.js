export function injectStyles() {
    if (document.querySelector('#luzz-styles')) return;

    const style = document.createElement('style');
    style.id = 'luzz-styles';
    style.textContent = `
        .luzz-spinner {
            width: 12px !important;
            height: 12px !important;
            border: 2px solid rgba(255,255,255,0.3) !important;
            border-top: 2px solid white !important;
            border-radius: 50% !important;
            animation: luzz-spin 1s linear infinite !important;
        }
        @keyframes luzz-spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
    `;

    document.head.appendChild(style);
}