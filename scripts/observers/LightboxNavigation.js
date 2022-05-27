export class LightboxNavigation {
    constructor(mediaList, photographer) {
        this._photographer = photographer
        this._mediaList = mediaList
    }

    update(action) {
        this._mediaIndex = mediaList
        if (action === 'PREC') {
            this._media[i] += 1
        } else if (action === 'NEXT') {
            this._media[i] -= 1
        } else {
            throw "Unknow action"
        }

        this._$likesCountContainer.innerHTML = `${this._currentTotalLikes}`
    }

}