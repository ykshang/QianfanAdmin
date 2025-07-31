<template>
	<el-aside class="aside"
						:width="props.asideWidth"
						:style="{
              'border-right':isShowBorder ? '1px var(--el-border-color) var(--el-border-style)':'1px solid transparent'}">
		<SystemTitle v-if="props.isShowSystemTitle" />
		<el-scrollbar style="flex: 1;">
			<el-menu :default-active="route.path"
							 :collapse="!appSettings.menuIsExpand"
							 background-color="transparent"
							 text-color="var(--qf-menubar-font-color)"
							 style="border-right: 0;"
							 router>
				<SubMenu :systemMenus="props.systemMenus" />
			</el-menu>
		</el-scrollbar>
		<div class="info-span"
				 v-if="props.isShowUserInfo">
			<div class="dropdown-span">
				<el-avatar :size="32"
									 shape="square"
									 src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
				<span>Admin</span>
			</div>
			<el-button type="primary"
								 text>个人中心</el-button>
			<el-button style="margin-left: 0px"
								 type="primary"
								 text
								 @click="$router.push('/Backend/SystemManagement/ThemeSettings')">主题设置</el-button>
			<el-button style="margin-left: 0px"
								 type="primary"
								 plain>退 出</el-button>
		</div>
	</el-aside>
</template>
<script setup name="LayoutAside">
import { computed } from "vue";
import { useRoute } from "vue-router";
import { storeToRefs } from 'pinia';
import { useAppSettings } from '@/Stores/appSettings';
const { appSettings, systemTheme } = storeToRefs(useAppSettings());
const isShowBorder = computed(() => {
	if (systemTheme.value.menuBarBGColor === '' || systemTheme.value.menuBarBGColor === 'transparent') {
		return true;
	}
	if (systemTheme.value.menuBarBGColor.startsWith('#') && systemTheme.value.menuBarBGColor.endsWith('00') && systemTheme.value.menuBarBGColor.length === 9) {
		return true;
	}
	return false;
});
const route = useRoute();
const props = defineProps({
	isShowUserInfo: {
		type: Boolean,
		default: false,
	},
	isShowSystemTitle: {
		type: Boolean,
		default: true,
	},
	asideWidth: {
		type: String,
		default: '',
	},
	systemMenus: {
		type: Array,
		default: () => [],
	}
});
</script>
<style lang="scss" scoped>
.aside {
	transition: 0.5s;
	display: flex;
	flex-direction: column;
	background-color: var(--qf-menubar-bg-color);
	background-image: var(--qf-menubar-bg-color);
}
.info-span {
	display: flex;
	flex-direction: column;
	gap: 10px;
	padding: 50px 15px 10px;
	color: var(--qf-topnav-font-color);
}
.dropdown-span {
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 12px;
	margin-bottom: 18px;
}
</style>
