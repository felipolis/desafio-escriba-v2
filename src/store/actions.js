import axios from 'axios'

export function searchPeople({ commit }, keyword = '') {
    axios.get('http://localhost:3000/pessoas')
        .then(({ data }) => {
            if (keyword) {
                const people = data.filter(people => people.nome.toLowerCase().includes(keyword.toLowerCase()))
                commit('setSearchedPeople', people)
            } else {
                commit('setSearchedPeople', data)
            }
        })
}

export function searchProducts({ commit }, keyword = '') {
    axios.get('http://localhost:3000/produtos')
        .then(({ data }) => {
            if (keyword) {
                const products = data.filter(product => product.descricao.toLowerCase().includes(keyword.toLowerCase()))
                commit('setSearchedProducts', products)
            } else {
                commit('setSearchedProducts', data)
            }
        })
}

export function searchOrders({ commit }, keyword = '') {
    axios.get('http://localhost:3000/pedidos')
        .then(({ data }) => {
            if (keyword) {
                const orders = data.filter(order => order.cliente.nome.toLowerCase().includes(keyword.toLowerCase()))
                commit('setSearchedOrders', orders)
            } else {
                commit('setSearchedOrders', data)
            }
        })
}


export function deletePerson({ commit }, id) {
    axios.delete(`http://localhost:3000/pessoas/${id}`)
        .then(() => {
            commit('deletePerson', id)
        })
}

export function deleteProduct({ commit }, id) {
    axios.delete(`http://localhost:3000/produtos/${id}`)
        .then(() => {
            commit('deleteProduct', id)
        })
}

export function deleteOrder({ commit }, id) {
    axios.delete(`http://localhost:3000/pedidos/${id}`)
        .then(() => {
            commit('deleteOrder', id)
        })
}

export function addPerson({ commit }, person) {
    axios.post('http://localhost:3000/pessoas', person)
        .then(({ data }) => {
            commit('addPerson', data)
        })
}

export function addProduct({ commit }, product) {
    axios.post('http://localhost:3000/produtos', product)
        .then(({ data }) => {
            commit('addProduct', data)
        })
}

export function addOrder({ commit }, order) {
    axios.post('http://localhost:3000/pedidos', order)
        .then(({ data }) => {
            commit('addOrder', data)
        })
}

export function editPerson({ commit }, person) {
    axios.put(`http://localhost:3000/pessoas/${person.id}`, person)
        .then(() => {
            commit('editPerson', person)
        })
}

export function editProduct({ commit }, product) {
    axios.put(`http://localhost:3000/produtos/${product.id}`, product)
        .then(() => {
            commit('editProduct', product)
        })
}

export function editOrder({ commit }, order) {
    axios.put(`http://localhost:3000/pedidos/${order.id}`, order)
        .then(() => {
            commit('editOrder', order)
        })
}