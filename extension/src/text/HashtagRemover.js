import { UIHelper } from '../ui/UIHelper.js';

export class HashtagRemover {
    removeAllHashtagElements(container) {
        const hashtagLinks = container.querySelectorAll('a[href*="/hashtag/"], a[href*="hashtag"]');
        hashtagLinks.forEach(link => link.remove());

        const allElements = container.querySelectorAll('*');
        allElements.forEach(el => {
            if (el.textContent.trim().toLowerCase() === 'hashtag') {
                el.remove();
            }
        });

        const walker = document.createTreeWalker(
            container,
            NodeFilter.SHOW_TEXT,
            null,
            false
        );

        const textNodesToRemove = [];
        let node;
        while (node = walker.nextNode()) {
            if (node.textContent.trim().toLowerCase() === 'hashtag') {
                textNodesToRemove.push(node);
            }
        }
        textNodesToRemove.forEach(node => node.remove());

        const remainingTextNodes = [];
        const walker2 = document.createTreeWalker(
            container,
            NodeFilter.SHOW_TEXT,
            null,
            false
        );

        while (node = walker2.nextNode()) {
            if (node.textContent.includes('#')) {
                remainingTextNodes.push(node);
            }
        }

        remainingTextNodes.forEach(node => {
            node.textContent = node.textContent.replace(/#\w+/g, '').trim();
            if (node.textContent.trim() === '') {
                node.remove();
            }
        });
    }

    removeHashtagElements(textElement) {
        const container = UIHelper.getPostContainer(textElement);
        if (!container) return;

        const hashtagElements = container.querySelectorAll('a[href*="/hashtag/"], a[href*="hashtag"]');
        hashtagElements.forEach(hashtagEl => {
            if (hashtagEl.innerText.startsWith('#') || hashtagEl.href.includes('/hashtag/')) {
                const parent = hashtagEl.parentElement;
                if (parent) {
                    const walker = document.createTreeWalker(
                        parent,
                        NodeFilter.SHOW_TEXT,
                        null,
                        false
                    );

                    const textNodesToRemove = [];
                    let node;
                    while (node = walker.nextNode()) {
                        if (node.textContent.trim() === 'hashtag') {
                            textNodesToRemove.push(node);
                        }
                    }

                    textNodesToRemove.forEach(textNode => textNode.remove());
                }

                hashtagEl.remove();
                console.log('[LinkedIn Cleaner] Removed hashtag element:', hashtagEl.innerText);
            }
        });
    }
}