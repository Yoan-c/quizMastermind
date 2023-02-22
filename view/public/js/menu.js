export const showMenu = () => {
    const showAnimation = 'moveInLeft 1s ease-out forwards';
    const hideAnimation = 'moveInRight 1s ease-out forwards';
    let nav = document.getElementById('nav');
    if (!nav.style.animation) {
        nav.style.animation = showAnimation
    } else {
        if(nav.style.animation.search('moveInRight') >= 0)
            nav.style.animation = showAnimation
        else
            nav.style.animation = hideAnimation
    }
}