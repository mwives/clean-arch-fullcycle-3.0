import { CustomerRepositoryInterface } from '@customer/repository/customer-repository.interface'
import {
  InputFindCustomerDto,
  OutputFindCustomerDto,
} from './find.customer.dto'

export class FindCustomerUseCase {
  constructor(private customerRepository: CustomerRepositoryInterface) {}

  async execute(input: InputFindCustomerDto): Promise<OutputFindCustomerDto> {
    const customer = await this.customerRepository.findById(input.id)

    return {
      id: customer.id,
      name: customer.name,
      address: {
        street: customer.address.street,
        number: customer.address.number,
        zipcode: customer.address.zip,
        city: customer.address.city,
      },
    }
  }
}
