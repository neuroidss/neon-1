import * as jwt from 'jsonwebtoken'

export const config = {
  appSecret: "arcade-city-secret-key-232412123",
  accessTokenExpiryTime: 24 * 60 * 60 * 1000,
  refreshTokenExpiryTime: 7 * 24 * 60 * 60 * 1000
}

const getUserId = (accessToken) => {
  if (accessToken) {
    const token = accessToken.replace('Bearer ', '')
    try {
      const { id } = jwt.verify(token, config.appSecret)
      console.log('Grabbed id ' + id + ' from token')
      if (!id) {
        return null
      }
      return id
    }
    catch(err){
      return null
    }
  }
  return null
}

const isAuthenticated = (context) => {
  const accessToken = getAuthorizationHeader(context.req)
  const userId = getUserId(accessToken)
  return !!userId
}

const getAuthorizationHeader = (req) => {
  return req.get('Authorization')
}

export const authUtils = {
  isAuthenticated: isAuthenticated
}
