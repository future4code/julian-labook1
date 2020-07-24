export class CommentOutputDTO {
  constructor (
    private id:string,
    private content:string,
    private createdAt:string,
    private commentCreatorUserId:string,
    private commentCreatorUserName:string
  ) {}

  public getId = ():string => this.id;

  public getContent = ():string => this.content;

  public getCreatedAt = ():string => this.createdAt;

  public getCommentCreatorUserId = ():string => this.commentCreatorUserId;

  public getCommentCreatorUserName = ():string => this.commentCreatorUserName;

  public setId = (id:string):void => {
    this.id = id;
  }

  public setContent = (content:string):void => {
    this.content = content;
  }

  public setCreatedAt = (createdAt:string):void => {
    this.createdAt = createdAt;
  }

  public setCommentCreatorUserId = (commentCreatorUserId:string):void => {
    this.commentCreatorUserId = commentCreatorUserId;
  }

  public setCommentCreatorUserName = (commentCreatorUserName:string):void => {
    this.commentCreatorUserName = commentCreatorUserName;
  }
}