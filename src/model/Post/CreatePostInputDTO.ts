import { TYPE } from "../../data/PostDatabase";

export class CreatePostInputDTO {
  constructor(
    private id:string,
    private photo:string,
    private description:string,
    private type:TYPE,
    private creatorUserId:string
  ) {}

  public getId = ():string => this.id;

  public getPhoto = ():string => this.photo;

  public getDescription = ():string => this.description;

  public getType = ():TYPE => this.type;

  public getCreatorUserId = ():string => this.creatorUserId;

  public setId = (id:string):void => {
    this.id = id;
  }

  public setPhoto = (photo:string):void => {
    this.photo = photo;
  }

  public setDescription = ():void => {
    this.description = this.description
  }

  public setType = (type:TYPE):void => {
    this.type = type;
  }

  public setCreatorUserId = (creatorUserId:string):void => {
    this.creatorUserId = creatorUserId;
  }
}