import { Customer } from '@customer/entity/customer'
import { CustomerRepositoryInterface } from '@customer/repository/customer-repository.interface'
import {
  InputListCustomerDto,
  OutputListCustomerDto,
} from './list.customer.dto'

export class ListCustomerUseCase {
  constructor(
    private readonly customerRepository: CustomerRepositoryInterface
  ) {}

  async execute(input: InputListCustomerDto): Promise<OutputListCustomerDto> {
    const customers = await this.customerRepository.findAll()
    return OutputMapper.toDto(customers)
  }
}

class OutputMapper {
  static toDto(customers: Customer[]): OutputListCustomerDto {
    return {
      customers: customers.map((customer) => ({
        id: customer.id,
        name: customer.name,
        address: {
          street: customer.address.street,
          number: customer.address.number,
          zip: customer.address.zip,
          city: customer.address.city,
        },
      })),
    }
  }
}
