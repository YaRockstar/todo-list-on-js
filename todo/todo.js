export class Todo {
  constructor(id, title = '...', isCompleted = false) {
    this._id = id;
    this.title = title;
    this.isCompleted = isCompleted;
  }

  get id() {
    return this._id;
  }
}
