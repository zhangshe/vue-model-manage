const getters = {
  sidebar: state => state.app.sidebar,
  language: state => state.app.language,
  size: state => state.app.size,
  device: state => state.app.device,
  visitedViews: state => state.tagsView.visitedViews,
  cachedViews: state => state.tagsView.cachedViews,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  orgId: state => state.user.orgId,
  orgName: state => state.user.orgName,
  orgCode: state => state.user.orgCode,
  userId: state => state.user.userId,
  roleIds: state => state.user.roleIds,
  permission_routes: state => state.permission.routes,
  menus: state => state.user.menus,
  pageElement: state => state.user.pageElement
}
export default getters
