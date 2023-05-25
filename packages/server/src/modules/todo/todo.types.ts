export interface TodoRepositoryI {
  createTodo(request: TodoRepositoryI.CreateTodoRequest): TodoRepositoryI.CreateTodoResponse;
}

export namespace TodoRepositoryI {
  export type CreateTodoRequest = {
    name: string;
    description: string;
  }

  export type CreateTodoResponse = Promise<{
    id: string;
    name: string;
    description: string;
    completed: boolean;
  }>
}
