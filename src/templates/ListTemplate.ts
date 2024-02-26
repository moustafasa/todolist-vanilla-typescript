import ListItem from "../model/ListItem";

interface listTemplate {
  ul: HTMLUListElement;
  clear(): void;
  render(listItem: ListItem): void;
}

export default class ListTemplate implements listTemplate {
  ul: HTMLUListElement;
  static instance = new ListTemplate();

  private constructor() {
    this.ul = document.getElementById("tasks-list") as HTMLUListElement;
  }
  clear(): void {
    this.ul.innerHTML = "";
  }
  render(listItem: ListItem): void {
    this.clear();
    listItem.items.forEach((item) => {
      // li
      const taskLi = document.createElement("li") as HTMLLIElement;
      taskLi.className =
        "pt-4 d-flex justify-content-between align-items-center gap-3";

      // inputgroup
      const inputGroup = document.createElement("div");
      inputGroup.className = "d-flex align-items-center gap-3 text-capitalize";
      inputGroup.innerHTML = `<label for="item-${item.id}" class="fs-4">${item.label}</label>`;

      // checkInput
      const checkInput = document.createElement("input");
      checkInput.type = "checkbox";
      checkInput.className = "form-check-input p-3";
      checkInput.id = `item-${item.id}`;
      checkInput.addEventListener("change", () => {
        item.checked = !item.checked;
      });
      inputGroup.children[0].before(checkInput);

      // button
      const button = document.createElement("button");
      button.className =
        "delete-btn border px-3 pt-3 border-black btn btn-light d-flex justify-content-center align-items-center fs-4";
      button.innerText = "x";
      button.addEventListener("click", () => {
        listItem.removeItem(item.id);
        this.render(listItem);
      });

      taskLi.append(inputGroup, button);
      this.ul.append(taskLi);
    });
  }
}
