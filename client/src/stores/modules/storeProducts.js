import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useStoreProducts = defineStore(
	'store',
	() => {
		const products = ref([])
		const addToStore = (product) => {
			const index = products.value.findIndex((el) => el.id === product.id)
			if (index === -1) {
				// Объект с таким ID не найден, добавляем новый объект
				products.value.push(product)
			} else {
				// Объект с таким ID найден, обновляем его поле count
				products.value[index].count = product.count
			}
		}
		const increaseQuantity = (id) => {
			const index = products.value.findIndex((el) => el.id === id)
			products.value[index].count++
		}
		const decreaseQuantity = (id) => {
			const index = products.value.findIndex((el) => el.id === id)
			if (products.value[index].count > 1) {
				products.value[index].count--
			}
		}
		return { products, addToStore, increaseQuantity, decreaseQuantity }
	},
	{
		persist: {
			paths: ['products'],
		},
	}
)
