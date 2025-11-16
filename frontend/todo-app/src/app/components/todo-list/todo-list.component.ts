import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TodoService } from '../../services/todo.service';
import { Todo, CreateTodoDto } from '../../models/todo.model';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {
  todos: Todo[] = [];
  newTodo: CreateTodoDto = {
    title: '',
    description: '',
    status: ''
  };
  loading = false;
  error: string | null = null;

  constructor(private todoService: TodoService) { }

  ngOnInit(): void {
    this.loadTodos();
  }

  loadTodos(): void {
    this.loading = true;
    this.error = null;
    
    this.todoService.getTodos().subscribe({
      next: (data) => {
        this.todos = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load todos. Please check your connection.';
        this.loading = false;
        console.error('Error loading todos:', err);
      }
    });
  }

  addTodo(): void {
    if (!this.newTodo.title.trim()) {
      return;
    }

    this.loading = true;
    this.error = null;

    const todoToCreate: CreateTodoDto = {
      title: this.newTodo.title,
      description: this.newTodo.description || undefined,
      status: this.newTodo.status || undefined
    };

    this.todoService.createTodo(todoToCreate).subscribe({
      next: (todo) => {
        this.todos.unshift(todo);
        this.resetForm();
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to create todo. Please try again.';
        this.loading = false;
        console.error('Error creating todo:', err);
      }
    });
  }

  resetForm(): void {
    this.newTodo = {
      title: '',
      description: '',
      status: ''
    };
  }

  getStatusClass(status: string | undefined): string {
    if (!status) return 'status-none';
    return `status-${status.toLowerCase()}`;
  }
}
