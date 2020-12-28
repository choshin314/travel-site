import '../styles/styles.css'
import MobileMenu from './modules/MobileMenu'
import RevealOnScroll from './modules/RevealOnScroll'
import StickyHeader from './modules/StickyHeader'

new StickyHeader();
new RevealOnScroll('.feature-item');
new RevealOnScroll('.testimonial');
new MobileMenu();
let modal;

document.querySelectorAll('.open-modal').forEach(el => {
    el.addEventListener('click', e => {
        e.preventDefault();
        if (typeof modal === "undefined") {
            import(/* webpackChunkName: "modal" */ './modules/Modal')
                .then((module) => {
                    modal = new module.default();
                    setTimeout(() => {
                        modal.openTheModal()
                    }, 20)
                })
                .catch(() => console.log('Problem loading modal module'))
        } else {
            modal.openTheModal();
        }
    })
})

if (module.hot) {
    module.hot.accept()
}