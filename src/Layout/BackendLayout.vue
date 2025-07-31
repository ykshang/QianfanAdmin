<template>
	<component :is="layouts[isLayout]">
		<template #MainView>
			<el-main>
				<router-view />
			</el-main>
		</template>
	</component>
</template>
<script setup name="BackendLayout">
import { defineAsyncComponent, computed } from 'vue';
import { storeToRefs } from 'pinia';
import { useAppSettings } from '@/Stores/appSettings';
const layouts = {
	default: defineAsyncComponent(() => import('@/Layout/Components/BackendDefaults.vue')),
	horizontal: defineAsyncComponent(() => import('@/Layout/Components/BackendHorizontal.vue')),
	classic: defineAsyncComponent(() => import('@/Layout/Components/BackendClassic.vue')),
	columns: defineAsyncComponent(() => import('@/Layout/Components/BackendColumns.vue')),
	chapter: defineAsyncComponent(() => import('@/Layout/Components/BackendChapter.vue'))
}
// 定义变量内容
const isLayout = computed(() => {
	const stores = useAppSettings();
	const { systemTheme } = storeToRefs(stores);
	return systemTheme.value.layout;
});
</script>
<style lang="scss" scoped>
</style>
