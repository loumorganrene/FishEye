import { MediaApi, PhotographerApi } from "./api/Api.js";
class App {
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
        const photographer = photographersData.find(photographerId)

        function photographerId(photographer) {
            return photographer.id == photographerPageId;
        }

        console.log('----------------');
        console.log(photographerPageId);
        console.log('----------------');
        console.log(photographersData);
        console.log('----------------');
        console.log(photographer);
        console.log('----------------');

    }

}

const app = new App()
app.main()


