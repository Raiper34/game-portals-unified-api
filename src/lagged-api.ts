import {BasePortalApi} from "./base-portal-api";

const API_URL = 'https://lagged.com/api/rev-share/lagged.js';

export class LaggedApi extends BasePortalApi {

    get api(): any {
        return (window as any).LaggedAPI;
    }

    init(gameId: string): void { // todo implement also tracking id
        const script = document.createElement('script');
        script.setAttribute('src', API_URL);
        script.setAttribute('type', 'text/javascript');
        document.head.appendChild(script);
        script.addEventListener("load", () => this.api.init(gameId));
    }

    showMidgameAd(gamePauseFn?: () => void, gameResumeFn?: () => void): void {
        gamePauseFn && gamePauseFn();
        this.api.APIAds.show(() => gameResumeFn && gameResumeFn());
    }
}