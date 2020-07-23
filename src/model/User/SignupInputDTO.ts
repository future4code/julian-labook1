export class SignupInputDTO {
  constructor(
    private id: string,
    private name: string,
    private email: string,
    private password: string
  ) {}

  public getId = (): string => this.id;

  public getName = (): string => this.name;

  public getEmail = (): string => this.email;

  public getPassword = (): string => this.password;

  public setId = (id: string): void => {
    this.id = id;
  };

  public setName = (name: string): void => {
    this.name = name;
  };

  public setEmail = (email: string): void => {
    this.email = email;
  };

  public setPassword = (password: string): void => {
    this.password = password;
  };
}
