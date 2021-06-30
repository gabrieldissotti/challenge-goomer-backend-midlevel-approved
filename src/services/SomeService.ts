import SomeRepository from 'src/repositories/SomeRepository'
class SomeService {
  private someRepository;

  constructor () {
    this.someRepository = new SomeRepository()
  }

  public async execute () {
    const something = await this.someRepository.getSomething()

    return something
  }
}

export default SomeService
