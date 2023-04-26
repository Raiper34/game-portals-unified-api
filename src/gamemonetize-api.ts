import {BasePortalApi, SupportedFunctionalityEnum} from "./base-portal-api";

const API_URL = 'https://api.gamemonetize.com/sdk.js';
const SUPPORTED_FUNCTIONALITY = [
    SupportedFunctionalityEnum.MidgameAd,
];

export class GamemonetizeApi extends BasePortalApi {

    gamePauseFn?: () => void;
    gameResumeFn?: () => void;

    constructor() {
        super(API_URL, SUPPORTED_FUNCTIONALITY);
    }

    init(gameId: string): void {
        (window as any).SDK_OPTIONS = {
            gameId,
            onEvent: (a: any) => {
                switch (a.name) {
                    case "SDK_GAME_PAUSE":
                        this.gamePauseFn && this.gamePauseFn();
                        this.gamePauseFn = undefined;
                        break;
                    case "SDK_GAME_START":
                        this.gameResumeFn && this.gameResumeFn();
                        this.gameResumeFn = undefined;
                        break;
                }
            }
        };
        ((a: any, b: any, c: any) => {
            const d = a.getElementsByTagName(b)[0];
            a.getElementById(c) || (a = a.createElement(b), a.id = c, a.src = this.apiUrl, d.parentNode.insertBefore(a, d))
        })(document, "script", "gamemonetize-sdk");
    }

    showMidgameAd(gamePauseFn?: () => void, gameResumeFn?: () => void): void {
        const sdk = (window as any).sdk;
        if (typeof sdk !== 'undefined' && sdk.showBanner !== 'undefined') {
            this.gamePauseFn = gamePauseFn;
            this.gameResumeFn = gameResumeFn;
            sdk.showBanner();
        }
    }
}