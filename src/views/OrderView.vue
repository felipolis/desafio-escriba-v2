<script setup>
import { computed, onMounted, ref } from "vue";
import SearchBar from "../components/SearchBar.vue";
import store from "../store";
import { createToast } from "mosha-vue-toastify";
import "mosha-vue-toastify/dist/style.css";

// Definindo variáveis reativas
const pedidos = computed(() => store.state.searchedOrders);
const currentOrder = ref({});
const isModalOpen = ref(false);
const modalTitle = ref("");
const successBtnLabel = ref("");
const selectedClient = ref({});
const selectedProduct = ref({});
const selectedQuantity = ref(0);
const selectedItems = ref([]);

// Fetching dos dados dos pedidos ao montar o componente
onMounted(() => {
  store.dispatch("searchOrders");
  store.dispatch("searchPeople");
  store.dispatch("searchProducts");
});

// Abrir o modal de adicionar/editar pedido
const openModal = (mode, pedido = null) => {
  if (mode === "add") {
    modalTitle.value = "Adicionar Pedido";
    successBtnLabel.value = "Adicionar";
    currentOrder.value = {};
  } else if (mode === "edit") {
    modalTitle.value = "Editar Pedido";
    successBtnLabel.value = "Editar";
    currentOrder.value = { ...pedido };
    selectedClient.value = { ...pedido.cliente };
    selectedItems.value = [...pedido.itens];
  }

  isModalOpen.value = true;
};

// Fechar o modal de adicionar/editar pedido
const closeModal = () => {
  isModalOpen.value = false;
  currentOrder.value = {};
  selectedClient.value = {};
  selectedProduct.value = {};
  selectedQuantity.value = 0;
  selectedItems.value = [];
};

// Função para exibir toast
const toast = (title, type) => {
  createToast(title, {
    type: type === "error" ? "danger" : "success",
    position: "top-center",
    timeout: 2000,
  });
};

// Função para adicionar um produto ao pedido
const addProduct = () => {
  if (selectedProduct.value.id === undefined) {
    toast("Selecione um produto", "error");
    return;
  }

  if (selectedQuantity.value === 0) {
    toast("Selecione uma quantidade", "error");
    return;
  }

  const item = {
    id: selectedItems.value.length + 1,
    produto: {
      id: selectedProduct.value.id,
      descricao: selectedProduct.value.descricao,
    },
    valor: selectedProduct.value.valoUnitario,
    quantidade: selectedQuantity.value,
    subtotal: selectedProduct.value.valoUnitario * selectedQuantity.value,
  };

  selectedItems.value.push(item);
};

// Função para adicionar/editar pedido
const onSubmit = () => {
  if (selectedClient.value.id === undefined) {
    toast("Selecione um cliente", "error");
    return;
  }

  if (selectedItems.value.length === 0) {
    toast("Adicione pelo menos um item", "error");
    return;
  }

  if (modalTitle.value === "Adicionar Pedido") {
    const id = Math.max(...store.state.searchedOrders.map((p) => p.id)) + 1;
    const cliente = {
      id: selectedClient.value.id,
      nome: selectedClient.value.nome,
    };

    const pedido = {
      id,
      cliente,
      dataEmissao: new Date().toISOString().slice(0, 10),
      valorTotal: selectedItems.value.reduce(
        (acc, item) => acc + item.valor * item.quantidade,
        0,
      ),
      itens: selectedItems.value,
    };

    store.dispatch("addOrder", pedido);

    closeModal();
  } else if (modalTitle.value === "Editar Pedido") {
    const cliente = {
      id: selectedClient.value.id,
      nome: selectedClient.value.nome,
    };

    const pedido = {
      id: currentOrder.value.id,
      cliente,
      dataEmissao: currentOrder.value.dataEmissao,
      valorTotal: selectedItems.value.reduce(
        (acc, item) => acc + item.valor * item.quantidade,
        0,
      ),
      itens: selectedItems.value,
    };

    store.dispatch("editOrder", pedido);

    closeModal();
  }
};

// Função para deletar pedido
const handleDelete = (pedido) => {
  store.dispatch("deleteOrder", pedido.id);
};
</script>

<template>
  <main class="order-container">
    <!-- SEARCH BAR -->
    <SearchBar />
    <!-- SEARCH BAR -->

    <!-- TABLE -->
    <div class="table">
      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Cliente</th>
            <th>Emissão</th>
            <th>Valor Total</th>
            <th class="add">
              <button @click="openModal('add')">
                <i class="fas fa-plus"></i>
              </button>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="pedido in pedidos" :key="pedido.id">
            <td>{{ pedido.id }}</td>
            <td>{{ pedido.cliente.nome }}</td>
            <td>{{ pedido.dataEmissao }}</td>
            <td>{{ pedido.valorTotal }}</td>
            <td class="actions">
              <button class="edit" @click="openModal('edit', pedido)">
                <i class="fas fa-edit"></i>
              </button>
              <button class="del">
                <i class="fas fa-trash" @click="handleDelete(pedido)"></i>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <!-- TABLE -->

    <!-- MODAL -->
    <div v-if="isModalOpen" class="modal">
      <div class="modal-background" @click="closeModal"></div>

      <div class="modal-content">
        <div class="modal-header">
          <span>{{ modalTitle }}</span>
          <i class="modal-close fa-solid fa-x" @click="closeModal"></i>
        </div>

        <div class="modal-body">
          <div class="form-group">
            <label for="cliente">Cliente</label>
            <select name="cliente" id="cliente" v-model="selectedClient">
              <option
                v-for="cliente in store.state.searchedPeople"
                :key="cliente.id"
                :value="cliente"
              >
                {{ cliente.nome }}
              </option>
            </select>

            <div class="select-item">
              <label for="produto">Produto</label>
              <select name="produto" id="produto" v-model="selectedProduct">
                <option
                  v-for="produto in store.state.searchedProducts"
                  :key="produto.id"
                  :value="produto"
                >
                  {{ produto.descricao }}
                </option>
              </select>

              <label for="quantidade">Quantidade</label>
              <input
                type="number"
                name="quantidade"
                id="quantidade"
                v-model="selectedQuantity"
              />

              <button @click="addProduct()">
                <i class="fas fa-plus"></i>
              </button>
            </div>

            <div
              class="select-item"
              v-for="item in selectedItems"
              :key="item.id"
            >
              <input type="text" :value="item.produto.descricao" disabled />
              <input type="text" :value="item.quantidade" disabled />
              <button
                class="delBtn"
                @click="selectedItems.splice(selectedItems.indexOf(item), 1)"
              >
                <i class="fas fa-trash"></i>
              </button>
            </div>

            <label for="valorTotal">Valor Total</label>
            <input
              type="text"
              name="valorTotal"
              id="valorTotal"
              :value="
                selectedItems.reduce(
                  (acc, item) => acc + item.valor * item.quantidade,
                  0,
                )
              "
              disabled
            />
          </div>
        </div>

        <div class="modal-footer">
          <button @click="closeModal" class="cancel">Cancelar</button>
          <button @click="onSubmit" class="submit">
            {{ successBtnLabel }}
          </button>
        </div>
      </div>
    </div>
    <!-- MODAL -->
  </main>
</template>

<style lang="scss" scoped>
::-webkit-scrollbar {
  display: none;
}
.order-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: calc(100% - 10rem);
  width: 100%;

  .table {
    width: 100%;
    height: 100%;
    background-color: white;
    border-radius: 0.5rem;
    padding: 1rem;
    overflow-y: auto;

    table {
      width: 100%;
      border-collapse: collapse;
      overflow-x: auto;

      thead {
        tr {
          th {
            padding: 1rem;
            text-align: left;
            border-bottom: 1px solid #bdc3c7;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            color: #333;
          }

          .add {
            display: flex;
            justify-content: flex-end;

            button {
              background-color: #409eff;
              border: none;
              border-radius: 0.2rem;
              padding-left: 1rem;
              padding-right: 1rem;
              padding-top: 0.5rem;
              padding-bottom: 0.5rem;
              cursor: pointer;
              color: white;

              &:hover {
                background-color: #66b1ff;
              }
            }
          }
        }
      }

      tbody {
        tr {
          td {
            padding: 1rem;
            text-align: left;
            border-bottom: 1px solid #bdc3c7;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            max-width: 100px;
          }

          .actions {
            display: flex;
            justify-content: flex-end;
            max-width: none;

            button {
              background-color: #409eff;
              border: none;
              border-radius: 0.2rem;
              padding-left: 1rem;
              padding-right: 1rem;
              padding-top: 0.5rem;
              padding-bottom: 0.5rem;
              cursor: pointer;
              color: white;

              &.edit {
                background-color: #67c23a;
                margin-right: 1rem;

                &:hover {
                  background-color: #85ce61;
                }
              }

              &.del {
                background-color: #f56c6c;

                &:hover {
                  background-color: #f78989;
                }
              }
            }
          }
        }
      }
    }
  }

  .modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.7);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 999;

    .modal-background {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: -1;
    }

    .modal-content {
      background-color: white;
      padding: 20px;
      border-radius: 5px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
      width: 40%;

      .modal-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-weight: bold;
        .modal-close {
          cursor: pointer;
        }
      }

      .modal-body {
        margin-top: 20px;

        .form-group {
          display: flex;
          flex-direction: column;
          margin-bottom: 20px;

          label {
            margin-bottom: 5px;
          }
          input {
            padding: 10px;
            border-radius: 5px;
            border: 1px solid #bdc3c7;
          }

          select {
            padding: 10px;
            border-radius: 5px;
            border: 1px solid #bdc3c7;
          }

          .select-item {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 10px;
            margin-top: 10px;
            gap: 1rem;

            input {
              width: 50%;
              height: 100%;
            }

            select {
              width: 50%;
              height: 100%;
            }

            button {
              width: 20%;
              padding: 10px;
              border-radius: 5px;
              border: none;
              cursor: pointer;
              color: white;
              background-color: #409eff;

              &:hover {
                background-color: #66b1ff;
              }
            }

            .delBtn {
              background-color: #f56c6c;
              width: 14%;
              &:hover {
                background-color: #f78989;
              }
            }
          }
        }
      }

      .modal-footer {
        margin-top: 20px;
        text-align: right;
        button {
          padding: 10px 20px;
          border-radius: 5px;
          border: none;
          cursor: pointer;
          color: white;
          font-weight: bold;

          &.cancel {
            background-color: #f56c6c;
            margin-right: 10px;

            &:hover {
              background-color: #f78989;
            }
          }
          &.submit {
            background-color: #409eff;

            &:hover {
              background-color: #66b1ff;
            }
          }
        }
      }
    }
  }

  @media (max-width: 1300px) {
    .modal {
      .modal-content {
        width: 70%;
      }
    }

    @media (max-width: 900px) {
      .modal {
        .modal-content {
          width: 90%;
        }
      }
    }
  }
}
</style>
