import { PairStatus } from "./pairStatus.model";
import { User } from "./user.model";

export interface Pair {
  pairId: string,
  firstUser: User,
  secondUser: User,
  firstUserPairStatus: PairStatus,
  secondUserPairStatus: PairStatus,
};
