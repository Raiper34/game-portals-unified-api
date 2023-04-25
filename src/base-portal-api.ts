export abstract class BasePortalApi {

    init(gameId: string): void {
        throw new Error('init method not implemented');
    }

    showMidgameAd(gamePauseFn?: () => void, gameResumeFn?: () => void): void {
        throw new Error('showMidgameAd method not implemented');
    }

    showRewardedAd(gamePauseFn?: () => void, gameResumeFn?: () => void): void {
        throw new Error('showRewardedAd method not implemented');
    }
}