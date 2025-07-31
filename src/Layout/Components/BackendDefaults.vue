<template>
	<el-container class="h-100">
		<LayoutAside :systemMenus="systemMenus"
								 :asideWidth="`${menuWidth}px`" />
		<el-container style="flex-direction: column;">
			<QFScrollbar :isScrollbar="!systemTheme.affixHeader">
				<LayoutHeader :isShowSystemTitle="false"
											:systemMenus="systemMenusHor"
											:currentSubSystem="currentSubSystem"
											:showChildren="false"
											:menuIsRouter="false"
											:menuIsExpand="appSettings.menuIsExpand"
											@OnChangeMenuIsExpand="OnChangeMenuIsExpand"
											@OnHorMenuSelect="OnHorMenuSelect" />
				<PageTabs v-if="systemTheme.showPageTabs" />
				<QFScrollbar :isScrollbar="systemTheme.affixHeader">
					<slot name="MainView" />
				</QFScrollbar>
				<LayoutFooter />
			</QFScrollbar>
		</el-container>
	</el-container>
</template>
<script setup name="BackendDefaults">
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
const currentSubSystem = ref(systemTheme.value.currentSubSystem);
const OnHorMenuSelect = (key, keyPath) => {
	currentSubSystem.value = key === null || key === undefined || key === '' ? route.matched[1].path : key;
	const _menus = route.matched[0].children.find(item => item.path === currentSubSystem.value);
	systemMenus.value = _menus.children ?? [];
	systemTheme.value.currentSubSystem = currentSubSystem.value;
	storesUseAppSettings.setSystemTheme(systemTheme.value);
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

