export interface TodoRepositoryI {
  createTodo(
    request: TodoRepositoryI.CreateTodoRequest
  ): Promise<TodoRepositoryI.CreateTodoResponse>
}

export namespace TodoRepositoryI {
  export type CreateTodoRequest = {
    name: string
    description: string
  }

  export type CreateTodoResponse = {
    id: string
    name: string
    description: string
    completed: boolean
  }
}
