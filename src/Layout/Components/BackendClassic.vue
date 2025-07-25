<template>
	<el-container class="h-100">
		<el-header class="header"
							 height="var(--qf-header-height)">
			<div style="width: fit-content;">
				<SystemTitle />
			</div>
			<div style="width: fit-content;display:flex;align-items:center;">
				<i class="expand-collapse-btn iconfont icon-daohangzhankai"
					 :class="{'collapse-btn':appSettings.menuIsExpand}"
					 @click="OnChangeMenuIsExpand" />
				<Breadcrumb />
			</div>
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
		<el-container style="height: calc(100% - var(--qf-header-height));">
			<el-aside class="aside"
								width="var(--qf-aside-left-width)">
				<el-scrollbar>
					<el-menu :default-active="route.path"
									 background-color="var(--qf-bg-brand-color)"
									 text-color="var(--qf-font-color-dark)"
									 active-text-color="var(--qf-font-color-target)"
									 :collapse="!appSettings.menuIsExpand"
									 router>
						<SubMenu :systemMenus="systemMenus" />
					</el-menu>
				</el-scrollbar>
			</el-aside>
			<el-container>
				<el-main>
					<router-view />
				</el-main>
				<el-footer v-if="appSettings.showFooter"
									 style="background-color: var(--qf-bg-bright-color);color:var(--qf-font-color-dark);">这里是页脚部分</el-footer>
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
const { appSettings } = storeToRefs(useAppSettings());
const systemMenus = ref([]);
const OnChangeMenuIsExpand = () => {
	appSettings.value.menuIsExpand = !appSettings.value.menuIsExpand;
	storesUseAppSettings.setAppSettings(appSettings.value);
	document.documentElement.style.setProperty('--qf-aside-left-width', appSettings.value.menuIsExpand ? '200px' : '65px');
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
	() => appSettings.value.subSystem,
	() => {
		if (appSettings.value.subSystem) {
			systemMenusHor.value = route.matched[0].children;
			OnHorMenuSelect(route.matched[1].path);
		} else {
			systemMenusHor.value = [];
			systemMenus.value = route.matched[0].children;
		}
	}
);
onMounted(() => {
	if (appSettings.value.subSystem) {
		systemMenusHor.value = route.matched[0].children;
		OnHorMenuSelect(appSettings.value.currentSubSystem);
	} else {
		systemMenus.value = route.matched[0].children;
	}
});
</script>
<style lang="scss" scoped>
.header {
	background-color: var(--qf-bg-match-color);
	color: var(--qf-font-color-dark);
	display: flex;
	align-items: center;
}
.aside {
	background-color: var(--qf-bg-brand-color);
	transition: 0.5s;
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
</style>
