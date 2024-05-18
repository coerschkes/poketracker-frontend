/**
 * PAYLOADS USED FOR REQUEST AGAINST THE FIREBASE API
 */
export interface BasicAuthenticationPayload {
  email: string
  password: string
  returnToken: boolean
}

export interface TokenAuthenticationPayload {
  token: string
  returnSecureToken: boolean
}

export interface RefreshTokenPayload {
  grant_type: string
  refresh_token: string
}

/**
 * RESPONSES FROM THE FIREBASE API
 */

export interface SignUpResponse {
  idToken: string
  email: string
  refreshToken: string
  kind: string,
  expiresInSeconds: string
  localId: string
}

export interface TokenLoginResponse {
  idToken: string
  refreshToken: string
  expiresInSeconds: string
}

export interface BasicLoginResponse {
  idToken: string
  email: string
  refreshToken: string
  kind: string
  expiresInSeconds: string
  localId: string
  inUse: boolean
}

export interface RefreshTokenResponse {
  idToken: string
  userId: string
  projectId: string
  refreshToken: string
  tokenType: string
  expiresInSeconds: string
}
