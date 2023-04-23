import {BasePortalApi} from "./base-portal-api";

export class GamedistributeApi extends BasePortalApi {

    gamePauseFn?: () => void;
    gameResumeFn?: () => void;

    init(gameId: string): void {
        window["GD_OPTIONS"] = {
            gameId,
            onEvent: (event) => {
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
        (function(d, s, id) {
            var js, fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) return;
            js = d.createElement(s);
            js.id = id;
            js.src = 'https://html5.api.gamedistribution.com/main.min.js';
            fjs.parentNode!.insertBefore(js, fjs);
        }(document, 'script', 'gamedistribution-jssdk'));
    }

    showMidgameAd(gamePauseFn?: () => void, gameResumeFn?: () => void): void {
        const gdsdk = (window as any).gdsdk;
        if (typeof gdsdk !== 'undefined' && gdsdk.showAd !== 'undefined') {
            this.gamePauseFn = gamePauseFn;
            this.gameResumeFn = gameResumeFn;
            gdsdk.showAd();
        }
    }

    showRewardedAd(gamePauseFn?: () => void, gameResumeFn?: () => void): void {
        const gdsdk = (window as any).gdsdk;
        if (gdsdk !== 'undefined' && gdsdk.showAd !== 'undefined') {
            gdsdk.showAd('rewarded')
                .then(response => { // todo
                    // Ad process done. You can track "SDK_REWARDED_WATCH_COMPLETE" event if that event triggered, that means the user watched the advertisement completely, you can give reward there.
                })
                .catch(error => { // todo
                    // An error catched. Please don't give reward here.
                });
        }
    }
}