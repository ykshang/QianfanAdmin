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
		<el-aside class="aside"
							:width="appSettings.menuIsExpand ? 'var(--qf-aside-left-width)':'0px'">
			<SystemTitle />
			<div style="height: calc(100% - var(--qf-header-height));">
				<el-scrollbar>
					<el-menu :default-active="route.path"
									 background-color="var(--qf-bg-brand-color)"
									 text-color="var(--qf-font-color-dark)"
									 active-text-color="var(--qf-font-color-target)"
									 :collapse="false"
									 router>
						<SubMenu :systemMenus="systemMenus" />
					</el-menu>
				</el-scrollbar>
			</div>
		</el-aside>
		<el-container>
			<el-header class="header"
								 height="var(--qf-header-height)">
				<i class="expand-collapse-btn iconfont icon-daohangzhankai"
					 :class="{'collapse-btn':appSettings.menuIsExpand}"
					 @click="OnChangeMenuIsExpand" />
				<Breadcrumb />
				<div style="flex-grow:1;"></div>
				<el-menu :default-active="currentSubSystem"
								 background-color="var(--qf-bg-match-color)"
								 text-color="var(--qf-font-color-dark)"
								 active-text-color="var(--qf-font-color-target)"
								 mode="horizontal"
								 @select="OnHorMenuSelect">
					<SubMenu :systemMenus="systemMenusHor"
									 :showChildren="false" />
				</el-menu>
				<Navbars />
			</el-header>
			<el-main>
				<router-view />
			</el-main>
			<el-footer v-if="appSettings.showFooter"
								 style="background-color: var(--qf-bg-bright-color);color:var(--qf-font-color-dark);">这里是页脚部分</el-footer>
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
const { appSettings } = storeToRefs(useAppSettings());
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
	document.documentElement.style.setProperty('--qf-aside-left-width', '200px');
}
const OnMenuCollapse = () => {
	appSettings.value.menuIsExpand = false;
	storesUseAppSettings.setAppSettings(appSettings.value);
	document.documentElement.style.setProperty('--qf-aside-left-width', '65px');
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
	() => appSettings.value.subSystem,
	() => {
		if (appSettings.value.subSystem) {
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
	if (appSettings.value.subSystem) {
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
	background-color: var(--qf-bg-special-color);
	width: 64px;
	transition: 0.5s;
}
.aside {
	background-color: var(--qf-bg-brand-color);
	transition: 0.5s;
}
.header {
	background-color: var(--qf-bg-match-color);
	color: var(--qf-font-color-dark);
	display: flex;
	align-items: center;
}
.expand-collapse-btn {
	cursor: pointer;
	font-weight: 600;
	transition: 0.5s;
	user-select: none;
	margin-right: 12px;
}
.expand-collapse-btn:hover {
	color: var(--qf-bg-target-color);
}
.collapse-btn {
	transform: rotateY(180deg);
}
.columns-menu {
	display: flex;
	flex-direction: column;
	align-items: center;
	background-color: var(--qf-bg-special-color);
	color: var(--qf-font-color-dark);
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
.columns-menu:hover {
	background-color: var(--qf-bg-bright-color);
}
.columns-menu-active {
	background-color: var(--qf-font-color-target);
	font-weight: bold;
}
</style>

