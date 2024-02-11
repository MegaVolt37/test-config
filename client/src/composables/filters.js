import { ref, onMounted } from 'vue'

export function useFilters() {
	const filters = ref({})

	const getFilters = async () => {
		try {
			const response = await fetch('/api/filters')
			if (!response.ok) {
				throw new Error(`Ошибка запроса: ${response.status}`)
			}
			filters.value = await response.json()
		} catch (error) {
			console.error(error)
		}
	}

	onMounted(() => getFilters())
	return { filters }
}
