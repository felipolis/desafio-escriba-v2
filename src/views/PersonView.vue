<script setup>
import { computed, onMounted } from "vue";
import SearchBar from "../components/SearchBar.vue";
import axios from "axios";
import store from "../store";

const pessoas = computed(() => store.state.searchedPeople);

onMounted(() => {
  store.dispatch("searchPeople");
});
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
              <button>
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
              <button class="edit">
                <i class="fas fa-edit"></i>
              </button>
              <button class="del">
                <i class="fas fa-trash"></i>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <!-- TABLE -->

    <!-- MODAL -->
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
}
</style>
