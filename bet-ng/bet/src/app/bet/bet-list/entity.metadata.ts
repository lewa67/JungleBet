import { EntityMetadataMap } from '@ngrx/data';
import { Bet } from './bet.model';

export const appEntityMetadata: EntityMetadataMap = {
    Bets: {selectId: (bet: Bet) => bet._id},
  };