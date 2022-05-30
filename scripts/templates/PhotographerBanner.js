export class PhotographerBanner {
    /**
     * @param {Object} photographer 
     */
    constructor (photographer) {
        this._photographer = photographer
    }
    /**
     * @returns {HTMLDOMElements}
     */
    createPhotographerBanner() {
        const docFrag = document.createDocumentFragment();
        const desc = document.createElement( 'div' );
        desc.classList.add( "photographer-page_desc" );

        // Photographer name
        const h1 = document.createElement( 'h1' );
        h1.textContent = `${this._photographer.name}`;

        // Photographer city & country
        const location = document.createElement( 'p' );
        location.classList.add( "location" );
        location.textContent = `${this._photographer.city}, ${this._photographer.country}`;

        // Photographer quote
        const tagline = document.createElement( 'p' );
        tagline.classList.add( "tagline" );
        tagline.textContent = `${this._photographer.tagline}`;

        desc.appendChild(h1)
        desc.appendChild(location);
        desc.appendChild(tagline);

        // Photographer portrait
        const img = document.createElement( 'img' );
        img.classList.add( "photographer_portrait" );
        img.setAttribute( "src", `assets/photographers/portraits/${this._photographer.portrait}` );
        img.setAttribute( "alt", `` );
        
        // Photographer contact 
        const openBtn = document.getElementById("open_contact_modal_btn")
        openBtn.setAttribute('aria-label', `Contactez ${this._photographer.name}`);

        docFrag.appendChild(img);
        docFrag.appendChild(desc);

        return docFrag;
    }
}