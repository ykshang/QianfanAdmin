<template>
	<el-container class="h-100">
		<el-aside class="columns">
			<el-scrollbar>
				<div class="columns-menu"
						 v-for="item in systemMenusColumns"
						 :key="item"
						 :class="{'columns-menu-active': currentMenusColumns === item.path}"
						 @click="OnHorMenuColumnsSelect(item)">
					<i class="iconfont"
						 :class="item.meta.icon" />
					<span>{{item.meta.title}}</span>
				</div>
			</el-scrollbar>
		</el-aside>
		<LayoutAside :systemMenus="systemMenus"
								 :asideWidth="appSettings.menuIsExpand ? `${systemTheme.menuWidth}px`:'0px'" />
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
<script setup name="BackendColumns">
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
const systemMenusColumns = ref([]);
const currentMenusColumns = ref(route.matched[0].children[0]);
const OnChangeMenuIsExpand = () => {
	if (appSettings.value.menuIsExpand) {
		OnMenuCollapse();
	} else {
		OnMenuExpand();
	}
};
const OnMenuExpand = () => {
	appSettings.value.menuIsExpand = true;
	storesUseAppSettings.setAppSettings(appSettings.value);
}
const OnMenuCollapse = () => {
	appSettings.value.menuIsExpand = false;
	storesUseAppSettings.setAppSettings(appSettings.value);
}
const systemMenusHor = ref([]);
const currentSubSystem = ref(appSettings.value.currentSubSystem);
const OnHorMenuSelect = (key, isInit) => {
	if (key === appSettings.value.currentSubSystem && !isInit) return;
	currentSubSystem.value = key === null || key === undefined || key === '' ? route.matched[1].path : key;
	const _menus = route.matched[0].children.find(item => item.path === currentSubSystem.value);
	systemMenusColumns.value = _menus.children ?? [];
	if (systemMenusColumns.value.length > 0) {
		currentMenusColumns.value = systemMenusColumns.value[0] ? systemMenusColumns.value[0].path : '';
		if (systemMenusColumns.value[0].children && systemMenusColumns.value[0].children.length > 0) {
			systemMenus.value = systemMenusColumns.value[0].children;
			router.push(systemMenusColumns.value[0].children[0].path);
		} else {
			systemMenus.value = [];
			router.push(systemMenusColumns.value[0].path);
		}
	} else {
		systemMenus.value = [];
		router.push(currentSubSystem.value);
	}
	appSettings.value.currentSubSystem = currentSubSystem.value;
	storesUseAppSettings.setAppSettings(appSettings.value);
	CheckMenuData();
};
const OnHorMenuColumnsSelect = (item) => {
	if (item.path === currentMenusColumns.value) return;
	systemMenus.value = item.children ?? [];
	currentMenusColumns.value = item.path;
	router.push(item.children ? item.children[0].path : item.path);
	CheckMenuData();
}
const CheckMenuData = () => {
	if (systemMenus.value.length === 0 && appSettings.value.menuIsExpand) {
		OnMenuCollapse();
	} else if (systemMenus.value.length > 0 && !appSettings.value.menuIsExpand) {
		OnMenuExpand();
	}
}
watch(
	() => systemTheme.value.subSystem,
	() => {
		if (systemTheme.value.subSystem) {
			systemMenusHor.value = route.matched[0].children;
			OnHorMenuSelect(route.matched[1].path, true);
		} else {
			systemMenusHor.value = [];
			systemMenusColumns.value = route.matched[0].children;
			currentMenusColumns.value = route.matched[1].path;
			systemMenus.value = route.matched[1].children;
			CheckMenuData();
		}
	}
);
onMounted(() => {
	if (systemTheme.value.subSystem) {
		systemMenusHor.value = route.matched[0].children;
		OnHorMenuSelect(appSettings.value.currentSubSystem, true);
	} else {
		systemMenusHor.value = [];
		systemMenusColumns.value = route.matched[0].children;
		currentMenusColumns.value = route.matched[1].path;
		systemMenus.value = route.matched[1].children;
		CheckMenuData();
	}
});
</script>
<style lang="scss" scoped>
.columns {
	background-color: var(--qf-sidebar-bg-color);
	width: 64px;
	transition: 0.5s;
}
.columns-menu {
	display: flex;
	flex-direction: column;
	align-items: center;
	background-color: var(--qf-sidebar-bg-color);
	color: var(--qf-sidebar-font-color);
	border-radius: 5px;
	height: 58px;
	justify-content: center;
	margin: 3px;
	user-select: none;
	transition: 0.5s;
	cursor: pointer;
	i {
		font-size: 18px;
		margin-bottom: 3px;
	}
	span {
		font-size: 12px;
	}
}
.columns-menu:hover:not(.columns-menu-active) {
	background-color: var(--el-color-primary-light-5);
	color: #ffffff;
}
.columns-menu-active {
	background-color: var(--el-color-primary);
	font-weight: bold;
	color: #ffffff;
}
</style>

