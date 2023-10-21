<script setup>
import { computed, onMounted, ref } from "vue";
import SearchBar from "../components/SearchBar.vue";
import store from "../store";
import { createToast } from "mosha-vue-toastify";
import "mosha-vue-toastify/dist/style.css";

// Definindo variáveis reativas
const produtos = computed(() => store.state.searchedProducts);
const currentProduct = ref({});
const isModalOpen = ref(false);
const modalTitle = ref("");
const successBtnLabel = ref("");

// Fetching dos dados dos produtos ao montar o componente
onMounted(() => {
  store.dispatch("searchProducts");
});

// Abrir o modal de adicionar/editar produto
const openModal = (mode, produto = null) => {
  if (mode === "add") {
    modalTitle.value = "Adicionar Produto";
    successBtnLabel.value = "Adicionar";
    currentProduct.value = {};
  } else if (mode === "edit") {
    modalTitle.value = "Editar Produto";
    successBtnLabel.value = "Editar";
    currentProduct.value = { ...produto };
  }

  isModalOpen.value = true;
};

// Fechar o modal de adicionar/editar produto
const closeModal = () => {
  isModalOpen.value = false;
  currentProduct.value = {};
};

// Função para exibir toast
const toast = (title, type) => {
  createToast(title, {
    type: type === "error" ? "danger" : "success",
    position: "top-center",
    timeout: 2000,
  });
};

// Função para adicionar/editar produto
const onSubmit = () => {
  if (
    currentProduct.value.descricao === undefined ||
    currentProduct.value.descricao === ""
  ) {
    toast("Descrição é obrigatório", "error");
    return;
  }

  if (
    currentProduct.value.valoUnitario === undefined ||
    currentProduct.value.valoUnitario === ""
  ) {
    toast("Valor é obrigatório", "error");
    return;
  }

  if (modalTitle.value === "Adicionar Produto") {
    currentProduct.value.id =
      Math.max(...store.state.searchedProducts.map((p) => p.id)) + 1;
    store.dispatch("addProduct", currentProduct.value);
  } else if (modalTitle.value === "Editar Produto") {
    store.dispatch("editProduct", currentProduct.value);
  }

  closeModal();
};

// Função para deletar produto
const handleDelete = (produto) => {
  store.dispatch("deleteProduct", produto.id);
};
</script>

<template>
  <main class="product-container">
    <!-- SEARCH BAR -->
    <SearchBar />
    <!-- SEARCH BAR -->

    <!-- TABLE -->
    <div class="table">
      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Descrição</th>
            <th>Valor</th>
            <th class="add">
              <button @click="openModal('add')">
                <i class="fas fa-plus"></i>
              </button>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="produto in produtos" :key="produto.id">
            <td>{{ produto.id }}</td>
            <td>{{ produto.descricao }}</td>
            <td>{{ produto.valoUnitario }}</td>
            <td class="actions">
              <button class="edit" @click="openModal('edit', produto)">
                <i class="fas fa-edit"></i>
              </button>
              <button class="del" @click="handleDelete(produto)">
                <i class="fas fa-trash"></i>
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
            <label for="descricao">Descrição</label>
            <input
              type="text"
              id="descricao"
              v-model="currentProduct.descricao"
              placeholder="ex: Camiseta"
            />

            <label for="valor">Valor</label>
            <input
              type="text"
              id="valor"
              v-model="currentProduct.valoUnitario"
              @input="
                currentProduct.valoUnitario = $event.target.value
                  .replace(/[^0-9.]/g, '')
                  .replace(/(\..*)\./g, '$1')
              "
              placeholder="ex: 10.00"
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
.product-container {
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
            margin-bottom: 1rem;
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
