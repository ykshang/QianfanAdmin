<template>
	<el-breadcrumb class="breadcrumb"
								 separator="/">
		<template v-for="(item, index) in breadcrumbs"
							:key="item">
			<el-breadcrumb-item :to="{ path: item.path }"
													v-if="index < breadcrumbs.length - 1">
				<div class="breadcrumb-to">{{item.title}}</div>
			</el-breadcrumb-item>
			<el-breadcrumb-item v-else>
				<div class="breadcrumb-item">{{item.title}}</div>
			</el-breadcrumb-item>
		</template>
	</el-breadcrumb>
</template>
<script setup name="Breadcrumb">
import { onMounted, ref, watch } from 'vue';
import { onBeforeRouteUpdate, useRoute } from 'vue-router';
import { storeToRefs } from 'pinia';
import { useAppSettings } from '@/Stores/appSettings';

const route = useRoute();
const { appSettings } = storeToRefs(useAppSettings());
const breadcrumbs = ref([]);
const getBreadcrumbs = (matched) => {
	let _breadcrumbs = matched.filter(item => item.meta.title !== null && item.meta.title !== undefined)
		.map((item) => {
			return { path: item.path, title: item.meta.title };
		});
	if (appSettings.value.subSystem) {
		_breadcrumbs.shift();
	}
	breadcrumbs.value = _breadcrumbs;
}
onBeforeRouteUpdate((to) => {
	getBreadcrumbs(to.matched);
})
watch(
	() => appSettings.value.subSystem,
	() => {
		getBreadcrumbs(route.matched);
	}
);
onMounted(() => {
	getBreadcrumbs(route.matched);
});
</script>
<style lang="scss" scoped>
.breadcrumb-item {
	color: var(--qf-font-color-dark);
}
</style>
