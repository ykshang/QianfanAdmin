<template>
	<el-container class="h-100">
		<LayoutAside :systemMenus="systemMenus"
								 :isShowUserInfo="true"
								 :asideWidth="`${systemTheme.menuWidth}px`" />
		<el-container style="flex-direction: column;">
			<QFScrollbar :isScrollbar="true">
				<slot name="MainView" />
				<LayoutFooter />
			</QFScrollbar>
		</el-container>
	</el-container>
</template>
<script setup name="BackendChapter">
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import pinia from '@/Stores/index';
import { storeToRefs } from 'pinia';
import { useAppSettings } from '@/Stores/appSettings';
const route = useRoute();
const storesUseAppSettings = useAppSettings(pinia);
const { appSettings, systemTheme } = storeToRefs(useAppSettings());
const systemMenus = ref([]);
const OnMenuExpand = () => {
	appSettings.value.menuIsExpand = true;
	storesUseAppSettings.setAppSettings(appSettings.value);
}
onMounted(() => {
	systemMenus.value = route.matched[0].children;
	OnMenuExpand();
});
</script>
<style lang="scss" scoped>
</style>

