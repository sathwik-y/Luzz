export class TextExtractor {
    extractCleanText(element) {
        const clone = element.cloneNode(true);

        const hashtagElements = clone.querySelectorAll('a[href*="/hashtag/"]');
        hashtagElements.forEach(el => el.remove());

        const walker = document.createTreeWalker(
            clone,
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

        let text = this.htmlToTextWithLineBreaks(clone);

        console.log('[DEBUG] Extracted text with breaks:', text);
        console.log('[DEBUG] Text length:', text.length);
        console.log('[DEBUG] Has line breaks:', text.includes('\n'));

        return text.trim();
    }

    htmlToTextWithLineBreaks(element) {
        const blockElements = element.querySelectorAll('div, p, br, h1, h2, h3, h4, h5, h6');
        blockElements.forEach(el => {
            if (el.tagName === 'BR') {
                el.replaceWith('\n');
            } else {
                if (el.previousSibling) {
                    el.insertAdjacentText('beforebegin', '\n');
                }
            }
        });

        let text = element.textContent || element.innerText || '';

        text = text
            .replace(/\n{3,}/g, '\n\n')
            .replace(/[ \t]+/g, ' ')
            .trim();

        return text;
    }
}