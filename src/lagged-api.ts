import {BasePortalApi, SupportedFunctionalityEnum} from "./base-portal-api";

const API_URL = 'https://lagged.com/api/rev-share/lagged.js';
const SUPPORTED_FUNCTIONALITY = [
    SupportedFunctionalityEnum.MidgameAd,
    SupportedFunctionalityEnum.RewardedAd,
];

export class LaggedApi extends BasePortalApi {

    constructor() {
        super(API_URL, SUPPORTED_FUNCTIONALITY);
    }

    get api(): any {
        return (window as any).LaggedAPI;
    }

    isFunctionalitySupported(functionality: SupportedFunctionalityEnum): boolean {
        return SUPPORTED_FUNCTIONALITY.includes(functionality);
    }

    init(gameId: string): void { // todo implement also tracking id
        this.loadApi(() => this.api.init(gameId));
    }

    showMidgameAd(gamePauseFn?: () => void, gameResumeFn?: () => void): void {
        gamePauseFn && gamePauseFn();
        this.api.APIAds.show(() => gameResumeFn && gameResumeFn());
    }
}