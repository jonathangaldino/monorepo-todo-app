import { TodoInMemRepository } from './mocks/todo.repository'

export const makeTodoServiceDeps = () => {
  const repository = new TodoInMemRepository()

  return {
    repository,
  }
}
