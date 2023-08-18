import { TodoRepositoryStub } from '@tests/modules/todo/mocks/todo.repository.stub'
import { TodoService } from '../todo.services'

// let db: Database

// beforeAll(() => {
//   db = getDatabase()
// })

type Sut = {
  sut: TodoService
  // for unit testing, we can stub the repository
  // for integration/e2e we can use the original one
  todoRepository: TodoRepositoryStub
}

const makeSut = (): Sut => {
  const todoRepository = new TodoRepositoryStub()
  const sut = new TodoService({ todoRepository })

  return {
    sut,
    todoRepository,
  }
}

describe('Todo Service', () => {
  it('should create a new todo just fine', async () => {
    const { sut, todoRepository } = makeSut()

    // we can use jest.spyOn to mock the return of the repository
    jest.spyOn(todoRepository, 'create').mockResolvedValueOnce({
      id: 'mocked',
      name: 'mocked',
      description: 'mocked',
      completed: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    })

    const todo = await sut.create({ name: 'Jonathan', description: 'asdsad' })

    console.log({ todo })

    expect(todo.id).toBeDefined()
  })
})
