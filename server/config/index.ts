export * from './evident'
export * from './stripe'

export const config = {
    appSecret: "arcade-city-secret-key-232412123",
    accessTokenExpiryTime: 24 * 60 * 60 * 1000,
    refreshTokenExpiryTime: 7 * 24 * 60 * 60 * 1000
}