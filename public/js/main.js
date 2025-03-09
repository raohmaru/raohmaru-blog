// https://developer.chrome.com/docs/web-platform/view-transitions/same-document
// https://developer.chrome.com/docs/web-platform/view-transitions/cross-document

// When clicking in a post title link, enable a custom page transition 
document.querySelector('.postlist')?.addEventListener?.('click', (e) => {
    if (e.target.classList.contains('postlist-link')) {
        // Clear view-transition-name (it must be unique)
        document.querySelectorAll('.postlist-link').forEach((el) => el.style.viewTransitionName = '');
        e.target.style.viewTransitionName = 'title';
    }
});

window.addEventListener("pagereveal", (e) => {
    if (e.viewTransition) {
        const transitionType = determineTransitionType(navigation.activation.from, navigation.activation.entry);
        // Set transition type used by :active-view-transition-type()
        e.viewTransition.types.add(transitionType);
    }
});

const determineTransitionType = (fromNavigationEntry, toNavigationEntry) => {
    if (fromNavigationEntry.url === toNavigationEntry.url) {
        return "reload";
    } else {
        const currPageIndex = extractPageIndexFromPath(new URL(fromNavigationEntry.url).pathname);
        const destPageIndex = extractPageIndexFromPath(new URL(toNavigationEntry.url).pathname);
        if (currPageIndex > destPageIndex) {
            return 'backwards';
        }
        if (currPageIndex < destPageIndex) {
            return 'forwards';
        }
        return 'unknown';
    }
};

const extractPageIndexFromPath = (path) => {
    return path.split('/').length;
}
