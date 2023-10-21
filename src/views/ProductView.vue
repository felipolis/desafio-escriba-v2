<script setup>
import SearchBar from "../components/SearchBar.vue";

const produtos = [
  {
    id: 1,
    description: "Produto 1",
    valor: 10,
  },
  {
    id: 2,
    description: "Produto 2",
    valor: 20,
  },
  {
    id: 3,
    description: "Produto 3",
    valor: 30,
  },
  {
    id: 4,
    description: "Produto 4",
    valor: 40,
  },
  {
    id: 5,
    description: "Produto 5",
    valor: 50,
  },
  {
    id: 6,
    description: "Produto 6",
    valor: 60,
  },
  {
    id: 7,
    description: "Produto 7",
    valor: 70,
  },
  {
    id: 8,
    description: "Produto 8",
    valor: 80,
  },
  {
    id: 9,
    description: "Produto 9",
    valor: 90,
  },
  {
    id: 10,
    description: "Produto 10",
    valor: 100,
  },
  {
    id: 11,
    description: "Produto 11",
    valor: 110,
  },
  {
    id: 12,
    description: "Produto 12",
    valor: 120,
  },
  {
    id: 13,
    description: "Produto 13",
    valor: 130,
  },
  {
    id: 14,
    description: "Produto 14",
    valor: 140,
  },
  {
    id: 15,
    description: "Produto 15",
    valor: 150,
  },
  {
    id: 16,
    description: "Produto 16",
    valor: 160,
  },
  {
    id: 17,
    description: "Produto 17",
    valor: 170,
  },
  {
    id: 18,
    description: "Produto 18",
    valor: 180,
  },
  {
    id: 19,
    description: "Produto 19",
    valor: 190,
  },
  {
    id: 20,
    description: "Produto 20",
    valor: 200,
  },
  {
    id: 21,
    description: "Produto 21",
    valor: 210,
  },
  {
    id: 22,
    description: "Produto 22",
    valor: 220,
  },
  {
    id: 23,
    description: "Produto 23",
    valor: 230,
  },
  {
    id: 24,
    description: "Produto 24",
    valor: 240,
  }
]
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
              <button>
                <i class="fas fa-plus"></i>
              </button>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="produto in produtos" :key="produto.id">
            <td>{{ produto.id }}</td>
            <td>{{ produto.description }}</td>
            <td>{{ produto.valor }}</td>
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
}
</style>
