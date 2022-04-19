class PhotographerCard {
    constructor (photographer) {
        this._photographer = photographer
    }

    createPhotographerCard() {
        const $wrapper= document.createElement( 'article' );

        const img = document.createElement( 'img' );
        img.setAttribute( "src", `assets/photographers/portraits/${this._photographer.portrait}` );
        img.setAttribute( "alt", `${this._photographer.name}` );
        const h2 = document.createElement( 'h2' );
        h2.textContent = `${this._photographer.name}`;
        const location = document.createElement( 'p' );
        location.classList.add( "location" );
        location.textContent = `${this._photographer.city}, ${this._photographer.country}`;
        const tagline = document.createElement( 'p' );
        tagline.classList.add( "tagline" );
        tagline.textContent = `${this._photographer.tagline}`;
        const price = document.createElement( 'p' );
        price.classList.add( "price" );
        price.textContent = `${this._photographer.price}€/jour`;
        $wrapper.appendChild(img);
        $wrapper.appendChild(h2);
        $wrapper.appendChild(location);
        $wrapper.appendChild(tagline);
        $wrapper.appendChild(price);

        return $wrapper
    }
}