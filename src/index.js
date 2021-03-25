import * as pageLoad from './pageLoad.js';
import * as toDo from './todoLogic.js'

toDo.buildInbox.create();
pageLoad.onPageLoad.buildPageLayout();
console.log('All Todos:');
console.log(toDo.allTodos.list);
console.log('All Projects:');
console.log(toDo.allProjects.list);


