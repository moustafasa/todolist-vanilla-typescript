import Item from "./item";

export interface listItem {
  items: Item[];
  load(): void;
  save(): void;
  addItem(item: Item): void;
  clearList(): void;
  removeItem(id: string): void;
}

export default class ListItem implements listItem {
  static instance = new ListItem();
  private constructor(private _items: Item[] = []) {}
  clearList(): void {
    this._items = [];
    this.save();
  }
  removeItem(id: string): void {
    this._items = this._items.filter((item) => item.id !== id);
    this.save();
  }
  load(): void {
    const storedList: string | null = localStorage.getItem("mylist");

    if (!storedList) return;

    const parsedItems: { _id: string; _label: string; _checked: boolean }[] =
      JSON.parse(storedList);

    parsedItems.forEach((item) => {
      const itemObj = new Item(item._label, item._checked, item._id);
      ListItem.instance.addItem(itemObj);
    });
  }

  save(): void {
    localStorage.setItem("mylist", JSON.stringify(this._items));
  }
  addItem(item: Item): void {
    this._items.push(item);
    this.save();
  }

  get items(): Item[] {
    return this._items;
  }
}
