export interface Todo {
  id?: number;
  title: string;
  description?: string;
  status?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface CreateTodoDto {
  title: string;
  description?: string;
  status?: string;
}
