class Index {
    constructor() {
        this.$photographersWrapper = document.querySelector(".photographer_section")
        this.photographersApi = new PhotographerApi("/data/photographers.json")
    }

    async main() {
        const photographers = await this.photographersApi.getPhotographers()

        photographers
            .forEach(photographer => {
            const Templates = new PhotographerCard(photographer)
            this.$photographersWrapper.appendChild(Templates.createPhotographerCard())
        })
    }
}

const index = new Index()
index.main()
    