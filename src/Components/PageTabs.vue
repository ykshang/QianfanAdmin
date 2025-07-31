<template>
	<el-header height="36px"
						 class="page-tabs-container">
		<el-scrollbar ref="scrollbarRef"
									@wheel.prevent="onHandleScroll">
			<div class="page-tabs page-tabs-style-one">
				<div v-for="item in 20"
						 :key="item"
						 class="page-tab-item"
						 :class="{'item-active':currentTab===item}"
						 @click="currentTab = item">
					<i class="menu-icon iconfont icon-zhantingtedian" />
					<span>{{item+1}}、标题</span>
					<i class="close-btn iconfont icon-guanbi2" />
				</div>
			</div>
		</el-scrollbar>
	</el-header>
</template>
<script setup name="PageTabs">
import { ref } from 'vue';
const scrollbarRef = ref();
const onHandleScroll = (e) => {
	scrollbarRef.value.wrapRef.scrollLeft -= e.wheelDelta / 4;
}
const currentTab = ref(4);
</script>
<style lang="scss" scoped>
.page-tabs-container {
	padding: 0px;
	box-sizing: border-box;
	box-shadow: 0 3px 6px var(--el-border-color-dark);
  z-index: 999;
}
.page-tabs {
	display: flex;
	height: 36px;
	width: fit-content;
	:first-child {
		margin-left: 8px;
	}
	:last-child {
		margin-right: 8px;
	}
}
.page-tab-item {
	display: flex;
	align-items: center;
	justify-content: center;
	white-space: nowrap;
	margin: 0 2px;
	padding: 0 3px;
	box-sizing: border-box;
	cursor: pointer;
	user-select: none;
	padding: 0 0 0 3px;
	height: 32px;
	transition: 0.5s;
	.menu-icon {
		margin-right: 6px;
		font-size: 1rem;
		height: 32px;
		line-height: 32px;
	}
	span {
		font-size: 0.8rem;
		width: fit-content;
		height: 100%;
		line-height: 32px;
	}
	.close-btn {
		margin-left: 8px;
		font-size: 0.5rem;
		padding: 2px;
		box-sizing: border-box;
		border-radius: 50%;
	}
}
.page-tabs-style-one {
	align-items: center;
	.page-tab-item {
		background-color: transparent;
		color: var(--el-text-color-regular);
		border: 1px solid var(--el-border-color);
		.close-btn {
			border: 1px solid var(--el-border-color);
			transition: 0.5s;
		}
	}
	.page-tab-item:hover:not(.item-active) {
		background-color: var(--el-menu-hover-bg-color);
		border: 1px solid var(--el-color-primary-light-3);
		color: var(--el-color-primary);
		.close-btn {
			border: 1px solid var(--el-color-primary);
		}
	}
	.item-active {
		background-color: var(--el-color-primary);
		border: 1px solid var(--el-color-primary);
		color: #ffffff;
		.close-btn {
			border: 1px solid #ffffff;
		}
	}
}
</style>
