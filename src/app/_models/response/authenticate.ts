export class AuthenticateResponse {
  firstName: string | undefined;
  lastName: string | undefined;
  email: string | undefined;
  jwtToken: string | undefined;
  refreshToken: string | undefined;
}