<script setup>
import { computed, onMounted, ref } from "vue";
import SearchBar from "../components/SearchBar.vue";
import store from "../store";
import { createToast } from "mosha-vue-toastify";
import "mosha-vue-toastify/dist/style.css";

// Definindo variáveis reativas
const pessoas = computed(() => store.state.searchedPeople);
const currentPerson = ref({});
const isModalOpen = ref(false);
const modalTitle = ref("");
const successBtnLabel = ref("");

// Fetching dos dados das pessoas ao montar o componente
onMounted(() => {
  store.dispatch("searchPeople");
});

// Abrir o modal de adicionar/editar pessoa
const openModal = (mode, pessoa = null) => {
  if (mode === "add") {
    modalTitle.value = "Adicionar Pessoa";
    successBtnLabel.value = "Adicionar";
    currentPerson.value = {};
  } else if (mode === "edit") {
    modalTitle.value = "Editar Pessoa";
    successBtnLabel.value = "Editar";
    currentPerson.value = { ...pessoa };
  }

  isModalOpen.value = true;
};

// Fechar o modal de adicionar/editar pessoa
const closeModal = () => {
  isModalOpen.value = false;
  currentPerson.value = {};
};

// Função para exibir toast
const toast = (title, type) => {
  createToast(title, {
    type: type === "error" ? "danger" : "success",
    position: "top-center",
    timeout: 2000,
  });
};

// Função para adicionar/editar pessoa
const onSubmit = () => {
  if (
    currentPerson.value.nome === undefined ||
    currentPerson.value.nome === ""
  ) {
    toast("Nome é obrigatório", "error");
    return;
  }

  if (currentPerson.value.cpf === undefined || currentPerson.value.cpf === "") {
    toast("CPF é obrigatório", "error");
    return;
  }

  if (
    currentPerson.value.dataNascimento === undefined ||
    currentPerson.value.dataNascimento === ""
  ) {
    toast("Data de Nascimento é obrigatório", "error");
    return;
  }

  if (modalTitle.value === "Adicionar Pessoa") {
    currentPerson.value.id =
      Math.max(...store.state.searchedPeople.map((p) => p.id)) + 1;
    store.dispatch("addPerson", currentPerson.value);
  } else if (modalTitle.value === "Editar Pessoa") {
    store.dispatch("editPerson", currentPerson.value);
  }

  closeModal();
};

// Função para deletar pessoa
const handleDelete = (pessoa) => {
  store.dispatch("deletePerson", pessoa.id);
};

// Máscara para o CPF
const formatCPF = (cpf) => {
  cpf = cpf.replace(/\D/g, "");
  cpf = cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
  return cpf;
};

// Máscara para a data de nascimento
const formatData = (data) => {
  data = data.replace(/\D/g, "");
  data = data.replace(/(\d{4})(\d{2})(\d{2})/, "$1-$2-$3");
  return data;
};
</script>

<template>
  <main class="person-container">
    <!-- SEARCH BAR -->
    <SearchBar />
    <!-- SEARCH BAR -->

    <!-- TABLE -->
    <div class="table">
      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Nome</th>
            <th>CPF</th>
            <th>Nascimento</th>
            <th class="add">
              <button @click="openModal('add')">
                <i class="fas fa-plus"></i>
              </button>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="pessoa in pessoas" :key="pessoa.id">
            <td>{{ pessoa.id }}</td>
            <td>{{ pessoa.nome }}</td>
            <td>{{ pessoa.cpf }}</td>
            <td>{{ pessoa.dataNascimento }}</td>
            <td class="actions">
              <button class="edit" @click="openModal('edit', pessoa)">
                <i class="fas fa-edit"></i>
              </button>
              <button class="del" @click="handleDelete(pessoa)">
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
            <label for="nome">Nome</label>
            <input
              type="text"
              id="nome"
              v-model="currentPerson.nome"
              placeholder="ex: Felipe"
            />

            <label for="cpf">CPF</label>
            <input
              type="text"
              id="cpf"
              v-model="currentPerson.cpf"
              @input="currentPerson.cpf = formatCPF($event.target.value)"
              :maxlength="14"
              placeholder="000.000.000-00"
            />

            <label for="dataNascimento">Data de Nascimento</label>
            <input
              type="text"
              id="dataNascimento"
              v-model="currentPerson.dataNascimento"
              @input="
                currentPerson.dataNascimento = formatData($event.target.value)
              "
              :maxlength="10"
              placeholder="AAAA-MM-DD"
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
.person-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: calc(100% - 10rem);
  width: 100%;

  .table {
    width: 100%;
    height: 92%;
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
