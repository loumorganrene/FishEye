import { PhotographerApi } from "./api/Api.js";
import { PhotographerCard } from "./templates/PhotographerCard.js";
class App {
    constructor() {
        this.$photographersWrapper = document.querySelector('.photographer_section')
        this.photographersApi = new PhotographerApi('data/photographers.json')
    }
    /**
     * @returns {HTMLDOMElements}
     */
    async main() {
        /** Photographer cards display */
        const photographersData = await this.photographersApi.getPhotographers()
        console.log(photographersData)
        photographersData
            .forEach(photographer => {
                const Template = new PhotographerCard(photographer)
                this.$photographersWrapper.appendChild(
                    Template.createPhotographerCard()
                )
        })
    }
}

const app = new App()
app.main()


