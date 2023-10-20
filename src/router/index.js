import { createRouter, createWebHistory } from 'vue-router'

import HomeView from '../views/HomeView.vue'
import PersonView from '../views/PersonView.vue'
import ProductView from '../views/ProductView.vue'
import OrderView from '../views/OrderView.vue'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomeView
        },
        {
            path: '/pessoas',
            name: 'pessoas',
            component: PersonView
        },
        {
            path: '/produtos',
            name: 'produtos',
            component: ProductView
        },
        {
            path: '/pedidos',
            name: 'pedidos',
            component: OrderView
        }
    ]
})

export default router