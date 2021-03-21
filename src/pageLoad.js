import * as domFunctions from './domFunctions.js';

const onPageLoad = (() => {
    const buildPageLayout = () => {
        domFunctions.createIninitalPageStructure();
    }
    return {
        buildPageLayout,
    }
})();

export {onPageLoad};