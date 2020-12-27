import '../styles/styles.css'
import MobileMenu from './modules/MobileMenu'
import RevealOnScroll from './modules/RevealOnScroll'

new RevealOnScroll('.feature-item');
new RevealOnScroll('.testimonial');
const mobileMenu = new MobileMenu();


if (module.hot) {
    module.hot.accept()
}