export const UserThirdPartAccount = `
  enum ThirdPartyAccount {
    STRIPE,
    EVIDENT
  }

  type UserThirdPartyAccount {
    id: ID! @unique
    type: ThirdPartyAccount!
    referenceId: String!
  }
`
