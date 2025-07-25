<template>
	<el-header class="header"
						 height="var(--qf-header-height)">
		<div v-if="props.isShowSystemTitle"
				 :style="{width: props.systemTitleWidth}">
			<SystemTitle :isPadding="props.systemTitleWidth !== 'fit-content'" />
		</div>
		<div style="flex-grow:1;"></div>
		<el-menu :default-active="props.currentSubSystem"
						 background-color="var(--qf-bg-match-color)"
						 text-color="var(--qf-font-color-dark)"
						 active-text-color="var(--qf-font-color-target)"
						 router
						 mode="horizontal">
			<SubMenu :systemMenus="systemMenus"
							 :showChildren="props.showChildren" />
		</el-menu>
		<Navbars />
	</el-header>
</template>
<script setup name="LayoutHeader">
const props = defineProps({
	isShowSystemTitle: {
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
</script>
<style lang="scss" scoped>
.header {
	background-color: var(--qf-bg-match-color);
	color: var(--qf-font-color-dark);
	display: flex;
	align-items: center;
}
</style>