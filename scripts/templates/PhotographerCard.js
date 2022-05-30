export class PhotographerCard {
    /**
     * @param {Object} photographer 
     */
    constructor (photographer) {
        this._photographer = photographer
    }
    /**
     * @returns {HTMLDOMElements}
     */
    createPhotographerCard() {
        const docFrag = document.createDocumentFragment();
        const $wrapper = document.createElement( 'article' );

        // First section of a photographer card
        const figure = document.createElement( 'figure' );
        figure.classList.add( "photographer_pres" );
        figure.setAttribute( "role",  "figure" );
        figure.setAttribute( "aria-label", `${this._photographer.name}` );

        // Link to photographer page
        const a = document.createElement( 'a' );
        a.setAttribute( "href",  `photographer.html?id=${this._photographer.id}` );
        figure.appendChild(a);

        // Photographer portrait
        const img = document.createElement( 'img' );
        img.setAttribute( "src", `assets/photographers/portraits/${this._photographer.portrait}` );
        img.setAttribute( "alt", `Visiter la page photographe ` );

        // Photographer name
        const h2 = document.createElement( 'figcaption' );
        h2.textContent = `${this._photographer.name}`;
        h2.setAttribute( "id",  `${this._photographer.id}` );

        // Push portrait & name in link
        a.appendChild(img);
        a.appendChild(h2);

        // Seconde section of a photographer card
        const desc = document.createElement( 'div' );
        desc.classList.add( "photographer_desc" );

        // Photographer city & country
        const location = document.createElement( 'p' );
        location.classList.add( "location" );
        location.textContent = `${this._photographer.city}, ${this._photographer.country}`;

        // Photographer quote
        const tagline = document.createElement( 'p' );
        tagline.classList.add( "tagline" );
        tagline.textContent = `${this._photographer.tagline}`;

        // Photographer price per day
        const price = document.createElement( 'p' );
        price.classList.add( "price" );
        price.textContent = `${this._photographer.price}€/jour`;

        // Push portrait & name in link
        desc.appendChild(location);
        desc.appendChild(tagline);
        desc.appendChild(price);

        // Push first & second section into Docfragment
        $wrapper.appendChild(figure);
        $wrapper.appendChild(desc);

        // Push DocfragmentElement into 
        docFrag.appendChild($wrapper);

        return docFrag;
    }
}