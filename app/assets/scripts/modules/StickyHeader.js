class StickyHeader {
    constructor() {
        this.siteHeader = document.querySelector('.site-header');
        this.largeHero = document.querySelector('.large-hero');
        this.pageSections = document.querySelectorAll('.page-section');
        this.headerOpacityObserver();
        this.pageSectionObserver();
    }

    headerOpacityObserver() {
        const callback = (entries, observer) => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) {
                    this.siteHeader.classList.add('site-header--dark')
                } else {
                    this.siteHeader.classList.remove('site-header--dark')
                }
            })
        }
        const options = { threshold: .5 };
        const observer = new IntersectionObserver(callback, options);
        observer.observe(this.largeHero);
    }

    pageSectionObserver() {
        const callback = (entries, observer) =>  {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    let prevSection = document.querySelector('.current-link');
                    if (prevSection) {
                        prevSection.classList.remove('current-link')
                    }
                    let matchingLink = entry.target.dataset.matchingLink;
                    document.querySelector(matchingLink).classList.add('current-link');
                }
            })
        }
        const options = { rootMargin: "-45% 0px -45% 0px" };
        const observer = new IntersectionObserver(callback, options);
        this.pageSections.forEach(pageSection => observer.observe(pageSection))
    }
}

export default StickyHeader;