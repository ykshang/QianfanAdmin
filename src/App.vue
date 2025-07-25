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
	if (_appSettings) {
		document.documentElement.style.setProperty('--qf-aside-left-width', _appSettings.menuIsExpand ? '200px' : '65px');
		_appSettings.screenfull = screenfull.isFullscreen;
		storesUseAppSettings.setAppSettings(_appSettings);
		document.body.style.zoom = _appSettings.pageZoom;
	}
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
