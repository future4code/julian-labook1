export class GetPostInputDTO {
  constructor (
    private id:string
  ) {}

  public getId = ():string => this.id;

  public setId = (id:string):void => {
    this.id = id;
  }
}