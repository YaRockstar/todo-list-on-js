export class HTMLService {
  paintTodo(todo) {
    let className = '';
    let checked = '';
    if (todo.isCompleted) {
      className = 'completed';
      checked = 'checked';
    }
    return `
      <li class="todo-list__todo ${className}" data-id="${todo.id}">
        <div class="input-wrap">        
          <input id="checkbox" 
            class="checkbox" 
            type="checkbox" 
            data-type="checkbox" 
            ${checked}/>
          <label for="checkbox" class="title">${todo.title}</label>
        </div>
        <img src="assets/img/delete.png" 
            alt="Удалить" 
            class="remove-btn" 
            data-type="remove-btn"/>
      </li>
    `;
  }

  paintTodoList(todoList = []) {
    if (todoList.length === 0) {
      return `
        <p class="empty-todo-list">
          Здесь будут ваши задачи
        </p>
      `;
    }
    return todoList.map(this.paintTodo).join('');
  }
}
