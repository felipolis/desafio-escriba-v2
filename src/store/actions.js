import axios from 'axios'

export function searchPeople({ commit }, keyword='') {
  axios.get('http://localhost:3000/pessoas')
      .then(({ data }) => {
          if (keyword){
              const people = data.filter(people => people.nome.toLowerCase().includes(keyword.toLowerCase()))
              commit('setSearchedPeople', people)
          } else {
              commit('setSearchedPeople', data)
          }
      })
}

export function searchProducts({ commit }, keyword='') {
  axios.get('http://localhost:3000/produtos')
      .then(({ data }) => {
          if (keyword){
              const products = data.filter(product => product.descricao.toLowerCase().includes(keyword.toLowerCase()))
              commit('setSearchedProducts', products)
          } else {
              commit('setSearchedProducts', data)
          }
      })
}

export function searchOrders({ commit }, keyword='') {
  axios.get('http://localhost:3000/pedidos')
      .then(({ data }) => {
          if (keyword){
              const orders = data.filter(order => order.cliente.nome.toLowerCase().includes(keyword.toLowerCase()))
              commit('setSearchedOrders', orders)
          } else {
              commit('setSearchedOrders', data)
          }
      })
}
