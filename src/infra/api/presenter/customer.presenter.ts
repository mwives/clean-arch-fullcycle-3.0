import { OutputListCustomerDto } from '@usecase/customer/list/list.customer.dto'
import { toXML } from 'jstoxml'

export class CustomerPresenter {
  static listXml(data: OutputListCustomerDto): string {
    const xmlOption = {
      header: true,
      indent: '  ',
      newline: '\n',
      allowEmpty: true,
    }

    const customers = data.customers.map((customer) => ({
      id: customer.id,
      name: customer.name,
      address: {
        street: customer.address.street,
        number: customer.address.number,
        zip: customer.address.zip,
        city: customer.address.city,
      },
    }))

    return toXML({ customers }, xmlOption)
  }
}
