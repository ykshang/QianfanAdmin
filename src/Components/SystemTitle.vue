<template>
	<a class="system-title"
		 :class="{'p-lr-12': props.isPadding}"
		 href="/">
		<img class="logo"
				 src="../Assets/logo.png"
				 alt=""
				 srcset="">
		<div class="font-18 ml-5 ellipsis-one">{{appName}}</div>
	</a>
</template>
<script setup name="SystemTitle">
import { ref } from 'vue'
const props = defineProps({
	isPadding: {
		type: Boolean,
		default: true
	}
});
const appName = ref(import.meta.env.VITE_APP_NAME)
</script>
<style lang="scss" scoped>
.system-title {
	width: 100%;
	height: var(--qf-header-height);
	display: flex;
	align-items: center;
	justify-content: flex-start;
	box-sizing: border-box;
	font-weight: bold;
	color: var(--qf-bg-target-color);
}
.logo {
	height: 38px;
}
a {
	text-decoration: none;
	outline: none;
}
</style>
