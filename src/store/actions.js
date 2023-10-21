import axios from 'axios'
import { createToast } from "mosha-vue-toastify";
import "mosha-vue-toastify/dist/style.css";

export function searchPeople({ commit }, keyword = '') {
    axios.get('http://localhost:3000/pessoas')
        .then(({ data }) => {
            if (keyword) {
                const people = data.filter(people => people.nome.toLowerCase().includes(keyword.toLowerCase()))
                commit('setSearchedPeople', people)
            } else {
                commit('setSearchedPeople', data)
            }

            /* createToast("Pessoas carregadas com sucesso!", {
                type: "success",
                position: "top-center",
                timeout: 2000,
              }); */
        })
        /* .catch(err => {
            createToast("Erro ao carregar pessoas!", {
                type: "danger",
                position: "top-center",
                timeout: 2000,
              });
        }) */
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

            /* createToast("Produtos carregados com sucesso!", {
                type: "success",
                position: "top-center",
                timeout: 2000,
              }); */
        })
        /* .catch(err => {
            createToast("Erro ao carregar produtos!", {
                type: "danger",
                position: "top-center",
                timeout: 2000,
              });
        }) */
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

            /* createToast("Pedidos carregados com sucesso!", {
                type: "success",
                position: "top-center",
                timeout: 2000,
              }); */
        })
        /* .catch(err => {
            createToast("Erro ao carregar pedidos!", {
                type: "danger",
                position: "top-center",
                timeout: 2000,
              });
        }) */
}


export function deletePerson({ commit }, id) {
    axios.delete(`http://localhost:3000/pessoas/${id}`)
        .then(() => {
            commit('deletePerson', id)

            createToast("Pessoa deletada com sucesso!", {
                type: "success",
                position: "top-center",
                timeout: 2000,
              });
        })
        .catch(err => {
            createToast("Erro ao deletar pessoa!", {
                type: "danger",
                position: "top-center",
                timeout: 2000,
              });
        })

}

export function deleteProduct({ commit }, id) {
    axios.delete(`http://localhost:3000/produtos/${id}`)
        .then(() => {
            commit('deleteProduct', id)

            createToast("Produto deletado com sucesso!", {
                type: "success",
                position: "top-center",
                timeout: 2000,
              });
        })
        .catch(err => {
            createToast("Erro ao deletar produto!", {
                type: "danger",
                position: "top-center",
                timeout: 2000,
              });
        })
}

export function deleteOrder({ commit }, id) {
    axios.delete(`http://localhost:3000/pedidos/${id}`)
        .then(() => {
            commit('deleteOrder', id)

            createToast("Pedido deletado com sucesso!", {
                type: "success",
                position: "top-center",
                timeout: 2000,
              });
        })
        .catch(err => {
            createToast("Erro ao deletar pedido!", {
                type: "danger",
                position: "top-center",
                timeout: 2000,
              });
        })
}

export function addPerson({ commit }, person) {
    axios.post('http://localhost:3000/pessoas', person)
        .then(({ data }) => {
            commit('addPerson', data)

            createToast("Pessoa adicionada com sucesso!", {
                type: "success",
                position: "top-center",
                timeout: 2000,
              });
        })
        .catch(err => {
            createToast("Erro ao adicionar pessoa!", {
                type: "danger",
                position: "top-center",
                timeout: 2000,
              });
        })
}

export function addProduct({ commit }, product) {
    axios.post('http://localhost:3000/produtos', product)
        .then(({ data }) => {
            commit('addProduct', data)

            createToast("Produto adicionado com sucesso!", {
                type: "success",
                position: "top-center",
                timeout: 2000,
              });
        })
        .catch(err => {
            createToast("Erro ao adicionar produto!", {
                type: "danger",
                position: "top-center",
                timeout: 2000,
              });
        })
}

export function addOrder({ commit }, order) {
    axios.post('http://localhost:3000/pedidos', order)
        .then(({ data }) => {
            commit('addOrder', data)

            createToast("Pedido adicionado com sucesso!", {
                type: "success",
                position: "top-center",
                timeout: 2000,
              });
        })
        .catch(err => {
            createToast("Erro ao adicionar pedido!", {
                type: "danger",
                position: "top-center",
                timeout: 2000,
              });
        })
}

export function editPerson({ commit }, person) {
    axios.put(`http://localhost:3000/pessoas/${person.id}`, person)
        .then(() => {
            commit('editPerson', person)

            createToast("Pessoa editada com sucesso!", {
                type: "success",
                position: "top-center",
                timeout: 2000,
              });
        })
        .catch(err => {
            createToast("Erro ao editar pessoa!", {
                type: "danger",
                position: "top-center",
                timeout: 2000,
              });
        })
}

export function editProduct({ commit }, product) {
    axios.put(`http://localhost:3000/produtos/${product.id}`, product)
        .then(() => {
            commit('editProduct', product)

            createToast("Produto editado com sucesso!", {
                type: "success",
                position: "top-center",
                timeout: 2000,
              });
        })
        .catch(err => {
            createToast("Erro ao editar produto!", {
                type: "danger",
                position: "top-center",
                timeout: 2000,
              });
        })
}

export function editOrder({ commit }, order) {
    axios.put(`http://localhost:3000/pedidos/${order.id}`, order)
        .then(() => {
            commit('editOrder', order)

            createToast("Pedido editado com sucesso!", {
                type: "success",
                position: "top-center",
                timeout: 2000,
              });
        })
        .catch(err => {
            createToast("Erro ao editar pedido!", {
                type: "danger",
                position: "top-center",
                timeout: 2000,
              });
        })
}