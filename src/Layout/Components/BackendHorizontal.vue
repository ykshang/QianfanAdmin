<template>
	<QFScrollbar :isScrollbar="xx">
		<el-container class="h-100">
			<!-- <el-header class="header"
							 height="var(--qf-header-height)">
			<div style="width: 200px;">
				<SystemTitle />
			</div>
			<div style="flex-grow:1;"></div>
			<el-menu :default-active="route.path"
							 background-color="var(--qf-bg-match-color)"
							 text-color="var(--qf-font-color-dark)"
							 active-text-color="var(--qf-font-color-target)"
							 router
							 mode="horizontal">
				<SubMenu :systemMenus="systemMenus" />
			</el-menu>
			<Navbars />
		</el-header> -->
			<LayoutHeader :systemMenus="systemMenus"
										:currentSubSystem="route.path" />

			<QFScrollbar :isScrollbar="!xx">
				<el-main>
					<router-view />
				</el-main>
				<el-footer v-if="appSettings.showFooter"
									 style="background-color: var(--qf-bg-bright-color);color:var(--qf-font-color-dark);">这里是页脚部分</el-footer>
			</QFScrollbar>
		</el-container>
	</QFScrollbar>
</template>
<script setup name="BackendHorizontal">
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import pinia from '@/Stores/index';
import { storeToRefs } from 'pinia';
import { useAppSettings } from '@/Stores/appSettings';
const route = useRoute();
const storesUseAppSettings = useAppSettings(pinia);
const { appSettings } = storeToRefs(useAppSettings());
const systemMenus = ref([]);
const xx = ref(false);
onMounted(() => {
	systemMenus.value = route.matched[0].children;
});
</script>
<style lang="scss" scoped>
.el-container {
	flex-direction: column;
}
.header {
	background-color: var(--qf-bg-match-color);
	color: var(--qf-font-color-dark);
	display: flex;
	align-items: center;
}
</style>
