export class PhotographerCard {
    constructor (photographer) {
        this._photographer = photographer
    }

    createPhotographerCard() {
        const $wrapper = document.createElement( 'article' );
        $wrapper.setAttribute( "aria-label",  `Carte de ${this._photographer.name}` );

        const figure = document.createElement( 'figure' );
        figure.classList.add( "photographer_pres" );
        figure.setAttribute( "role",  "figure" );
        figure.setAttribute( "aria-label",  `${this._photographer.name}` );
        $wrapper.appendChild(figure);
        const a = document.createElement( 'a' );
        a.setAttribute( "href",  `` );
        figure.appendChild(a);
        const img = document.createElement( 'img' );
        img.setAttribute( "src", `assets/photographers/portraits/${this._photographer.portrait}` );
        img.setAttribute( "alt", `` );
        const h2 = document.createElement( 'figcaption' );
        h2.textContent = `${this._photographer.name}`;
        h2.setAttribute( "id",  `${this._photographer.id}` );

        const desc = document.createElement( 'div' );
        desc.classList.add( "photographer_desc" );
        $wrapper.appendChild(desc);
        const location = document.createElement( 'p' );
        location.classList.add( "location" );
        location.textContent = `${this._photographer.city}, ${this._photographer.country}`;
        const tagline = document.createElement( 'p' );
        tagline.classList.add( "tagline" );
        tagline.textContent = `${this._photographer.tagline}`;
        const price = document.createElement( 'p' );
        price.classList.add( "price" );
        price.textContent = `${this._photographer.price}€/jour`;
        a.appendChild(img);
        a.appendChild(h2);
        desc.appendChild(location);
        desc.appendChild(tagline);
        desc.appendChild(price);

        return $wrapper
    }
}