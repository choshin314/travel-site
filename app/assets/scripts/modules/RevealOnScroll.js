class RevealOnScroll {
    constructor(targetItems) {
        this.itemsToReveal = document.querySelectorAll(targetItems);
        this.hideInitially();
        this.initObserver();
    }

    initObserver() {
        const options = {
            rootMargin: "-10% 0px -10% 0px"
        }
        const callback = (entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('reveal-item--is-visible');
                    observer.unobserve(entry.target);
                }
            })
        }
        const observer = new IntersectionObserver(callback, options);
        this.itemsToReveal.forEach(item => observer.observe(item))
    }

    hideInitially() {
        this.itemsToReveal.forEach(item => item.classList.add('reveal-item') )
    }
}

export default RevealOnScroll;