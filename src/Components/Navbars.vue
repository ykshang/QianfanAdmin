<template>
	<el-tooltip effect="dark"
							content="通知"
							placement="bottom">
		<div class="navbars">
			<i class="iconfont icon-tongzhixiaoxi" />
		</div>
	</el-tooltip>
	<el-tooltip effect="dark"
							content="主题"
							placement="bottom">
		<div class="navbars">
			<i class="iconfont icon-zhuti" />
		</div>
	</el-tooltip>
	<el-tooltip effect="dark"
							:content="appSettings.screenfull? '退出全屏':'全屏'"
							placement="bottom">
		<div class="navbars">
			<i class="iconfont"
				 @click="OnIsFullscreen"
				 :class="appSettings.screenfull? 'icon-jiechuquanping':'icon-ico_quanping'" />
		</div>
	</el-tooltip>
	<el-dropdown>
		<div class="dropdown-span">
			<el-avatar :size="32"
								 shape="square"
								 src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
			<span>Admin</span>
			<el-icon class="el-icon--right">
				<arrow-down />
			</el-icon>
		</div>
		<template #dropdown>
			<el-dropdown-menu>
				<el-dropdown-item class="select-none">个人中心</el-dropdown-item>
				<el-dropdown-item class="select-none">修改密码</el-dropdown-item>
				<el-dropdown-item divided
													class="select-none">退出登录</el-dropdown-item>
			</el-dropdown-menu>
		</template>
	</el-dropdown>
</template>
<script setup name="Navbars">
import { nextTick } from 'vue';
import screenfull from 'screenfull';
import { ElMessage } from 'element-plus';
import pinia from '@/Stores/index';
import { storeToRefs } from 'pinia';
import { useAppSettings } from '@/Stores/appSettings';
const storesUseAppSettings = useAppSettings(pinia);
const { appSettings } = storeToRefs(useAppSettings());
const OnIsFullscreen = () => {
	if (!screenfull.isEnabled) {
		ElMessage.warning('您的浏览器不支持全屏');
	}
	screenfull.toggle();
	nextTick(() => {
		appSettings.value.screenfull = !screenfull.isFullscreen;
		storesUseAppSettings.setAppSettings(appSettings.value);
	});
}
</script>
<style lang="scss" scoped>
.navbars {
	height: 100%;
	width: 38px;
	display: flex;
	align-items: center;
	justify-content: center;
	transition: 0.5s;
	user-select: none;
	cursor: pointer;
	i {
		transition: 0.3s;
	}
}
.navbars:hover {
	background-color: var(--qf-bg-brand-color);
	i {
		font-size: 1.2rem;
	}
}
.dropdown-span {
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 8px;
	cursor: pointer;
	color: var(--qf-font-color-dark);
	margin-left: 15px;
}
.dropdown-span:focus-visible {
	outline: none;
}
</style>
