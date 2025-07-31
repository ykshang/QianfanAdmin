<template>
	<el-header class="header"
						 :height="`${systemTheme.headerHeight}px`"
						 :style="{'border-bottom':isShowBorder ? '1px var(--el-border-color) var(--el-border-style)':'1px solid transparent'}">
		<div v-if="props.isShowSystemTitle"
				 :style="{width: props.systemTitleWidth}">
			<SystemTitle :isPadding="props.systemTitleWidth !== 'fit-content'" />
		</div>
		<i v-if="props.isShowExpandBtn"
			 class="expand-collapse-btn iconfont icon-daohangzhankai"
			 :class="{'collapse-btn':props.menuIsExpand,'m-l-12':props.isShowSystemTitle}"
			 @click="emit('OnChangeMenuIsExpand')" />
		<Breadcrumb v-if="props.isShowBreadcrumb" />
		<div style="flex-grow:1;height:100%;">
			<el-menu v-if="systemMenus.length > 0"
							 :default-active="props.currentSubSystem"
							 :router="props.menuIsRouter"
							 @select="OnHorMenuSelect"
							 background-color="transparent"
							 text-color="var(--qf-topnav-font-color)"
							 class="flex-end-center"
							 mode="horizontal">
				<SubMenu :systemMenus="systemMenus"
								 :showChildren="props.showChildren" />
			</el-menu>
		</div>
		<Navbars />
	</el-header>
</template>
<script setup name="LayoutHeader">
import { computed } from "vue";
let emit = defineEmits(["OnChangeMenuIsExpand", "OnHorMenuSelect"]);
import { storeToRefs } from 'pinia';
import { useAppSettings } from '@/Stores/appSettings';
const props = defineProps({
	isShowExpandBtn: {
		type: Boolean,
		default: true,
	},
	menuIsRouter: {
		type: Boolean,
		default: true,
	},
	isShowSystemTitle: {
		type: Boolean,
		default: true,
	},
	isShowBreadcrumb: {
		type: Boolean,
		default: true,
	},
	menuIsExpand: {
		type: Boolean,
		default: true,
	},
	systemTitleWidth: {
		type: Number,
		default: 'fit-content',
	},
	systemMenus: {
		type: Array,
		default: () => [],
	},
	showChildren: {
		type: Boolean,
		default: true,
	},
	currentSubSystem: {
		type: String,
		default: ''
	}
});
const { systemTheme } = storeToRefs(useAppSettings());
const OnHorMenuSelect = (key) => {
	emit("OnHorMenuSelect", key);
}
const isShowBorder = computed(() => {
	if (systemTheme.value.topNavBGColor === '' || systemTheme.value.topNavBGColor === 'transparent') {
		return true;
	}
	if (systemTheme.value.topNavBGColor.startsWith('#') && systemTheme.value.topNavBGColor.endsWith('00') && systemTheme.value.topNavBGColor.length === 9) {
		return true;
	}
	return false;
});
</script>
<style lang="scss" scoped>
.header {
	display: flex;
	align-items: center;
	background-color: var(--qf-topnav-bg-color);
	background-image: var(--qf-topnav-bg-color);
	transition: 0.5s;
}
.expand-collapse-btn {
	cursor: pointer;
	font-weight: 600;
	transition: 0.5s;
	user-select: none;
	margin-right: 12px;
	color: var(--qf-topnav-font-color);
}
.expand-collapse-btn:hover {
	color: var(--el-color-primary);
}
.collapse-btn {
	transform: rotateY(180deg);
}
.el-menu--horizontal.el-menu {
	border-bottom: none;
	height: var(--el-header-height);
	transition: 0.5s;
}
</style>
<style>
.el-menu--horizontal > .el-sub-menu {
	height: var(--el-header-height);
	transition: 0.5s;
}
.el-menu--horizontal > .el-menu {
	background-color: var(--qf-topnav-bg-color);
	background-image: var(--qf-topnav-bg-color);
}
</style>