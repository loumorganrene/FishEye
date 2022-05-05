// Media constructor pattern
// Parent
export class Media {
    constructor(medias) {
        this._id = medias.id
        this._photographer = medias.photographerId
        this._photo = medias.image
        this._video = medias.video
        this._title = medias.title
        this._likes = medias.likes
        this._date = medias.date
        this._price = medias.price
    }

    get id() {
        return this._id
    }

    get photographer() {
        return this._photographer
    }

    get media() {
        if (media.image) {
            return this._image;
        } else if (this.media.video) {
            return this._video;
        }
        return console.error("Je pige pas");
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

// export class Photo extends Media {
//     constructor(medias) {
//         super(medias)
//         this._image = medias.image
//     }

//     get image() {
//         return thumbnail.setAttribute( "src", `assets/photographers/${this._photographer.name}/${this._image}` );
//     }
// }

// export class Video extends Media {
//     constructor(medias) {
//         super(medias)
//         this._video = medias.video
//     }

//     get video() {
//         return thumbnail.setAttribute( "src", `assets/photographers/${this._photographer.name}/${this._video}` );
//     }
// }
