export interface AppJwtPayload {
  sub: string;
  scope?: string;   // ou roles?: string[] selon ta structure réelle
  exp: number;
  iat: number;
}
