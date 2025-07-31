<template>
	<el-container class="h-100"
								style="flex-direction: column;">
		<LayoutHeader :isShowSystemTitle="true"
									:systemMenus="systemMenusHor"
									:currentSubSystem="currentSubSystem"
									:showChildren="false"
									:menuIsRouter="false"
									:menuIsExpand="appSettings.menuIsExpand"
									@OnChangeMenuIsExpand="OnChangeMenuIsExpand"
									@OnHorMenuSelect="OnHorMenuSelect" />
		<el-container :style="{'height': `calc(100% - ${systemTheme.headerHeight}px)`}">
			<LayoutAside :systemMenus="systemMenus"
									 :isShowSystemTitle="false"
									 :asideWidth="`${menuWidth}px`" />
			<el-container style="flex-direction: column;">
				<PageTabs v-if="systemTheme.showPageTabs" />
				<QFScrollbar :isScrollbar="true">
					<slot name="MainView" />
				</QFScrollbar>
				<LayoutFooter />
			</el-container>
		</el-container>
	</el-container>
</template>
<script setup name="BackendClassic">
import { onMounted, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import pinia from '@/Stores/index';
import { storeToRefs } from 'pinia';
import { useAppSettings } from '@/Stores/appSettings';
const route = useRoute();
const router = useRouter();
const storesUseAppSettings = useAppSettings(pinia);
const { appSettings, systemTheme } = storeToRefs(useAppSettings());
const systemMenus = ref([]);
const menuWidth = ref(appSettings.value.menuIsExpand ? systemTheme.value.menuWidth : 65);
const OnChangeMenuIsExpand = () => {
	appSettings.value.menuIsExpand = !appSettings.value.menuIsExpand;
	storesUseAppSettings.setAppSettings(appSettings.value);
	menuWidth.value = appSettings.value.menuIsExpand ? systemTheme.value.menuWidth : 65;
}
const systemMenusHor = ref([]);
const currentSubSystem = ref(appSettings.value.currentSubSystem);
const OnHorMenuSelect = (key) => {
	currentSubSystem.value = key === null || key === undefined || key === '' ? route.matched[0].children[0].path : key;
	const _menus = route.matched[0].children.find(item => item.path === currentSubSystem.value);
	systemMenus.value = _menus.children ?? [];
	appSettings.value.currentSubSystem = currentSubSystem.value;
	storesUseAppSettings.setAppSettings(appSettings.value);
	/** 路由跳转到 _menus.path */
	if (_menus.path !== route.path) {
		router.push(_menus.path);
	}
}
watch(
	() => systemTheme.value.subSystem,
	() => {
		if (systemTheme.value.subSystem) {
			systemMenusHor.value = route.matched[0].children;
			OnHorMenuSelect(route.matched[1].path);
		} else {
			systemMenusHor.value = [];
			systemMenus.value = route.matched[0].children;
		}
	}
);
watch(
	() => systemTheme.value.menuWidth,
	() => {
		menuWidth.value = appSettings.value.menuIsExpand ? systemTheme.value.menuWidth : 65;
	}
);
onMounted(() => {
	if (systemTheme.value.subSystem) {
		systemMenusHor.value = route.matched[0].children;
		OnHorMenuSelect(appSettings.value.currentSubSystem);
	} else {
		systemMenus.value = route.matched[0].children;
	}
});
</script>
<style lang="scss" scoped>
</style>
