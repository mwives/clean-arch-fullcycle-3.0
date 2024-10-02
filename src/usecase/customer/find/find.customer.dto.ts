export type InputFindCustomerDto = {
  id: string
}

export type OutputFindCustomerDto = {
  id: string
  name: string
  address: {
    street: string
    number: number
    zipcode: string
    city: string
  }
}
