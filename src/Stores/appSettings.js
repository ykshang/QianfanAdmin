import { defineStore } from "pinia";
import { Local } from "@/Utils/storage.js";
export const useAppSettings = defineStore('appSettings', {
  state: () => ({
    appSettings: {
      /** 国际化语言配置，默认 zh-CN ，可选配置 zh-CN | zh-TW | en-US | de-DE */
      globalI18n: 'zh-CN',
      /** 系统当前页面名称 */
      documentTitle: '首页',
      /** 系统 视窗高度 */
      viewHeight: 0,
      /** 系统 视窗宽度 */
      viewWidth: 0,
      /** 客户端当前的设备， DESKTOP | PAD | MOBILE */
      currentDevice: 'DESKTOP',
      /** 系统 滚动条位置 */
      scroll: 0,
      /** 系统布局切换，default | horizontal | classic | columns | chapter */
      layout: 'default',
      /** 系统菜单是否展开 */
      menuIsExpand: true,
      /** 是否拆分子系统：这将自动匹配后台路由一级菜单为子系统 */
      subSystem: false,
      /** 当 subSystem = true 时，系统当前所处的子系统 */
      currentSubSystem: '',
      /** 页面缩放大小，倍数 */
      pageZoom: 1,
      /** 是否显示页脚 */
      showFooter: false,
      /** 是否开启全屏 */
      screenfull: false,
    }
  }),
  actions: {
    setAppSettings (data) {
      this.appSettings = data;
      Local.remove('appSettings');
      Local.set('appSettings', this.appSettings);
    },
    changeDocumentTitle (value) {
      this.appSettings.documentTitle = value
      Local.remove('appSettings');
      Local.set('appSettings', this.appSettings);
    },
    changeCurrentDevice (value) {
      this.appSettings.currentDevice = value
      Local.remove('appSettings');
      Local.set('appSettings', this.appSettings);
    },
    changeViewSize (value) {
      this.appSettings.viewHeight = value.height;
      this.appSettings.viewWidth = value.width;
      Local.set('appSettings', this.appSettings);
    },
    changeScroll (value) {
      this.appSettings.scroll = value
      Local.remove('appSettings');
      Local.set('appSettings', this.appSettings);
    },
  }
})