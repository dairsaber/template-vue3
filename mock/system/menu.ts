import { MockMethod } from 'vite-plugin-mock'
import { resultSuccess } from '../_util'

const data = [
  {
    name: 'Task',
    path: '/task',
    redirect: '/task/wait',
    component: 'Layout',
    meta: { title: '事项管理', icon: 'svg-notification', noCache: false, link: null },
    children: [
      { name: 'TaskWait', path: 'wait', component: 'biz/task/TaskWait', meta: { title: '待办事项', icon: 'svg-notification', noCache: false, link: null } },
      { name: 'TaskComplete', path: 'complete', component: 'biz/task/TaskComplete', meta: { title: '已办事项', icon: 'svg-notification', noCache: false, link: null } },
    ],
  },
  {
    name: 'Apply',
    path: '/apply',
    redirect: '/apply/plan',
    component: 'Layout',
    meta: { title: '申报管理', icon: 'SolutionOutlined', noCache: false, link: null },
    children: [
      { name: 'ApplyPlan', path: 'plan', component: 'biz/apply/ApplyPlan', meta: { title: '计划申报', icon: 'SolutionOutlined', noCache: false, link: null } },
      { name: 'ApplyCheck', path: 'check', component: 'biz/apply/ApplyCheck', meta: { title: '申报审核', icon: 'SolutionOutlined', noCache: false, link: null } },
    ],
  },

  {
    name: 'repository',
    path: '/repository',
    redirect: '/repository/manager',
    component: 'Layout',
    meta: { title: '仓库管理', icon: 'GroupOutlined', noCache: false, link: null },
    children: [
      { name: 'RepositoryManager', path: 'manager', component: 'biz/repository/RepositoryManager', meta: { title: '仓库管理', icon: 'GroupOutlined', noCache: false, link: null } },
      { name: 'RepositoryIn', path: 'in', component: 'biz/repository/RepositoryIn', meta: { title: '物料入库', icon: 'ImportOutlined', noCache: false, link: null } },
      { name: 'RepositoryCheck', path: 'check', component: 'biz/repository/RepositoryCheck', meta: { title: '入库复核', icon: 'FileSearchOutlined', noCache: false, link: null } },
      { name: 'RepositoryOut', path: 'out', component: 'biz/repository/RepositoryOut', meta: { title: '物料出库', icon: 'ExportOutlined', noCache: false, link: null } },
      { name: 'RepositoryMove', path: 'move', component: 'biz/repository/RepositoryMove', meta: { title: '物料转移', icon: 'MergeCellsOutlined', noCache: false, link: null } },
      { name: 'RepositoryApply', path: 'apply', component: 'biz/repository/RepositoryApply', meta: { title: '物料申领', icon: 'SolutionOutlined', noCache: false, link: null } },
      { name: 'RepositoryBack', path: 'back', component: 'biz/repository/RepositoryBack', meta: { title: '物料申退', icon: 'LogoutOutlined', noCache: false, link: null } },
      { name: 'RepositoryInventory', path: 'inventory', component: 'biz/repository/RepositoryInventory', meta: { title: '仓库盘点', icon: 'DotChartOutlined', noCache: false, link: null } },
    ],
  },
  {
    name: 'ledger',
    path: '/ledger',
    redirect: '/ledger/in',
    component: 'Layout',
    meta: { title: '台账管理', icon: 'ProfileOutlined', noCache: false, link: null },
    children: [
      { name: 'LedgerIn', path: 'in', component: 'biz/object/LedgerIn', meta: { title: '入库台账', icon: 'PayCircleOutlined', noCache: false, link: null } },
      { name: 'LedgerOut', path: 'out', component: 'biz/object/LedgerOut', meta: { title: '出库台账', icon: 'PayCircleOutlined', noCache: false, link: null } },
      { name: 'LedgerStock', path: 'stock', component: 'biz/object/LedgerStock', meta: { title: '库存台账', icon: 'ReconciliationOutlined', noCache: false, link: null } },
      { name: 'LedgerInventory', path: 'inventory', component: 'biz/object/LedgerInventory', meta: { title: '盘点台账', icon: 'InsertRowBelowOutlined', noCache: false, link: null } },
    ],
  },
  {
    name: 'statistic',
    path: '/statistic',
    redirect: '/statistic/repository',
    component: 'Layout',
    meta: { title: '统计信息', icon: 'AreaChartOutlined', noCache: false, link: null },
    children: [{ name: 'RepositoryStatistic', path: 'repository', component: 'biz/statistic/StatisticRepository', meta: { title: '物料统计', icon: 'AreaChartOutlined', noCache: false, link: null } }],
  },
  {
    name: 'Object',
    path: '/object',
    redirect: '/object/manager',
    component: 'Layout',
    meta: { title: '物料管理', icon: 'InsertRowRightOutlined', noCache: false, link: null },
    children: [
      { name: 'ObjectManager', path: 'manager', component: 'biz/object/ObjectManager', meta: { title: '物料登记', icon: 'ReconciliationOutlined', noCache: false, link: null } },
      { name: 'ObjectMarker', path: 'maker', component: 'biz/object/ObjectMarker', meta: { title: '物料品牌', icon: 'WalletOutlined', noCache: false, link: null } },
    ],
  },
  {
    name: 'System',
    path: '/system',
    hidden: false,
    redirect: 'noRedirect',
    component: 'Layout',
    meta: { title: '系统管理', icon: 'system', noCache: false, link: null },
    children: [
      { name: 'User', path: 'user', hidden: false, component: 'system/user/UserManager', meta: { title: '用户管理', icon: 'user', noCache: false, link: null } },
      { name: 'Role', path: 'role', hidden: false, component: 'system/role/index', meta: { title: '角色管理', icon: 'peoples', noCache: false, link: null } },
      { name: 'Menu', path: 'menu', hidden: false, component: 'system/menu/index', meta: { title: '菜单管理', icon: 'tree-table', noCache: false, link: null } },
      { name: 'Dept', path: 'dept', hidden: false, component: 'system/dept/index', meta: { title: '部门管理', icon: 'tree', noCache: false, link: null } },
      { name: 'Post', path: 'post', hidden: true, component: 'system/post/index', meta: { title: '岗位管理', icon: 'post', noCache: false, link: null } },
      { name: 'Dict', path: 'dict', hidden: false, component: 'system/dict/index', meta: { title: '字典管理', icon: 'dict', noCache: false, link: null } },
      { name: 'Config', path: 'config', hidden: true, component: 'system/config/index', meta: { title: '参数设置', icon: 'edit', noCache: false, link: null } },
      { name: 'Notice', path: 'notice', hidden: true, component: 'system/notice/index', meta: { title: '通知公告', icon: 'message', noCache: false, link: null } },
      {
        name: 'Log',
        path: 'log',
        hidden: true,
        redirect: 'noRedirect',
        component: 'ParentView',

        meta: { title: '日志管理', icon: 'log', noCache: false, link: null },
        children: [
          { name: 'Operlog', path: 'operlog', hidden: false, component: 'monitor/operlog/index', meta: { title: '操作日志', icon: 'form', noCache: false, link: null } },
          { name: 'Logininfor', path: 'logininfor', hidden: false, component: 'monitor/logininfor/index', meta: { title: '登录日志', icon: 'logininfor', noCache: false, link: null } },
        ],
      },
    ],
  },
]

export default [
  {
    url: '/dev-api/getRouters',
    timeout: 500,
    method: 'get',
    response: () => {
      return resultSuccess(data)
    },
  },
] as MockMethod[]
