<template>
	<QFScrollbar :isScrollbar="!systemTheme.affixHeader">
		<el-container class="h-100"
									style="flex-direction: column;">
			<LayoutHeader :systemMenus="systemMenus"
										:isShowExpandBtn="false"
										:isShowBreadcrumb="false"
										:currentSubSystem="route.path" />
			<PageTabs v-if="systemTheme.showPageTabs" />
			<QFScrollbar :isScrollbar="systemTheme.affixHeader">
				<slot name="MainView" />
				<LayoutFooter />
			</QFScrollbar>
		</el-container>
	</QFScrollbar>
</template>
<script setup name="BackendHorizontal">
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import pinia from '@/Stores/index';
import { storeToRefs } from 'pinia';
import { useAppSettings } from '@/Stores/appSettings';
const route = useRoute();
const storesUseAppSettings = useAppSettings(pinia);
const { systemTheme } = storeToRefs(useAppSettings());
const systemMenus = ref([]);
onMounted(() => {
	systemMenus.value = route.matched[0].children;
});
</script>
<style lang="scss" scoped>
</style>
