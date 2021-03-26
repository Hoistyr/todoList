import * as pageLoad from './pageLoad.js';
import * as toDo from './todoLogic.js'

toDo.onPageLoad;
pageLoad.onPageLoad.buildPageLayout();
console.log('All Todos:');
console.log(toDo.allTodos.list);
console.log('All Projects:');
console.log(toDo.allProjects.list);


