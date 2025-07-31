<template>
	<el-scrollbar ref="scrollbarRef"
								v-if="props.isScrollbar"
								style="width:100%;">
		<slot name="default"></slot>
	</el-scrollbar>
	<slot v-else
				name="default"></slot>
</template>
<script setup name="QFScrollbar">
import { ref, watch, nextTick } from 'vue';
import { storeToRefs } from 'pinia';
import { useAppSettings } from '@/Stores/appSettings';
const props = defineProps({
	isScrollbar: {
		type: Boolean,
		default: true,
	}
});
const { systemTheme } = storeToRefs(useAppSettings());
const scrollbarRef = ref();
watch(
	() => [systemTheme.value.showFooter, systemTheme.value.showPageTabs],
	() => {
		nextTick(() => {
			if (scrollbarRef.value !== null && scrollbarRef.value !== undefined) {
				scrollbarRef.value.update();
			}
		});
	}
);
</script>
