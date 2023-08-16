import { TodoInMemoryRepository } from './todo.inmemoryrepository'

export const makeTodoServiceDeps = () => {
  const repository = new TodoInMemoryRepository()

  return {
    repository,
  }
}
