import {BasePortalApi, SupportedFunctionalityEnum} from "./base-portal-api";

const API_URL = 'https://html5.api.gamedistribution.com/main.min.js';
const SUPPORTED_FUNCTIONALITY = [
    SupportedFunctionalityEnum.MidgameAd,
    SupportedFunctionalityEnum.RewardedAd,
];

export class GamedistributeApi extends BasePortalApi {

    gamePauseFn?: () => void;
    gameResumeFn?: () => void;

    constructor() {
        super(API_URL, SUPPORTED_FUNCTIONALITY);
    }

    init(gameId: string): void {
        (window as any)["GD_OPTIONS"] = {
            gameId,
            onEvent: (event: any) => {
                switch (event.name) {
                    case "SDK_GAME_START":
                        this.gameResumeFn && this.gameResumeFn();
                        this.gameResumeFn = undefined;
                        break;
                    case "SDK_GAME_PAUSE":
                        this.gamePauseFn && this.gamePauseFn();
                        this.gamePauseFn = undefined;
                        break;
                }
            },
        };
        ((d, s, id) => {
            let js, fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) return;
            js = d.createElement(s) as HTMLScriptElement;
            js.id = id;
            js.src = this.apiUrl;
            fjs.parentNode!.insertBefore(js, fjs);
        })(document, 'script', 'gamedistribution-jssdk');
    }

    showMidgameAd(gamePauseFn?: () => void, gameResumeFn?: () => void): void {
        const gdsdk = (window as any).gdsdk;
        if (typeof gdsdk !== 'undefined' && gdsdk.showAd !== 'undefined') {
            this.gamePauseFn = gamePauseFn;
            this.gameResumeFn = gameResumeFn;
            gdsdk.showAd();
        }
    }
}