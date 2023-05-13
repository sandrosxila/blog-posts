export type JwtPayload = {
  sub: number;
  firstName: string;
  lastName: string;
  email: string;
  photo: string;
  exp?: number;
  iat?: number;
};
