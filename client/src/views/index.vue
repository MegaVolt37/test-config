<template>
	<div class="home">
		<RouterLink to="/store">В хранилище</RouterLink>
		<div class="home__content">
			<ul class="home__info">
				<li
					class="home__info-item"
					v-for="(item, idx) in selectedOptionsName"
					:key="item"
				>
					<span class="home__info-label">{{ FILTERS_NAMES[idx] }}:</span>
					<span class="home__info-value">{{ item ? item : 'не выбрано' }}</span>
				</li>
			</ul>
			<div class="home__filters">
				<Select
					class="home__filters-select home__filters-select--quantity"
					v-model="drinkQuantity"
					multiple
					placeholder="Количество напитков"
					:options="filters?.counts"
					name="drinkQuantity"
					id="drinkQuantity"
				/>
				<Select
					class="home__filters-select home__filters-select--size"
					v-model="size"
					placeholder="Размер устройства"
					:options="filters?.size"
					name="size"
					id="size"
				/>
			</div>
			<div class="home__card" v-if="findProductSelected">
				<span>{{ findProductSelected?.name }}</span>
				<img
					class="home__card-image"
					:src="findProductSelected?.image"
					:alt="findProductSelected.name"
				/>
				<button class="home__card-button" @click="saveToStorage">
					Добавить в хранилище
				</button>
			</div>
			<p v-else>Товары отсутствуют, выберите другую конфигурацию</p>
		</div>
	</div>
</template>

<script setup>
import Select from '@/components/ui/Select.vue'
import { useProducts, useFilters } from '@/composables'
import { FILTERS_NAMES } from '@/tools/constants'
import { useStoreProducts } from '@/stores'
import { ref, computed } from 'vue'

const { addToStore } = useStoreProducts()

const { products } = useProducts()
const { filters } = useFilters()
const size = ref(null)
const drinkQuantity = ref([])

const selectedOptionsName = computed(() => {
	const sizeLabel = filters.value?.size?.find(
		(el) => el.id === size.value
	)?.label
	const drinkQuantityLabels = drinkQuantity.value.map(
		(qty) => filters.value?.counts?.find((el) => el.id === qty)?.label
	)
	return {
		size: sizeLabel,
		drinkQuantity: drinkQuantityLabels.join(', '),
	}
})
const selectedOptionsValue = computed(() => ({
	size: size.value,
	drinkQuantity: drinkQuantity.value,
}))
const isSizeMatch = (itemSize, selectedSize) => {
	return selectedSize === null || itemSize === selectedSize
}
const isDrinkQuantityMatch = (itemCounts, selectedCounts) => {
	return (
		selectedCounts.length === 0 ||
		selectedCounts.every((qty) => itemCounts.includes(qty))
	)
}
const findProductSelected = computed(() => {
	const { drinkQuantity, size } = selectedOptionsValue.value
	if (!drinkQuantity.length && typeof size !== 'number') return null

	const matchingItem = products.value.find((item) => {
		return (
			isSizeMatch(item.size, size) &&
			isDrinkQuantityMatch(item.counts, drinkQuantity)
		)
	})
	return matchingItem ?? null
})

const saveToStorage = () => {
	const filters = Object.fromEntries(
		Object.entries(selectedOptionsValue.value).map(([key, value]) => {
			if (selectedOptionsName.value.hasOwnProperty(key)) {
				return [key, { label: selectedOptionsName.value[key], id: value }]
			}
		})
	)
	addToStore({
		...findProductSelected.value,
		filters,
		count: 1,
	})
}
</script>

<style lang="scss" scoped>
.home {
	margin: 50px;

	&__content {
		display: flex;
		flex-direction: column;
		gap: 50px;
		justify-content: center;
		align-items: center;
		width: 50%;
		margin: 0 auto;
	}
	&__info-item {
		display: flex;
		gap: 10px;
	}
	&__info-label {
		font-size: 20px;
	}
	&__info-value {
		font-size: 20px;
	}
	&__card {
		margin-top: 50px;
		display: flex;
		flex-direction: column;
		gap: 20px;
		align-items: center;
	}
	&__card-image {
		max-width: 300px;
		width: 100%;
		aspect-ratio: 1/1;
	}
	&__filters {
		display: flex;
		width: 100%;
		flex-direction: column;
		gap: 30px;
	}
	&__filters-select {
		width: 100%;
		position: relative;
	}
}
</style>
