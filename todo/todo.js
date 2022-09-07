export class Todo {
  constructor(id, text, isCompleted = false, isEdited = false) {
    this.id = id;
    this.text = text;
    this.isCompleted = isCompleted;
    this.isEdited = isEdited;
  }
}
