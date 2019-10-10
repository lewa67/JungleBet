import {Injectable} from '@angular/core';
import {EntityCollectionServiceBase, EntityCollectionServiceElementsFactory} from '@ngrx/data';
import {Bet} from './bet.model';


@Injectable()
export class BetEntityService
    extends EntityCollectionServiceBase<Bet> {

    constructor(
        serviceElementsFactory:
            EntityCollectionServiceElementsFactory) {

        super('Bets', serviceElementsFactory);

    }

}