export interface TodoRepositoryI {
  createTodo(
    request: TodoRepositoryI.CreateTodoRequest
  ): Promise<TodoRepositoryI.CreateTodoResponse>

  getAll(): Promise<TodoRepositoryI.GetAllTodosResponse>

  findById(id: string): Promise<TodoRepositoryI.FindByIdResponse>
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

  export type GetAllTodosResponse = {
    id: string
    name: string
    description: string
    completed: boolean
  }[]

  export type FindByIdResponse = {
    id: string
    name: string
    description: string
    completed: boolean
  } | null
}
