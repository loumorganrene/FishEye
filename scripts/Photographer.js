import { MediaApi, PhotographerApi } from "./api/Api.js";
import { Photographer } from "./models/PhotographersModel.js";
import { PhotographerBanner } from "./templates/PhotographerBanner.js";
import { ContactForm } from "./utils/ContactForm.js";

export class App {
    constructor() {
        this.$bannerWrapper = document.querySelector('.photograph-header')
        this.photographersApi = new PhotographerApi('data/photographers.json')
        this.mediasApi = new MediaApi('data/photographers.json')
    }


    async main() {
        const photographersData = await this.photographersApi.getPhotographers()
        //Fetch photographerId from Url
        const url = new URL(window.location.href);
        const photographerPageId = url.searchParams.get('id')
        //Fetch photographer data by id
        const photographerApiId = photographersData.find(photographerId)
        function photographerId(photographer) {
            return photographer.id == photographerPageId
        }
        //Format photographer data
        const photographer = new Photographer(photographerApiId)

        //Apply template for the photogapher page banner
        const Template = new PhotographerBanner(photographer)
        this.$bannerWrapper.appendChild(Template.createPhotographerBanner())

        //Init eventListener contact form
        ContactForm.init()
        //Add photographer name to the contact me title
        document.getElementById('contact_me').innerHTML = `Contactez-moi <br> ${photographer.name}`
    }

}

const app = new App()
app.main()



