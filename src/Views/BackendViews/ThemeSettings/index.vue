<template>
	<el-form ref="ruleFormRef"
					 :model="ruleForm"
					 label-width="auto">
		<SctionTitle title="后台页面布局"
								 icon="icon-bujushezhi" />
		<el-form-item prop="layout">
			<el-radio-group v-model="ruleForm.layout"
											@change="OnLayoutChange">
				<div class="common-layout">
					<el-container class="layout-container">
						<el-aside class="layout-aside"></el-aside>
						<el-container>
							<el-header class="layout-header"></el-header>
							<el-main class="layout-main"></el-main>
							<el-footer v-if="appSettings.showFooter"
												 class="layout-footer"></el-footer>
						</el-container>
					</el-container>
					<el-radio value="default"
										size="large">默认布局</el-radio>
				</div>
				<div class="common-layout">
					<el-container class="layout-container">
						<el-header class="layout-header"></el-header>
						<el-main class="layout-main"></el-main>
						<el-footer v-if="appSettings.showFooter"
											 class="layout-footer"></el-footer>
					</el-container>
					<el-radio value="horizontal"
										size="large">横向布局</el-radio>
				</div>
				<div class="common-layout">
					<el-container class="layout-container">
						<el-header class="layout-header"></el-header>
						<el-container>
							<el-aside class="layout-aside"></el-aside>
							<el-container>
								<el-main class="layout-main"></el-main>
								<el-footer v-if="appSettings.showFooter"
													 class="layout-footer"></el-footer>
							</el-container>
						</el-container>
					</el-container>
					<el-radio value="classic"
										size="large">经典布局</el-radio>
				</div>
				<div class="common-layout">
					<el-container class="layout-container">
						<el-aside class="layout-columns"></el-aside>
						<el-aside class="layout-aside"></el-aside>
						<el-container>
							<el-header class="layout-header"></el-header>
							<el-main class="layout-main"></el-main>
							<el-footer v-if="appSettings.showFooter"
												 class="layout-footer"></el-footer>
						</el-container>
					</el-container>
					<el-radio value="columns"
										size="large">分栏布局</el-radio>
				</div>
				<div class="common-layout">
					<el-container class="layout-container">
						<el-aside class="layout-aside"></el-aside>
						<el-container>
							<el-main class="layout-main"></el-main>
							<el-footer v-if="appSettings.showFooter"
												 class="layout-footer"></el-footer>
						</el-container>
					</el-container>
					<el-radio value="chapter"
										size="large">章节布局</el-radio>
				</div>
			</el-radio-group>
		</el-form-item>
		<el-form-item prop="subSystem">
			<template #label>
				<el-popover class="box-item"
										width="300px"
										content="仅默认布局、经典布局、分栏布局等才可以设置子系统，如果设置为 True 将自动匹配后台页面一级菜单为子系统，二级菜单为子系统下的菜单。">
					<template #reference>
						<i class="remind-icon iconfont icon-guanyu" />
					</template>
				</el-popover>
				<span>子系统：</span>
			</template>
			<el-switch v-model="ruleForm.subSystem"
								 @change="OnLayoutChange"
								 :disabled="ruleForm.layout !== 'default' && ruleForm.layout !== 'classic' && ruleForm.layout !== 'columns'" />
		</el-form-item>
		<el-form-item prop="pageZoom"
									label="页面缩放：">
			<el-slider v-model="ruleForm.pageZoom"
								 :min="0.0"
								 :max="2.0"
								 :step="0.1"
								 show-input
								 @change="OnLayoutChange" />
		</el-form-item>
		<el-form-item prop="showFooter"
									label="显示页脚：">
			<el-switch v-model="ruleForm.showFooter"
								 @change="OnLayoutChange" />
		</el-form-item>
		<el-form-item>
			<el-button @click="OnResetForm(ruleFormRef)">撤 销</el-button>
		</el-form-item>
	</el-form>
</template>
<script setup name="ThemeSettings">
import { ref } from 'vue';
import pinia from '@/Stores/index';
import { storeToRefs } from 'pinia';
import { useAppSettings } from '@/Stores/appSettings';

const { appSettings } = storeToRefs(useAppSettings());
const ruleForm = ref({
	layout: appSettings.value.layout,
	subSystem: appSettings.value.subSystem,
	pageZoom: appSettings.value.pageZoom,
	showFooter: appSettings.value.showFooter
});
const OnLayoutChange = () => {
	const storesUseAppSettings = useAppSettings(pinia);
	appSettings.value.layout = ruleForm.value.layout;
	appSettings.value.subSystem = ruleForm.value.subSystem;
	appSettings.value.pageZoom = ruleForm.value.pageZoom;
	appSettings.value.showFooter = ruleForm.value.showFooter;
	storesUseAppSettings.setAppSettings(appSettings.value);
	document.body.style.zoom = ruleForm.value.pageZoom;
}
const ruleFormRef = ref();
const rules = ref([]);
const OnResetForm = (formEl) => {
	if (!formEl) return
	formEl.resetFields();
	OnLayoutChange();
}
</script>
<style lang="scss" scoped>
.common-layout {
	width: 200px;
	height: 150px;
	box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
	margin: 10px 50px 50px;
}
.layout-container {
	height: 100%;
}
.layout-header {
	height: 30px;
	background-color: var(--qf-bg-match-color);
}
.layout-aside {
	width: 50px;
	background-color: var(--qf-bg-brand-color);
}
.layout-columns {
	width: 20px;
	background-color: var(--qf-bg-special-color);
}
.layout-main {
	background-color: #e9eef3;
	height: 100%;
}
.layout-footer {
	height: 20px;
	background-color: var(--qf-bg-bright-color);
}
.remind-icon {
	color: var(--qf-text-color);
	margin-right: 5px;
}
</style>
