import { PhotographerApi } from "./api/Api.js";
import { PhotographerCard } from "./templates/PhotographerCard.js";
class App {
    constructor() {
        this.$photographersWrapper = document.querySelector('.photographer_section')
        this.photographersApi = new PhotographerApi('data/photographers.json')
    }

    async main() {
        const photographersData = await this.photographersApi.getPhotographers()

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


