export const userQuery = `{
  id
  firstName
  lastName
  userType
  username
  emailAddress
  isAuthorized
  bio
  phone
  photo
  thirdPartyAccounts {
    id
    type
    referenceId
  }
}`
