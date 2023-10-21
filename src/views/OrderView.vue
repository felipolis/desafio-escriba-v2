<script setup>
import SearchBar from "../components/SearchBar.vue";

const pedidos = [
  {
    id: 1,
    cliente: "João",
    emissao: "01012000",
    valorTotal: 10,
  },
  {
    id: 2,
    cliente: "Maria",
    emissao: "01012000",
    valorTotal: 20,
  },
  {
    id: 3,
    cliente: "José",
    emissao: "01012000",
    valorTotal: 30,
  },
  {
    id: 4,
    cliente: "Pedro",
    emissao: "01012000",
    valorTotal: 40,
  },
  {
    id: 5,
    cliente: "Paulo",
    emissao: "01012000",
    valorTotal: 50,
  },
  {
    id: 6,
    cliente: "Lucas",
    emissao: "01012000",
    valorTotal: 60,
  },
  {
    id: 7,
    cliente: "Marcos",
    emissao: "01012000",
    valorTotal: 70,
  },
  {
    id: 8,
    cliente: "Mateus",
    emissao: "01012000",
    valorTotal: 80,
  },
  {
    id: 9,
    cliente: "Tiago",
    emissao: "01012000",
    valorTotal: 90,
  },
  {
    id: 10,
    cliente: "João",
    emissao: "01012000",
    valorTotal: 100,
  },
  {
    id: 11,
    cliente: "Maria",
    emissao: "01012000",
    valorTotal: 110,
  },
  {
    id: 12,
    cliente: "José",
    emissao: "01012000",
    valorTotal: 120,
  },
  {
    id: 13,
    cliente: "Pedro",
    emissao: "01012000",
    valorTotal: 130,
  },
  {
    id: 14,
    cliente: "Paulo",
    emissao: "01012000",
    valorTotal: 140,
  },
  {
    id: 15,
    cliente: "Lucas",
    emissao: "01012000",
    valorTotal: 150,
  },
  {
    id: 16,
    cliente: "Marcos",
    emissao: "01012000",
    valorTotal: 160,
  },
  {
    id: 17,
    cliente: "Mateus",
    emissao: "01012000",
    valorTotal: 170,
  },
  {
    id: 18,
    cliente: "Tiago",
    emissao: "01012000",
    valorTotal: 180,
  },
  {
    id: 19,
    cliente: "João",
    emissao: "01012000",
    valorTotal: 190,
  }
]
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
              <button>
                <i class="fas fa-plus"></i>
              </button>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="pedido in pedidos" :key="pedido.id">
            <td>{{ pedido.id }}</td>
            <td>{{ pedido.cliente }}</td>
            <td>{{ pedido.emissao }}</td>
            <td>{{ pedido.valorTotal }}</td>
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
}
</style>
