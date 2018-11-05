import { authUtils } from '../../authUtils'

export const directiveResolvers = {
  isAuthenticated: (next, source, args, context) => {
    if (authUtils.isAuthenticated(context)) {
      return next()
    }
    else{
      throw new Error('User not authorized :(')
    }
  }
}
