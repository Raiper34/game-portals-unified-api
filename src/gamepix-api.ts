import {BasePortalApi, SupportedFunctionalityEnum} from "./base-portal-api";

const API_URL = 'https://integration.gamepix.com/sdk/v3/gamepix.sdk.js';
const SUPPORTED_FUNCTIONALITY = [
    SupportedFunctionalityEnum.MidgameAd,
    SupportedFunctionalityEnum.RewardedAd,
];

export class GamepixApi extends BasePortalApi {

    constructor() {
        super(API_URL, SUPPORTED_FUNCTIONALITY);
    }

    get api(): any {
        return (window as any).GamePix;
    }

    isFunctionalitySupported(functionality: SupportedFunctionalityEnum): boolean {
        return SUPPORTED_FUNCTIONALITY.includes(functionality);
    }

    init(gameId: string): void {
        this.loadApi(() => this.api.init(gameId));
    }

    showMidgameAd(gamePauseFn?: () => void, gameResumeFn?: () => void): void {
        gamePauseFn && gamePauseFn();
        this.api.interstitialAd().then(() => {
            gameResumeFn && gameResumeFn();
        });
    }
}