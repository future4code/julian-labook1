import { GetPostInputDTO } from "./GetPostInputDTO";
import { POST_TYPE } from "../../data/PostDatabase";

export class GetFeedInputDTO {
  constructor (
    private userInputs:GetPostInputDTO[],
    private type:POST_TYPE = POST_TYPE.ANY
  ) {
    if (this.type === "Normal") {
      this.type = POST_TYPE.NORMAL;
    } else if (this.type === "Event") {
      this.type = POST_TYPE.EVENT;
    } else {
      this.type = POST_TYPE.ANY;
    }
  }

  public getUserInputs = ():GetPostInputDTO[] => this.userInputs;

  public getType = ():POST_TYPE => this.type;

  public setUserInputs = (ids:any[]):void => {
    this.userInputs = ids;
  }

  public setType = (type:POST_TYPE):void => {
    this.type = type;
  }
}