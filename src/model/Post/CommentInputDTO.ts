export class CommentInputDTO {
  constructor (
    private id:string,
    private content:string,
    private postId:string,
    private likeCreatorUserId:string
  ) {}

  public getId = ():string => this.id;

  public getContent = ():string => this.content;

  public getPostId = ():string => this.postId;

  public getLikeCreatorUserId = ():string => this.likeCreatorUserId;

  public setId = (id:string):void => {
    this.id = id;
  }

  public setComment = (comment:string):void => {
    this.content = comment;
  }

  public setPostId = (postId:string):void => {
    this.postId = postId;
  }

  public setLikeCreatorUserId = (likeCreatorUserId:string):void => {
    this.likeCreatorUserId = likeCreatorUserId;
  }
}