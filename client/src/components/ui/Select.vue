<template>
	<el-select v-model="modelValue" v-bind="attrs">
		<el-option
			v-for="option in options"
			:key="option?.id"
			:label="option.label"
			:value="option?.id"
		/>
	</el-select>
</template>
<script setup>
import { useAttrs } from 'vue'
const attrs = useAttrs()
defineProps({
	options: {
		type: Array,
		required: false,
		default: () => [],
	},
})
const modelValue = defineModel()
</script>
