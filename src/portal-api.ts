import {BasePortalApi} from "./base-portal-api";
import {GamemonetizeApi} from "./gamemonetize-api";
import {GamedistributeApi} from "./gamedistribute-api";

export enum ApiType {
    GameMonetize = 'GameMonetize',
    GameDestribute = 'GameDestribute',
}

export class PortalApi {

    static api: BasePortalApi;

    static init(type: ApiType, gameId: string): void {
        switch (type) {
            case ApiType.GameMonetize:
                PortalApi.api = new GamemonetizeApi();
                break;
            case ApiType.GameDestribute:
                PortalApi.api = new GamedistributeApi();
                break;
        }
        PortalApi.api.init(gameId);
    }

    static showMidgameAd(gamePauseFn?: () => void, gameResumeFn?: () => void): void {
        PortalApi.api.showMidgameAd(gamePauseFn, gameResumeFn);
    }

    static showRewardedAd(gamePauseFn?: () => void, gameResumeFn?: () => void): void {
        PortalApi.api.showRewardedAd(gamePauseFn, gameResumeFn);
    }
}