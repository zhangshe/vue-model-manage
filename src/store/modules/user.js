import { login, LoginNew, logout, getInfo } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'
const getDefaultState = () => {
  return {
    token: getToken(),
    name: '',
    avatar: '',
    orgId: '',
    orgName: '',
    orgCode: '',
    userId: '',
    roleIds: '',
    menus: '',
    pageElement: ''
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_ORG_NAME: (state, orgName) => {
    state.orgName = orgName
  },
  SET_ORG_ID: (state, orgId) => {
    state.orgId = orgId
  },
  SET_ORG_CODE: (state, orgCode) => {
    state.orgCode = orgCode
  },
  SET_USER_ID: (state, userId) => {
    state.userId = userId
  },
  SET_ROLE_IDS: (state, roleIds) => {
    state.roleIds = roleIds
  },
  SET_MENUS: (state, menus) => {
    state.menus = menus
  },
  SET_PAGEELEMENT: (state, pageElement) => {
    state.pageElement = pageElement
  }
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { userId } = userInfo
    return new Promise((resolve, reject) => {
      login({ userId: userId.trim() }).then(response => {
        // const { Data } = response
        // commit('SET_TOKEN', data.token)
        // setToken(data.token)
        commit('SET_TOKEN', response.Data.UserId)
        setToken(response.Data.UserId)
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  LoginNew({ commit }, userInfo) {
    const { DepartmentName, Account, UnitName, UserName } = userInfo
    return new Promise((resolve, reject) => {
      LoginNew({ DepartmentName: DepartmentName.trim(), Account: Account.trim(), UnitName: UnitName.trim(), UserName: UserName.trim() }).then(response => {
        // const { Data } = response
        // commit('SET_TOKEN', data.token)
        // setToken(data.token)
        commit('SET_TOKEN', response.Data.UserId)
        setToken(response.Data.UserId)
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo({ userid: state.token }).then(response => {
        const { Data } = response
        if (!Data) {
          reject('验证失败！请重新登录')
        }
        const { UserName, OrgName, OrgId, OrgCode, RoleIds, UserId, Menus, PageElement } = Data
        commit('SET_NAME', UserName)
        commit('SET_ORG_NAME', OrgName)
        commit('SET_ORG_ID', OrgId)
        commit('SET_ORG_CODE', OrgCode)
        commit('SET_USER_ID', UserId)
        commit('SET_ROLE_IDS', RoleIds)
        commit('SET_MENUS', Menus)
        commit('SET_PAGEELEMENT', PageElement)
        // commit('SET_AVATAR', avatar)
        resolve(Data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        removeToken() // must remove  token  first
        resetRouter()
        commit('RESET_STATE')
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      commit('RESET_STATE')
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
