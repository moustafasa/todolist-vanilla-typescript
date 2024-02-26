import "./css/main.scss";
import ListItem from "./model/ListItem";
import Item from "./model/item";
import ListTemplate from "./templates/ListTemplate";

// 1st solution

// interface task {
//   name: string;
//   id: number;
//   taskLi: HTMLLIElement;
//   deleteTask(): void;
//   createTask(): void;
//   selectTask(): void;
// }

// const list = <HTMLUListElement>document.getElementById("tasks-list");

// class Task implements task {
//   id: number = 0;
//   taskLi: HTMLLIElement;

//   static tasksNum: number = 0;
//   static selectedTasks: task[] = [];

//   constructor(public name: string = "") {
//     this.id = Task.tasksNum++;
//     this.taskLi = document.createElement("li");
//     this.taskLi.className =
//       "pt-4 d-flex justify-content-between align-items-center";
//     this.taskLi.innerHTML = `
//       <div class="d-flex align-items-center gap-3 text-capitalize">
//         <input type="checkbox" class="form-check-input p-3" id="item-${this.id}" />
//         <label for="item-${this.id}" class="fs-4">${this.name}</label>
//       </div>
//       <button
//         class="delete-btn border px-3 pt-3 border-black btn btn-light d-flex justify-content-center align-items-center fs-4"
//       >
//         x
//       </button>
//     `;

//     (this.taskLi.querySelector("button") as HTMLButtonElement).addEventListener(
//       "click",
//       () => {
//         this.deleteTask();
//       }
//     );
//     (this.taskLi.querySelector("input") as HTMLInputElement).addEventListener(
//       "change",
//       (e: Event) => {
//         if ((e.target as HTMLInputElement).checked) {
//           this.selectTask();
//         } else {
//           Task.selectedTasks = Task.selectedTasks.filter(
//             (task) => task.id !== this.id
//           );
//         }
//       }
//     );
//   }

//   selectTask(): void {
//     Task.selectedTasks.push(this);
//   }

//   createTask(): void {
//     list.append(this.taskLi);
//   }

//   deleteTask(): void {
//     this.taskLi.remove();
//   }
// }

// const form = <HTMLFormElement>document.forms[0];
// const addBtn = <HTMLButtonElement>form.querySelector("button");
// const clearButton = <HTMLButtonElement>document.getElementById("clear-btn");

// form.taskName.addEventListener("input", (e: InputEvent) => {
//   addBtn.disabled = (e.target as HTMLInputElement).value === "";
// });

// form.addEventListener("submit", (e: SubmitEvent) => {
//   e.preventDefault();
//   if (form.taskName.value) {
//     const task = new Task(form.taskName.value as string);
//     task.createTask();
//     form.taskName.value = "";
//     addBtn.disabled = true;
//   }
// });

// clearButton.addEventListener("click", () => {
//   Task.selectedTasks.forEach((task) => task.deleteTask());
// });

// 2nd solution

const init = (() => {
  ListItem.instance.load();
  ListTemplate.instance.render(ListItem.instance);
  const form = <HTMLFormElement>document.forms[0];
  const addBtn = <HTMLButtonElement>form.querySelector("button");
  const clearButton = <HTMLButtonElement>document.getElementById("clear-btn");

  form.taskName.addEventListener("input", (e: InputEvent) => {
    addBtn.disabled = (e.target as HTMLInputElement).value === "";
  });

  clearButton.addEventListener("click", () => {
    ListItem.instance.clearList();
    ListTemplate.instance.clear();
  });

  form.addEventListener("submit", (e: SubmitEvent) => {
    e.preventDefault();
    console.log("done");
    const inputValue: string = form.taskName.value;
    if (!inputValue) return;
    const item = new Item(inputValue);
    ListItem.instance.addItem(item);
    ListTemplate.instance.render(ListItem.instance);
    form.taskName.value = "";
  });
})();
