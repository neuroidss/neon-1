export const UserThirdPartAccount = `
  enum ThirdPartyAccount {
    STRIPE,
    EVIDENT
  }

  type UserThirdPartyAccount {
    uid: ID! @unique
    type: ThirdPartyAccount!
    referenceId: String!
  }
`
