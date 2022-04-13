class PhotographerCard {
    constructor (photographer) {
        this._photographer = photographer
    }

    createPhotographerCard() {
        const $wrapper= document.createElement( 'article' );

        const img = document.createElement( 'img' );
        img.setAttribute("src", `assets/photographers/portraits/${this._photographer.portrait}`);
        const h2 = document.createElement( 'h2' );
        h2.textContent = `${this._photographer.name}`;
        const location = document.createElement( 'p' );
        location.textContent = `${this._photographer.city}, ${this._photographer.country}`;
        const price = document.createElement( 'p' );
        price.textContent = `${this._photographer.price}€`;
        $wrapper.appendChild(img);
        $wrapper.appendChild(h2);
        $wrapper.appendChild(location);
        $wrapper.appendChild(price);

        return $wrapper
    }
}