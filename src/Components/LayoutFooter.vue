<template>
	<el-footer v-if="systemTheme.showFooter"
						 class="footer">这里是页脚部分</el-footer>
</template>
<script setup name="LayoutFooter">
import { storeToRefs } from 'pinia';
import { useAppSettings } from '@/Stores/appSettings';
const { systemTheme } = storeToRefs(useAppSettings());

</script>
<style lang="scss" scoped>
.footer {
	background-color: var(--qf-pagefooter-bg-color);
	background-image: var(--qf-pagefooter-bg-color);
	color: var(--qf-pagefooter-font-color);
}
</style>
