<template>
	<el-scrollbar v-if="props.isScrollbar"
								:height="props.height">
		<slot name="default"></slot>
	</el-scrollbar>
	<slot v-else
				name="default"></slot>
</template>
<script setup name="QFScrollbar">
const props = defineProps({
	height: {
		type: Number,
		default: false,
	},
	isScrollbar: {
		type: Boolean,
		default: true,
	}
});

</script>
