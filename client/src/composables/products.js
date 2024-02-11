import { ref, onMounted } from 'vue'

export function useProducts() {
	const products = ref([])

	const getProducts = async () => {
		try {
			const response = await fetch('/api/products')
			if (!response.ok) {
				throw new Error(`Ошибка запроса: ${response.status}`)
			}
			products.value = await response.json()
		} catch (error) {
			console.error(error)
		}
	}

	onMounted(() => getProducts())
	return { products }
}
