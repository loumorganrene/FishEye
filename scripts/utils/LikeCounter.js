export class LikesCounter {
    constructor(mediaList, photographer) {
        this._photographer = photographer
        this._mediaList = mediaList
        this._$likesCountContainer = document.querySelector( '.likesTotal-wrapper' )
        this._currentTotalLikes = this._mediaList.map(media => media.likes).reduce((prev, current) => prev + current, 0)
    }

    update(action) {

        if (action === 'LIKE') {
            this._currentTotalLikes += 1
        } else if (action === 'DISLIKE') {
            this._currentTotalLikes -= 1
        } else {
            throw "Unknow action"
        }

        this._$likesCountContainer.innerHTML = `Total Like = ${this._currentTotalLikes}`
    }
}