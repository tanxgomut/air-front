import { defineStore } from 'pinia'

interface CartItem {
    id: number
    name: string
    quantity: number
}

export const useCartStore = defineStore('cart', {
    state: () => ({
        items: [] as CartItem[]
    }),
    actions: {
        initCart() {

            const saved = localStorage.getItem('cart')
            if (saved) {
                this.items = JSON.parse(saved)
            }

        },

        saveCart() {

            localStorage.setItem('cart', JSON.stringify(this.items))

        },

        addItem(product: { id: number; name: string }) {
            const existing = this.items.find((item) => item.id === product.id)
            if (existing) {
                existing.quantity++
            } else {
                this.items.push({ ...product, quantity: 1 })
            }
            this.saveCart()
        },

        removeItem(productId: number) {
            this.items = this.items.filter((item) => item.id !== productId)
            this.saveCart()
        },

        clearCart() {
            this.items = []
            this.saveCart()
        },
        async syncCartToServer() {
            const token = useCookie('token')?.value
            if (!token) return
        },
        async loadCartFromServer() {
            const token = useCookie('token')?.value
            if (!token) return
        }
    },
    getters: {
        totalItems: (state) => state.items.reduce((sum, item) => sum + item.quantity, 0)
    }
})
