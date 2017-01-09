// A list of all actions in the system.
import { createTypes } from 'reduxsauce'

export default createTypes(`
  LOGIN_ATTEMPT
  LOGIN_SUCCESS
  LOGIN_FAILURE

  LOGOUT

  STARTUP

  TEMPERATURE_REQUEST
  TEMPERATURE_RECEIVE
  TEMPERATURE_FAILURE

  CART_UPDATE
  CART_ADD
  CART_CLEAR
`)
