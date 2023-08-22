import {MUser} from "./User";

export interface AuthAuser extends MUser {
  token: string;
}
