import * as domFunctions from './domFunctions.js';

const onPageLoad = (() => {
    const buildPageLayout = () => {
        domFunctions.createIninitalPageStructure();
        domFunctions.createTaskListStructure();
    }
    return {
        buildPageLayout,
    }
})();

export {onPageLoad};