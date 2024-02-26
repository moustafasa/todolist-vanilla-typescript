export interface item {
  readonly id: string;
  label: string;
  checked: boolean;
}

export default class Item implements item {
  static lastId: number = 0;
  constructor(
    private _label: string = "",
    private _checked: boolean = false,
    private _id: string = (++Item.lastId).toString()
  ) {}

  get id(): string {
    return this._id;
  }

  set id(id: string) {
    this._id = id;
  }

  get label(): string {
    return this._label;
  }

  set label(label: string) {
    this._label = label;
  }
  get checked(): boolean {
    return this._checked;
  }

  set checked(checked: boolean) {
    this._checked = checked;
  }
}
