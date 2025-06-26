export class VisibilityObserver {
    constructor(processor) {
        this.processor = processor;
        this.observer = null;
    }

    setup() {
        this.observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const element = entry.target;
                        this.processor.prioritizeElement(element);
                    }
                });
            },
            {
                rootMargin: '200px',
                threshold: 0.1
            }
        );
    }

    observe(element) {
        if (this.observer) {
            this.observer.observe(element);
        }
    }

    disconnect() {
        if (this.observer) {
            this.observer.disconnect();
        }
    }
}