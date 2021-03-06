import * as jwt from "jsonwebtoken";

export interface AuthenticationData {
  id: string;
  device?: string;
}

export class Authenticator {
  public generateToken = (
    input: AuthenticationData,
    expiresIn: string = "10min"
  ): string => {
    const token = jwt.sign(input, process.env.JWT_KEY as string, { expiresIn });
    return token;
  };

  public getData = (token: string): AuthenticationData => {
    const payload = jwt.verify(token, process.env.JWT_KEY as string) as any;
    return payload;
  };
}
