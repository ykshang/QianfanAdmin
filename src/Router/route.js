import FrontLayout from '@/Layout/FrontLayout.vue'
import BackendLayout from '@/Layout/BackendLayout.vue'
export const dynamicRoutes = [
  {
    path: '/',
    name: 'Front',
    component: FrontLayout,
    children: [{
      path: '/',
      name: 'Home',
      component: () => import('@/Views/FrontViews/HomePage/index.vue'),
      meta: {
        title: '首页',
        isHide: false,
        isShowOverview: true,
        icon: "icon-shouye2"
      }
    }]
  },
  {
    path: '/Backend',
    name: 'Backend',
    component: BackendLayout,
    redirect: '/Backend/Dashboard',
    children: [{
      path: '/Backend/Dashboard',
      name: 'Dashboard',
      component: () => import('@/Views/BackendViews/Dashboard/index.vue'),
      meta: {
        title: '首页',
        isHide: false,
        isShowOverview: true,
        icon: "icon-shouye2"
      }
    }, {
      path: '/Backend/SystemManagement',
      name: 'SystemManagement',
      redirect: '/Backend/SystemManagement/ThemeSettings',
      meta: {
        title: '系统管理',
        isHide: false,
        isShowOverview: true,
        icon: "icon-peizhi-xitongpeizhi"
      },
      children: [{
        path: '/Backend/SystemManagement/ThemeSettings',
        name: 'ThemeSettings',
        component: () => import('@/Views/BackendViews/ThemeSettings/index.vue'),
        meta: {
          title: '主题设置',
          isHide: false,
          isShowOverview: true,
          icon: "icon-zhuti"
        }
      }, {
        path: '/Backend/SystemManagement/MenuManagement',
        name: 'MenuManagement',
        component: () => import('@/Views/BackendViews/MenuManagement/index.vue'),
        meta: {
          title: '菜单管理',
          isHide: false,
          isShowOverview: true,
          icon: "icon-caidan1"
        }
      }, {
        path: '/Backend/SystemManagement/DataDictionary',
        name: 'DataDictionary',
        // component: () => import('@/Views/BackendViews/DataDictionary/index.vue'),
        redirect: '/Backend/SystemManagement/UserManagement1',
        meta: {
          title: '数据字典',
          isHide: false,
          isShowOverview: true,
          icon: "icon-peizhi-xitongpeizhi"
        },
        children: [{
          path: '/Backend/SystemManagement/RoleManagement1',
          name: 'RoleManagement1',
          component: () => import('@/Views/BackendViews/RoleManagement/index.vue'),
          meta: {
            title: '角色管理',
            isHide: false,
            isShowOverview: true,
            icon: "icon-jiaoseguanli"
          }
        }, {
          path: '/Backend/SystemManagement/UserManagement1',
          name: 'UserManagement1',
          component: () => import('@/Views/BackendViews/UserManagement/index.vue'),
          meta: {
            title: '用户管理',
            isHide: false,
            isShowOverview: true,
            icon: "icon-gongzhonghao"
          }
        }, {
          path: '/Backend/SystemManagement/RightsManagement1',
          name: 'RightsManagement1',
          component: () => import('@/Views/BackendViews/RightsManagement/index.vue'),
          meta: {
            title: '权限管理',
            isHide: false,
            isShowOverview: true,
            icon: "icon-bumenguanli"
          }
        }]
      }, {
        path: '/Backend/SystemManagement/UserManagement',
        name: 'UserManagement',
        component: () => import('@/Views/BackendViews/UserManagement/index.vue'),
        meta: {
          title: '用户管理',
          isHide: false,
          isShowOverview: true,
          icon: "icon-gongzhonghao"
        }
      }, {
        path: '/Backend/SystemManagement/RoleManagement',
        name: 'RoleManagement',
        component: () => import('@/Views/BackendViews/RoleManagement/index.vue'),
        meta: {
          title: '角色管理',
          isHide: false,
          isShowOverview: true,
          icon: "icon-jiaoseguanli"
        }
      }, {
        path: '/Backend/SystemManagement/RightsManagement',
        name: 'RightsManagement',
        component: () => import('@/Views/BackendViews/RightsManagement/index.vue'),
        meta: {
          title: '权限管理',
          isHide: false,
          isShowOverview: true,
          icon: "icon-bumenguanli"
        }
      }, {
        path: '/Backend/SystemManagement/OrganizationalStructure',
        name: 'OrganizationalStructure',
        component: () => import('@/Views/BackendViews/OrganizationalStructure/index.vue'),
        meta: {
          title: '组织架构',
          isHide: false,
          isShowOverview: true,
          icon: "icon-bumenguanli1"
        }
      }]
    }, {
      path: '/Backend/CustomerManagement',
      name: 'CustomerManagement',
      redirect: '/Backend/CustomerManagement/CustomerList',
      meta: {
        title: '客户管理',
        isHide: false,
        isShowOverview: true,
        icon: "icon-gerenzhiyeguihua"
      },
      children: [{
        path: '/Backend/CustomerManagement/CustomerList',
        name: 'CustomerList',
        component: () => import('@/Views/BackendViews/CustomerList/index.vue'),
        meta: {
          title: '客户列表',
          isHide: false,
          isShowOverview: true,
          icon: "icon-shifuguanli"
        }
      }, {
        path: '/Backend/CustomerManagement/SalesLeads',
        name: 'SalesLeads',
        component: () => import('@/Views/BackendViews/SalesLeads/index.vue'),
        meta: {
          title: '销售线索',
          isHide: false,
          isShowOverview: true,
          icon: "icon-danse-shuziluansheng"
        }
      }, {
        path: '/Backend/CustomerManagement/Contacts',
        name: 'Contacts',
        component: () => import('@/Views/BackendViews/Contacts/index.vue'),
        meta: {
          title: '联系人记录',
          isHide: false,
          isShowOverview: true,
          icon: "icon-zhenshixingming"
        }
      }, {
        path: '/Backend/CustomerManagement/CustomerTracking',
        name: 'CustomerTracking',
        component: () => import('@/Views/BackendViews/CustomerTracking/index.vue'),
        meta: {
          title: '客户跟进',
          isHide: false,
          isShowOverview: true,
          icon: "icon-yanjianghuibao-xianxing"
        }
      }]
    }]
  }, {
    path: '/Login',
    name: 'Login',
    component: () => import('@/Views/Login/index.vue'),
    meta: {
      title: '登录',
      isHide: true
    }
  }
];
export const errorPages = [
  {
    path: '/:path(.*)*',
    name: 'notFound',
    component: () => import('@/Views/Error/error404.vue'),
    meta: {
      title: 'notFound',
      isHide: true,
    }
  },
  {
    path: '/401',
    name: 'NoPower',
    component: () => import('@/Views/Error/error401.vue'),
    meta: {
      title: 'NoPower',
      isHide: true,
    }
  }
]