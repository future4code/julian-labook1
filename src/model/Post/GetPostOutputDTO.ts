import { POST_TYPE } from '../../data/PostDatabase'; 
import { CommentOutputDTO } from './CommentOutputDTO';

export class GetPostOutputDTO {
  constructor (
    private id:string,
    private photo:string,
    private description:string,
    private createdAt:string,
    private type:string,
    private creatorUserId:string,
    private comments:CommentOutputDTO[]
  ) {
    if (this.type === "Event") {
      this.type = POST_TYPE.EVENT;
    } else {
      this.type = POST_TYPE.NORMAL;
    }
  }

  public getId = ():string => this.id;

  public getPhoto = ():string => this.photo;

  public getDescription = ():string => this.description;

  public getCreatedAt = ():string => this.createdAt;

  public getType = ():string => this.type;

  public getCreatorUserId = ():string => this.creatorUserId;

  public getComments = ():CommentOutputDTO[] => this.comments;

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

  public setComments = (comments:CommentOutputDTO[]):void => {
    this.comments = comments;
  }
}