// Media constructor pattern
// Parent
export class Media {
    constructor(media) {
        this._id = media.id
        this._photographer = media.photographerId
        this._title = media.title
        this._image = media.image
        this._video = media.video
        this._likes = media.likes
        this._date = media.date
        this._price = media.price
    }

    get id() {
        return this._id
    }

    get photographer() {
        return this._photographer
    }

    get title() {
        return this._title
    }

    get likes() {
        return this._likes
    }

    get date() {
        return this._date
    }

    get price() {
        return this._price
    }
}

export class Photo extends Media {
    constructor(media) {
        super(media)
    }

    get Photo() {
        return  this._image
    }
}

export class Video extends Media {
    constructor(media) {
        super(media)
    }

    get Video() {
        return  this._video
    }
}
