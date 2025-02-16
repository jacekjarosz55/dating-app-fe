import { PairStatus } from "./pairStatus.model";

export interface Pair {
  pairId: string,
  firstUserID: string,
  secondUserID: string,
  firstUserPairStatus: PairStatus,
  secondUserPairStatus: PairStatus,
};
