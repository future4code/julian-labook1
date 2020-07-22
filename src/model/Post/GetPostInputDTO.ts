import { TYPE } from "../../data/PostDatabase";

export class GetPostInputDTO {
  constructor (
    private id:string,
    private type:TYPE = TYPE.ANY
  ) {}

  public getId = ():string => this.id;

  public getType = ():string => this.type;

  public setId = (id:string):void => {
    this.id = id;
  }

  public setType = (type:TYPE):void => {
    this.type = type;
  }
}