class PhotographerCard {
    constructor (photographer) {
        this._photographer = photographer
    }

    createPhotographerCard() {
        const article = document.createElement( 'article' );
        const img = document.createElement( 'img' );
        img.setAttribute("src", `${this._portrait}`);
        const h2 = document.createElement( 'h2' );
        h2.textContent = `${this._name}`;
        article.appendChild(img);
        article.appendChild(h2);

        return article
    }
}