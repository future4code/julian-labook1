import { POST_TYPE } from '../../data/PostDatabase'; 

export class GetPostOutputDTO {
  constructor (
    private id:string,
    private photo:string,
    private description:string,
    private createdAt:string,
    private type:POST_TYPE,
    private creatorUserId:string
  ) {
    if (this.type === "Normal") {
      this.type = POST_TYPE.NORMAL;
    } else if (this.type === "Event") {
      this.type = POST_TYPE.EVENT;
    } else {
      this.type = POST_TYPE.ANY;
    }
  }

  public getId = ():string => this.id;

  public getPhoto = ():string => this.photo;

  public getDescription = ():string => this.description;

  public getCreatedAt = ():string => this.createdAt;

  public getType = ():POST_TYPE => this.type;

  public getCreatorUserId = ():string => this.creatorUserId;

  public setId = (id:string):void => {
    this.id = id;
  }

  public setPhoto = (photo:string):void => {
    this.photo = photo;
  }

  public setDescription = (description:string):void => {
    this.description = description;
  }

  public setCreatedAt = (createdAt:string):void => {
    this.createdAt = createdAt;
  }

  public setType = (type:POST_TYPE):void => {
    this.type = type;
  }

  public setCreatorUserId = (creatorUserId:string):void => {
    this.creatorUserId = creatorUserId;
  }
}