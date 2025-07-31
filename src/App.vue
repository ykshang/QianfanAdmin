<template>
	<router-view />
</template>
<script setup name="App">
import { onMounted, nextTick, inject, watch, onBeforeMount, ref } from 'vue';
import { Local } from '@/Utils/storage';
import { storeToRefs } from 'pinia';
import pinia from '@/Stores/index';
import { useAppSettings } from '@/Stores/appSettings';
import { useRoute } from 'vue-router';
import screenfull from 'screenfull';
import { ChangeColor } from '@/Utils/colorutils.js';
import Themes from '@/Views/BackendVIews/ThemeSettings/themes.json';
const { systemTheme } = storeToRefs(useAppSettings());
const route = useRoute();

const storesUseAppSettings = useAppSettings(pinia);

const PC2PAD = ref(1500);
const PAD2MOBILE = ref(768);
const GetDevice = () => {
	const rect = document.body.getBoundingClientRect();
	storesUseAppSettings.changeViewSize({ width: window.innerWidth, height: window.innerHeight });
	if (rect.width >= PC2PAD.value) {
		return 'DESKTOP';
	} else if (rect.width >= PAD2MOBILE.value && rect.width < PC2PAD.value) {
		return 'PAD';
	} else {
		return 'MOBILE';
	}
};
const Resize = () => {
	if (!document.hidden) {
		OnWindowDynamics('resize');
		let curDevice = GetDevice();
		storesUseAppSettings.changeCurrentDevice(curDevice);
	}
};
const Scoll = () => {
	if (!document.hidden) {
		OnWindowDynamics('scroll');
		storesUseAppSettings.changeScroll(document.documentElement.scrollTop);
	}
};
onBeforeMount(() => {
	// 获取缓存中的布局配置
	const _appSettings = Local.get('appSettings');
	const _systemTheme = Local.get('systemTheme');
	if (_appSettings) {
		_appSettings.screenfull = screenfull.isFullscreen;
		storesUseAppSettings.setAppSettings(_appSettings);
	}
	if (_systemTheme) {
		storesUseAppSettings.setSystemTheme(_systemTheme);
		document.body.style.zoom = _systemTheme.pageZoom;
		const el = document.querySelector('html');
		el.className = '';
		el.classList.add("system-theme-" + _systemTheme.themeType);
	} else {
		const currentTheme = Themes[systemTheme.value.themeType];
		for (let index = 0; index < currentTheme.functionColor.length; index++) {
			systemTheme.value[currentTheme.functionColor[index].key] = currentTheme.functionColor[index].value;
		}
		storesUseAppSettings.setSystemTheme(systemTheme.value);
		document.body.style.zoom = systemTheme.value.pageZoom;
	}
	/** 初始化系统主题 Start */
	// 主题配色
	const elColors = [
		{ key: 'primaryColor', value: ['primary'] },
		{ key: 'successColor', value: ['success'] },
		{ key: 'warningColor', value: ['warning'] },
		{ key: 'dangerColor', value: ['danger', 'error'] },
		{ key: 'infoColor', value: ['info'] },
	];
	for (let index = 0; index < elColors.length; index++) {
		if (systemTheme.value[elColors[index].key] === null || systemTheme.value[elColors[index].key] === undefined || systemTheme.value[elColors[index].key] === '')
			continue;
		for (let j = 0; j < elColors[index].value.length; j++) {
			// 颜色加深
			document.documentElement.style.setProperty(`--el-color-${elColors[index].value[j]}-dark-2`, `${ChangeColor.getDarkColor(systemTheme.value[elColors[index].key], 0.1)}`);
			document.documentElement.style.setProperty(`--el-color-${elColors[index].value[j]}`, systemTheme.value[elColors[index].key]);
			// 颜色变浅
			for (let i = 1; i <= 9; i++) {
				document.documentElement.style.setProperty(`--el-color-${elColors[index].value[j]}-light-${i}`, `${ChangeColor.getLightColor(systemTheme.value[elColors[index].key], i / 10)}`);
			}
		}
	}
	// 页脚配色
	if (systemTheme.value.pageFooterBGColor !== null && systemTheme.value.pageFooterBGColor !== undefined && systemTheme.value.pageFooterBGColor !== '') {
		document.documentElement.style.setProperty(`--qf-pagefooter-bg-color`, systemTheme.value.pageFooterBGColor);
	}
	if (systemTheme.value.pageFooterFontColor !== null && systemTheme.value.pageFooterFontColor !== undefined && systemTheme.value.pageFooterFontColor !== '') {
		document.documentElement.style.setProperty(`--qf-pagefooter-font-color`, systemTheme.value.pageFooterFontColor);
	}
	// 左侧分栏
	if (systemTheme.value.sidebarBGColor !== null && systemTheme.value.sidebarBGColor !== undefined && systemTheme.value.sidebarBGColor !== '') {
		document.documentElement.style.setProperty(`--qf-sidebar-bg-color`, systemTheme.value.sidebarBGColor);
	}
	if (systemTheme.value.sidebarFontColor !== null && systemTheme.value.sidebarFontColor !== undefined && systemTheme.value.sidebarFontColor !== '') {
		document.documentElement.style.setProperty(`--qf-sidebar-font-color`, systemTheme.value.sidebarFontColor);
	}
	// 系统菜单
	if (systemTheme.value.menuBarBGColor !== null && systemTheme.value.menuBarBGColor !== undefined && systemTheme.value.menuBarBGColor !== '') {
		document.documentElement.style.setProperty(`--qf-menubar-bg-color`, systemTheme.value.menuBarBGColor);
	}
	if (systemTheme.value.menuBarFontColor !== null && systemTheme.value.menuBarFontColor !== undefined && systemTheme.value.menuBarFontColor !== '') {
		document.documentElement.style.setProperty(`--qf-menubar-font-color`, systemTheme.value.menuBarFontColor);
	}
	// 头部顶栏
	if (systemTheme.value.topNavBGColor !== null && systemTheme.value.topNavBGColor !== undefined && systemTheme.value.topNavBGColor !== '') {
		document.documentElement.style.setProperty(`--qf-topnav-bg-color`, systemTheme.value.topNavBGColor);
	}
	if (systemTheme.value.topNavFontColor !== null && systemTheme.value.topNavFontColor !== undefined && systemTheme.value.topNavFontColor !== '') {
		document.documentElement.style.setProperty(`--qf-topnav-font-color`, systemTheme.value.topNavFontColor);
	}
	/** 初始化系统主题 End */
	Resize();
	Scoll();
	window.addEventListener('resize', Resize);
	window.addEventListener('scroll', Scoll);
});
const OnWindowDynamics = (type) => {
	var els = document.querySelectorAll('.header-top')
	for (let index = 0; index < els.length; index++) {
		els[index].style.transition = type === 'scroll' ? '1s' : '0s';
	}
}
// 监听路由的变化，设置网站标题
watch(
	() => route.path,
	() => {
		document.title = route.meta.title + '-' + __SYSTEM_NAME__
	}
);
const storesAppSettings = useAppSettings();
const { appSettings } = storeToRefs(storesAppSettings);
// 页面加载时
onMounted(() => {
});
</script>
<style lang="scss" scoped>
</style>
