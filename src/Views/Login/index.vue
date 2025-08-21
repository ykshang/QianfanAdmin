<template>
  <component :is="loginLayout[`${appSettings.currentDevice}Login`]">
    表单内容：
	<el-input v-model="input" style="width: 240px" placeholder="Please input" />
  </component>
</template>
<script setup name="Login">
import { ref, onUnmounted, defineAsyncComponent } from "vue";
import { storeToRefs } from "pinia";
import { useAppSettings } from "@/Stores/appSettings";
const { appSettings } = storeToRefs(useAppSettings());
const loginLayout = {
  MOBILELogin: defineAsyncComponent(() => import("./MobileLogin.vue")),
  PADLogin: defineAsyncComponent(() => import("./PadLogin.vue")),
  DESKTOPLogin: defineAsyncComponent(() => import("./DesktopLogin.vue")),
};
const input = ref("");
</script>
<style lang="scss" scoped>
</style>
