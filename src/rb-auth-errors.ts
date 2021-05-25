/**
 * RefreshToken Errors
 */
enum RBAuthErrors {
  INVALID_GRANT = 'invalid_grant',
  REFRESH_TOKEN_REVOKED = 'refreshTokenRevoked',
  REFRESH_TOKEN_NOT_PRESENT = 'noRefreshToken',
  UNAUTHORIZED = 'Unauthorized',
  TOO_MANY_REQUESTS = 'Too Many Requests',
  FAILLED_TO_FETCH = 'failled to fetch',
  UNKNOWN = 'UNKNOWN',
}

export {
  //
  RBAuthErrors,
}
