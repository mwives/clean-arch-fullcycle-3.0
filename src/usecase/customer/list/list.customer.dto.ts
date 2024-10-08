export type InputListCustomerDto = {}

type Customer = {
  id: string
  name: string
  address: {
    street: string
    number: number
    zip: string
    city: string
  }
}

export type OutputListCustomerDto = {
  customers: Customer[]
}
