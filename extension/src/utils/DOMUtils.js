export class DOMUtils {
    convertTextToLinkedHTML(cleanedText, originalElement, processedElements) {
        const data = processedElements.get(originalElement);
        const originalHTML = data ? data.originalHTML : originalElement.innerHTML;

        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = originalHTML;

        const originalLinks = Array.from(tempDiv.querySelectorAll('a')).map(link => {
            if (!link.href.includes('/hashtag/') && !link.innerText.startsWith('#')) {
                return {
                    href: link.href,
                    text: link.innerText,
                    outerHTML: link.outerHTML
                };
            }
            return null;
        }).filter(Boolean);

        let htmlText = cleanedText;

        htmlText = htmlText.replace(/\n/g, '<br>');

        originalLinks.forEach(linkInfo => {
            const linkText = linkInfo.text;
            const linkHTML = linkInfo.outerHTML;

            if (htmlText.includes(linkText)) {
                htmlText = htmlText.replace(linkText, linkHTML);
            }
        });

        return htmlText;
    }
}