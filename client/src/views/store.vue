<template>
	<div class="store">
		<RouterLink to="/">На главную</RouterLink>
		<div class="products-table">
			<table class="products-table__list">
				<thead class="products-table__header">
					<tr class="products-table__row">
						<th class="products-table__cell">Номер</th>
						<th class="products-table__cell">Изображение</th>
						<th class="products-table__cell">Название</th>
						<th class="products-table__cell">Выбранная конфигурация</th>
						<th class="products-table__cell">Количество</th>
					</tr>
				</thead>
				<tbody class="products-table__body">
					<tr v-for="(item, index) in products" class="products-table__row">
						<td class="products-table__cell">{{ index + 1 }}</td>
						<td class="products-table__cell">
							<img :src="item.image" :alt="item.name" />
						</td>
						<td class="products-table__cell">{{ item.name }}</td>
						<td class="products-table__cell">
							<ul class="products-table__config-list">
								<li
									v-for="(option, keyOption) in item.filters"
									:key="keyOption"
									class="products-table__config-item"
								>
									{{ FILTERS_NAMES[keyOption] }}:
									{{ option.label ? option.label : 'не выбрано' }}
								</li>
							</ul>
						</td>
						<td class="products-table__cell actions">
							<button
								@click="decreaseQuantity(item.id)"
								class="products-table__action-button"
							>
								-
							</button>
							<span class="products-table__quantity">{{ item.count }}</span>
							<button
								@click="increaseQuantity(item.id)"
								class="products-table__action-button"
							>
								+
							</button>
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>
</template>

<script setup>
import { useStoreProducts } from '@/stores'
import { storeToRefs } from 'pinia'
import { FILTERS_NAMES } from '@/tools/constants'
const { products } = storeToRefs(useStoreProducts())
const { increaseQuantity, decreaseQuantity } = useStoreProducts()
</script>
<style lang="scss">
.store {
	margin: 50px;
}
.products-table {
	max-width: 1200px;
	margin: 0 auto;

	&__list {
		width: 100%;
		border-spacing: 0 30px;
	}
	&__cell {
		text-align: left;
		img {
			max-width: 150px;
			width: 100%;
			aspect-ratio: 1/1;
		}
	}
	&__cell.actions {
		span {
			display: inline-block;
			margin: 0 10px;
		}
	}
}
</style>
