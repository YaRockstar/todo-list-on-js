export class Todo {
  constructor(id, title = '...', isCompleted = false) {
    this.id = id;
    this.title = title;
    this.isCompleted = isCompleted;
  }
}
