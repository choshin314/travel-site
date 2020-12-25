class MobileMenu {
    constructor() {
        this.menuIcon = document.querySelector('.site-header__menu-icon');
        this.menuContent = document.querySelector('.site-header__menu-content');
        this.siteHeader = document.querySelector('.site-header');
        this.events();
    }

    events() {
        this.menuIcon.addEventListener('click', () => this.toggleMenu() );
        //instead of passing 'this.toggleMenu', pass arrow function () => this.toggleMenu()
        //otherwise, 'this' would refer to the selected DOM element
        //because regular event handler functions' 'this' === the event target
    }

    toggleMenu() {
        this.menuContent.classList.toggle('site-header__menu-content--is-visible');
        this.siteHeader.classList.toggle('site-header--is-expanded');
        this.menuIcon.classList.toggle('site-header__menu-icon--close-x');
    }
}

export default MobileMenu;