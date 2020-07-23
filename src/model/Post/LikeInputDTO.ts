export class LikeInputDTO {
  constructor (
    private postId:string,
    private likeCreatorUserId:string
  ) {}

  public getPostId = ():string => this.postId;

  public getLikeCreatorUserId = ():string => this.likeCreatorUserId;

  public setPostId = (postId:string):void => {
    this.postId = postId;
  }

  public setLikeCreatorUserId = (likeCreatorUserId:string):void => {
    this.likeCreatorUserId = likeCreatorUserId;
  }
}