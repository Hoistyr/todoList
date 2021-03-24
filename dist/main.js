(()=>{"use strict";class e{constructor(e){this.projectName=e,this.toDoList=[],this.doneList=[],this.projectID="pID:"+o(16)}}class t{constructor(e,t,n,i){this.title=e||"No title",this.dueDate=t||"none",this.project=n||"Inbox",this.priority=i||"Low",this.todoID="tdID:"+o(16),this.notes="",this.state="notDone"}makeNotes(e){this.notes=e}}const o=e=>{const t="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",o=t.length;let n="";for(let i=1;i<=e;i++)n+=t.charAt(Math.floor(Math.random()*o)),i%4==0&&i!==e&&(n+="-");return n},n=()=>{let o=new e("Inbox");for(let e=0;e<3;e++){const e=new t("Example todo");e.project=o,e.notes="Hello there. General Kenobi, ah what a pleasant surprise. *cough cough*",console.log(o.toDoList),o.toDoList.push(e),d.addNew(e)}i.addNew(o)},i={addNew:e=>{console.log(c.list),0===c.list.filter((t=>t.projectID===e.projectID)).length&&c.list.push(e),console.log(c.list),console.log("-|-add new over-|-")}},d={addNew:e=>{0===r.list.filter((t=>t.todoID===e.todoID)).length&&r.list.push(e)}},c={list:[]},r={list:[]},s=()=>{const e=document.getElementById("sideBarList"),t=document.createElement("h1");t.id="projectListAllToDos",t.classList.add("projectListText","projectListTitle","sideBarList","viewingContent"),t.textContent="All ToDo's",e.appendChild(t);const o=document.createElement("h1");o.id="projectsListTitle",o.classList.add("projectListText","projectListTitle","sideBarList"),o.textContent="> Projects",e.appendChild(o),o.addEventListener("click",p);const n=document.createElement("ul");n.id="projectList",n.classList.add("hidden"),e.appendChild(n),u()},l=()=>{const e=document.getElementById("projectSideList");e.classList.remove("visibleSideBar"),e.classList.add("hiddenSideBar"),console.log("removeeventlistener");const t=document.querySelector(".hamburgerNavIcon");t.removeEventListener("click",l),t.addEventListener("click",a)},a=()=>{const e=document.getElementById("projectSideList");e.classList.remove("hiddenSideBar"),e.classList.add("visibleSideBar");const t=document.querySelector(".hamburgerNavIcon");t.removeEventListener("click",a),t.addEventListener("click",l)},m=()=>{document.getElementById("projectList").classList.add("hidden");const e=document.getElementById("projectsListTitle");e.textContent="> Projects",e.removeEventListener("click",m),e.addEventListener("click",p)},p=()=>{document.getElementById("projectList").classList.remove("hidden");const e=document.getElementById("projectsListTitle");e.textContent="V Projects",e.addEventListener("click",m)},u=()=>{const e=document.querySelector("#projectList");c.list.forEach((t=>{const o=document.createElement("li");o.classList.add("projectListItem"),o.id=`${t.projectID}`,o.textContent=`${t.projectName}`,e.appendChild(o),o.addEventListener("click",I.bind())}));const t=document.createElement("li");t.id="newProjectButtonHolder",e.appendChild(t);const o=document.createElement("div");o.id="newProjectButton",o.innerHTML="<p class='buttonText'>New Project</p>",t.appendChild(o),o.addEventListener("click",v)},v=()=>{const e=document.getElementById("newProjectButtonHolder"),t=document.getElementById("newProjectButton");t.removeEventListener("click",v),t.innerHTML="<p class='buttonText'>Add Project</p>";const o=document.createElement("div");o.id="newProjectCreator",o.innerHTML="<input id='newProjectNameInput' value='Enter project name'></input>",e.insertAdjacentElement("beforebegin",o);const n=document.getElementById("newProjectNameInput");n.addEventListener("focus",y),n.addEventListener("keypress",(e=>{"Enter"===e.key&&""!==n.value&&"Enter project name"!==n.value&&L()})),t.addEventListener("click",L)},L=()=>{const t=h();console.log(t);let o=new e(t);console.log(o),i.addNew(o),E(),u()},E=()=>{const e=document.getElementById("projectList");g(e)},g=e=>{for(;e.firstChild;)e.removeChild(e.firstChild)},y=()=>{const e=document.getElementById("newProjectNameInput");"Enter project name"===e.value&&(console.log("clearing input"),e.value="",e.removeEventListener("focus",y))},h=()=>(console.log("made it"),document.getElementById("newProjectNameInput").value),I=e=>{const t=e.target;console.log(t.textContent),document.getElementById("projectListAllToDos").addEventListener("click",f),j(),k(t),w(),T(t.textContent),M(t.textContent)},C=()=>{const e=document.getElementById("todoListNav"),t=document.createElement("img");t.classList.add("hamburgerNavIcon"),t.src="../src/images/icons/hamburgerNavIcon.svg",e.appendChild(t),t.addEventListener("click",l);const o=document.createElement("h1");o.id="todoListProjectName";const n=document.querySelector(".viewingContent").textContent;o.textContent=n,e.appendChild(o);const i=document.createElement("input");i.id="newTodoInput",i.type="search",i.name="newTodoInput",i.defaultValue="Enter a new ToDo item",e.appendChild(i),i.addEventListener("click",B),i.addEventListener("keyup",S)},j=()=>{document.querySelector(".viewingContent")&&document.querySelector(".viewingContent").classList.remove("viewingContent")},k=e=>{e.classList.add("viewingContent")},w=()=>{const e=document.getElementById("todoListProjectName"),t=document.querySelector(".viewingContent").textContent;e.textContent=t},T=e=>{const t=document.getElementById("newTodoInput"),o=document.querySelector(".viewingContent").textContent;t.defaultValue=`Enter a new ToDo item in ${o}`},B=()=>{const e=document.getElementById("newTodoInput");console.log("clearing input"),e.value="",e.removeEventListener("click",B);const t=document.createElement("div");t.id="inputPageBackground",document.querySelector("#content").appendChild(t),t.addEventListener("click",N)},N=()=>{document.querySelector("#inputPageBackground").remove();const e=document.getElementById("newTodoInput");""===e.value&&(e.value="Enter a new ToDo item",e.addEventListener("click",B))},S=e=>{if("Enter"===e.key&&""!==newTodoInput.value){const e=(()=>{const e=document.getElementById("newTodoInput"),t=e.value;return e.value="",console.log(t),t})();D(e)}},D=e=>{console.log("in addNewToDo");let o=document.querySelector(".viewingContent").textContent;"All ToDo's"===o&&(o="Inbox"),console.log(o),c.list.forEach((n=>{if(n.projectName===o){console.log("in adding to projects");const o=new t(e,"",n);n.toDoList.push(o),d.addNew(o),console.log(c),console.log(r)}}));const n=document.querySelector("#todoListTodosHolder");let i=document.querySelector(".viewingContent").classList;console.log(i),i.contains("projectListItem")?(console.log("projectListItem"),g(n),M(o)):i.contains("sideBarList")&&(console.log("sideBarList"),g(n),x()),console.log(c.list)},f=()=>{const e=document.getElementById("projectListAllToDos");e.removeEventListener("click",f),j(),e.classList.add("viewingContent"),(()=>{const e=document.getElementById("todoListProjectName"),t=document.querySelector(".viewingContent");e.textContent=t.textContent})(),document.getElementById("newTodoInput").defaultValue="Enter a new ToDo item";const t=document.querySelector("#todoListTodosHolder");g(t),x()},x=()=>{c.list.forEach((e=>{if(q(e),0!==e.toDoList.length){const t=document.querySelector(`#${e.projectName}ListDiv`);t.classList.add("projectToDoList"),console.log(t);const o=document.createElement("p");o.textContent=`${e.projectName}`,o.classList.add("projectDivName"),t.appendChild(o),t.insertAdjacentElement("afterbegin",o),o.addEventListener("click",I.bind())}}))},M=e=>{const t=document.querySelector("#todoListTodosHolder");g(t),c.list.filter((t=>t.projectName===e)).forEach((e=>q(e)))},q=e=>{console.log("in buildToDoList");const t=document.querySelector("#todoListTodosHolder"),o=document.createElement("div");o.id=`${e.projectName}ListDiv`,t.appendChild(o);const n=document.createElement("div");n.id=`${e.projectName}ToDoList`,o.appendChild(n),e.toDoList.forEach((t=>P(t,e)))},P=(e,t)=>{const o=document.querySelector(`#${t.projectName}ToDoList`),n=document.createElement("div");n.classList.add("todo",`todoPriority${e.priority}`),n.dataset.todoid=e.todoID;const i=document.createElement("div");i.classList.add("todoMain"),n.appendChild(i);const d=document.createElement("p");d.classList.add("todoText"),d.textContent=e.title,i.appendChild(d),e.dueDate;const c=document.createElement("p");c.textContent="X",c.classList.add("removeX"),n.appendChild(c),c.addEventListener("click",b),o.appendChild(n),i.addEventListener("click",H)},b=e=>{console.log(e)},H=e=>{console.log("made it");let t=(e=>{let t="",o=e.target.parentNode.dataset.todoid;if(void 0===o&&(o=e.target.parentNode.parentNode.dataset.todoid),console.log("id next"),console.log(o),r.list.forEach((e=>{e.todoID===o&&(e=>{t=e})(e)})),""!==t)return t})(e);console.log(t);const o=document.querySelector("#todoInformationHeader");e.target.removeEventListener("click",H);const n=document.createElement("input");n.id="todoInformationTitle",n.type="text",n.defaultValue=t.title,o.appendChild(n);const i=document.querySelector("#todoInformationContent"),d=document.createElement("div");d.id="todoPrioritySelectorDiv",i.appendChild(d),d.innerHTML="<div id='prioritySelectorMarks'>\n        <p id='priorityMark1' class='priorityMark'>!</p>\n        <p id='priorityMark2' class='priorityMark'>!</p>\n        <p id='priorityMark3' class='priorityMark'>!</p>\n    </div>",d.addEventListener("click",A);const c=document.createElement("div");c.id="todoInformationNotes",i.appendChild(c);const s=document.createElement("h1");s.id="todoInformationNotesName",s.textContent="Notes",c.appendChild(s);const l=document.createElement("p");l.id="todoInformationNotesText",l.textContent=t.notes,c.appendChild(l),document.querySelector("#todoInformationFooter")},A=()=>{const e=document.querySelector("#todoPrioritySelectorDiv");console.log("change priority"),e.removeEventListener("click",A),e.addEventListener("click",$),e.classList.add("selectingPriority"),e.innerHTML="<div id='prioritySelectorMarks'>\n        <p id='priorityMark1' class='priorityMark'>!</p>\n        <p id='priorityMark2' class='priorityMark'>!</p>\n        <p id='priorityMark3' class='priorityMark'>!</p>\n    </div>\n    <div id='prioritySelectorChoices'>\n        <p id='priorityNone' class='priorityButton'>None</p>\n        <p id='priorityLow' class='priorityButton'>Low</p>\n        <p id='priorityMedium' class='priorityButton'>Medium</p>\n        <p id='priorityHigh' class='priorityButton'>High</p>\n\n    </div>"},$=()=>{const e=document.querySelector("#todoPrioritySelectorDiv");e.classList.remove("selectingPriority"),e.innerHTML="<div id='prioritySelectorMarks'>\n        <p id='priorityMark1' class='priorityMark'>!</p>\n        <p id='priorityMark2' class='priorityMark'>!</p>\n        <p id='priorityMark3' class='priorityMark'>!</p>\n    </div>",e.addEventListener("click",A)},V=()=>{(()=>{const e=document.querySelector("#content"),t=document.createElement("div");t.id="projectSideList";const o=document.createElement("div");o.id="todoList";const n=document.createElement("div");n.id="todoInformation",e.append(t,o,n),(()=>{const e=document.getElementById("projectSideList"),t=document.createElement("ul");t.id="sideBarList",e.appendChild(t),s()})(),(()=>{const e=document.querySelector("#todoList"),t=document.createElement("div");t.id="todoListNav";const o=document.createElement("div");o.id="todoListTodosHolder",e.append(t,o),C(),f()})(),(()=>{const e=document.querySelector("#todoInformation"),t=document.createElement("div");t.id="todoInformationHeader",e.appendChild(t);const o=document.createElement("div");o.id="todoInformationContent",e.appendChild(o);const n=document.createElement("div");n.id="todoInformationFooter",e.appendChild(n)})()})()};n(),V(),console.log(r.list),console.log(c.list)})();