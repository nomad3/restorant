import Types from './Types'


const attemptLogin = (username, password) =>
  ({ type: Types.LOGIN_ATTEMPT, username, password })

const loginSuccess = (username) =>
  ({ type: Types.LOGIN_SUCCESS, username })

const loginFailure = (errorCode) =>
  ({ type: Types.LOGIN_FAILURE, errorCode })

const logout = () => ({ type: Types.LOGOUT })

const startup = () => ({ type: Types.STARTUP })

const requestTemperature = (city) => ({ type: Types.TEMPERATURE_REQUEST, city })
const receiveTemperature = (temperature) => ({ type: Types.TEMPERATURE_RECEIVE, temperature })
const receiveTemperatureFailure = () => ({ type: Types.TEMPERATURE_FAILURE })

const updateCart = (index,qty) => ({ type: Types.CART_UPDATE,index,qty})
const addCart = (item) => ({ type: Types.CART_ADD,item})
const clearCart = () => ({ type: Types.CART_CLEAR})



/**
 Makes available all the action creators we've created.
 */
export default {
  updateCart,
  addCart,
  clearCart,
  attemptLogin,
  loginSuccess,
  loginFailure,
  logout,
  startup,
  requestTemperature,
  receiveTemperature,
  receiveTemperatureFailure
}
