import { Database } from 'src/infra/database/client'
import { TodoRepository } from '../todo.repository'
import { TodoService } from '../todo.services'

export const makeTodoService = (db: Database) => {
  const repository = new TodoRepository(db)
  const service = new TodoService({ todoRepository: repository })

  return {
    service,
    repository,
  }
}
