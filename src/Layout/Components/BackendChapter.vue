<template>
	<el-container class="h-100">
		<el-aside class="aside"
							width="var(--qf-aside-left-width)">
			<SystemTitle />
			<el-scrollbar style="flex: 1;">
				<el-menu :default-active="route.path"
								 background-color="var(--qf-bg-brand-color)"
								 text-color="var(--qf-font-color-dark)"
								 active-text-color="var(--qf-font-color-target)"
								 :collapse="!appSettings.menuIsExpand"
								 router>
					<SubMenu :systemMenus="systemMenus" />
				</el-menu>
			</el-scrollbar>
			<div class="info-span">
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
									 text>主题设置</el-button>
				<el-button style="margin-left: 0px"
									 type="primary"
									 plain>退 出</el-button>
			</div>
		</el-aside>
		<el-container>
			<el-scrollbar style="width: 100%;">
				<el-main>
					<router-view />
				</el-main>
				<el-footer v-if="appSettings.showFooter"
									 style="background-color: var(--qf-bg-bright-color);color:var(--qf-font-color-dark);">这里是页脚部分</el-footer>
			</el-scrollbar>
		</el-container>
	</el-container>
</template>
<script setup name="BackendChapter">
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import pinia from '@/Stores/index';
import { storeToRefs } from 'pinia';
import { useAppSettings } from '@/Stores/appSettings';
const route = useRoute();
const storesUseAppSettings = useAppSettings(pinia);
const { appSettings } = storeToRefs(useAppSettings());
const systemMenus = ref([]);
const OnMenuExpand = () => {
	appSettings.value.menuIsExpand = true;
	storesUseAppSettings.setAppSettings(appSettings.value);
	document.documentElement.style.setProperty('--qf-aside-left-width', '200px');
}
onMounted(() => {
	systemMenus.value = route.matched[0].children;
	OnMenuExpand();
});
</script>
<style lang="scss" scoped>
.aside {
	background-color: var(--qf-bg-brand-color);
	transition: 0.5s;
	display: flex;
	flex-direction: column;
}
.header {
	background-color: var(--qf-bg-match-color);
	color: var(--qf-font-color-dark);
	display: flex;
	align-items: center;
}
.info-span {
	display: flex;
	flex-direction: column;
	gap: 10px;
	padding: 50px 15px 10px;
	color: var(--qf-font-color-dark);
}
.dropdown-span {
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 12px;
	margin-bottom: 18px;
}
</style>

