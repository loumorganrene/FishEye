import { MediaFactory } from "../factories/MediaFactory.js";

const main = document.getElementById("main")
const $mediaWrapper = document.querySelector(".medias-wrapper")
const $LightboxWrapper = document.querySelector('.close_up-wrapper');
const modal = document.getElementById("lightbox_modal")
const closeIcon = document.getElementById("close_lightbox-icon")
const prevIcon = document.getElementById("prev-btn")
const nextIcon = document.getElementById("next-btn")

// keyboard nav on contactForm modal
const focussableElements = `img, video, button, [tabindex]:not([tabindex="-1"]`
const firstFocusableElement = modal.querySelectorAll(focussableElements)[0];
const focusableContent = modal.querySelectorAll(focussableElements);
const lastFocusableElement = focusableContent[focusableContent.length - 1];

export class Lightbox {
    constructor(mediaList, photographer) {
        this._media = mediaList
        this._photographer = photographer
    }

    get mediaTotal() {
        return this._media.length
    }

    setMediaList(mediaList) {
        this._media = mediaList;
    }

    init() {
        $mediaWrapper.addEventListener('click', e => {
            const media = e.target;
            if (media.nodeName == "VIDEO" || media.nodeName == "IMG") {
                const id = Number(media.dataset.id);
                this._index = this._media.findIndex(media_id => media_id.id === id)
                this.render(this._media[this._index])
            }
        });

        nextIcon.addEventListener('click', () => {
            const nextMediaIndex = this._index < this.mediaTotal - 1 ? this._index + 1 : 0
            const nextMedia = this._media[nextMediaIndex]
            this.render(nextMedia);
            this._index = nextMediaIndex
        });

        prevIcon.addEventListener('click', () => {
            const prevMediaIndex = this._index > 0 ? this._index - 1 : this.mediaTotal - 1
            const prevMedia = this._media[prevMediaIndex]
            this.render(prevMedia);
            this._index = prevMediaIndex
        });

        closeIcon.addEventListener('click', this.closeModal)
        // close contact modal onkeypress "escape"
        closeIcon.addEventListener('keydown', this.keyboardCloseModal)
        // keep focus in the contactForm modal
        document.addEventListener('keydown', this.keyboardNav)
        // init focus on first element
        firstFocusableElement.focus();
    }

    render(media) {
        const docFrag = document.createDocumentFragment();
        $LightboxWrapper.innerHTML = "";

        //const mediaDomElement = new MediaFactory(this._photographer, this._media[this._index]).createMediaCard();
        const mediaDomElement = new MediaFactory(this._photographer, media).createMediaCard();
        if (mediaDomElement.nodeName == "VIDEO") {
            mediaDomElement.setAttribute("controls", "");
        }

        const title = document.createElement('h2');
        title.classList.add("media_title");
        title.textContent = `${media.title}`;

        docFrag.appendChild(mediaDomElement)
        docFrag.appendChild(title)

        $LightboxWrapper.appendChild(docFrag)
        this.displayModal()
    }

    displayModal() {
        document.body.style.position = 'fixed';
        document.body.style.top = `-${window.scrollY}px`;
        main.setAttribute('aria-hidden', 'true')
        modal.style.display = "block"
        modal.setAttribute('aria-hidden', 'false')
        closeIcon.focus();
    }

    closeModal() {
        document.body.style.position = '';
        document.body.style.top = '';
        window.scrollTo(0, parseInt(scrollY || '0') * -1);
        main.setAttribute('aria-hidden', 'false')
        modal.style.display = "none"
        modal.setAttribute('aria-hidden', 'true')
    }

    // keyboard nav in modal
    keyboardNav(e) {
        const isTabPressed = e.key === "Tab" || e.keyCode === 9;
        // if any other key is pressed
        if (!isTabPressed) {
            return;
        }

        if (e.shiftKey) { // if shift+tab is pressed together
            if (document.activeElement === firstFocusableElement) {
                lastFocusableElement.focus(); // focus on last focusable element
                e.preventDefault();
            }
        } else { // if focus on the last focusable element
            if (document.activeElement === lastFocusableElement) {
                firstFocusableElement.focus(); // add focus on first focusable element
                e.preventDefault();
            }
        }
    }

    keyboardCloseModal(e) {
        const isEscPressed = e.key === "Escape" || e.keyCode === 27;
        const isEnterPressed = e.key === "Enter" || e.keyCode === 13;

        if (isEscPressed || isEnterPressed) {
            // Trigger the button element with a click
            this._closeModal();
            // Cancel the default action, if needed
            e.preventDefault();
        }
    }
}

