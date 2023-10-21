export function setSearchedPeople(state, people) {
  state.searchedPeople = people || []
}

export function setSearchedProducts(state, products) {
  state.searchedProducts = products || []
}

export function setSearchedOrders(state, orders) {
  state.searchedOrders = orders || []
}

export function deletePerson(state, id) {
  state.searchedPeople = state.searchedPeople.filter(person => person.id !== id)
}

export function deleteProduct(state, id) {
  state.searchedProducts = state.searchedProducts.filter(product => product.id !== id)
}

export function addPerson(state, person) {
  state.searchedPeople.push(person)
}

export function addProduct(state, product) {
  state.searchedProducts.push(product)
}

export function editPerson(state, person) {
  const index = state.searchedPeople.findIndex(p => p.id === person.id)
  state.searchedPeople.splice(index, 1, person)
}

export function editProduct(state, product) {
  const index = state.searchedProducts.findIndex(p => p.id === product.id)
  state.searchedProducts.splice(index, 1, product)
}