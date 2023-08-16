import { Todo } from '@prisma/client'

export interface ITodoRepository {
  create(
    input: ITodoRepository.CreateTodoInput
  ): ITodoRepository.CreateTodoOutput

  findById(input: ITodoRepository.FindByIdInput): ITodoRepository.FindByIdOutput

  getAll(input: ITodoRepository.GetAllInput): ITodoRepository.GetAllOutput
}

export namespace ITodoRepository {
  export type CreateTodoInput = { name: string; description: string }
  export type CreateTodoOutput = Promise<Todo>

  export type FindByIdInput = { id: string }
  export type FindByIdOutput = Promise<Todo | null>

  export type GetAllInput = {
    cursor?: string
    count?: number
  }
  export type GetAllOutput = Promise<Todo[]>
}
