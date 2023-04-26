export enum SupportedFunctionalityEnum {
    MidgameAd,
    RewardedAd,
}

export abstract class BasePortalApi {

    constructor(protected readonly apiUrl: string,
                protected readonly supportedFunctionality: SupportedFunctionalityEnum[]) { }

    init(gameId: string): void {
        throw new Error('init method not implemented');
    }

    showMidgameAd(gamePauseFn?: () => void, gameResumeFn?: () => void): void {
        throw new Error('showMidgameAd method not implemented');
    }

    showRewardedAd(gamePauseFn?: () => void, gameResumeFn?: () => void): void {
        throw new Error('showRewardedAd method not implemented');
    }

    isFunctionalitySupported(functionality: SupportedFunctionalityEnum): boolean {
        return this.supportedFunctionality.includes(functionality);
    }

    protected loadApi(onLoadFn: () => void): void {
        const script = document.createElement('script');
        script.setAttribute('src', this.apiUrl);
        script.setAttribute('type', 'text/javascript');
        document.head.appendChild(script);
        script.addEventListener("load", () => onLoadFn);
    }
}