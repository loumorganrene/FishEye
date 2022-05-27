export function mediaVideoPlayOnFocus() {
    videoWrapper.onfocus = () => {
        video.setAttribute("loop", "");
        video.play();
    }
    videoWrapper.onblur = () => {
        video.removeAttribute("loop", "");
        video.pause();
    }
}

        // const videoWrapper = document.querySelector(".media_thumbnail-link")
        // const video = document.querySelector("video")
        // videoWrapper.onfocus = () => {
        //     video.setAttribute("loop", "");
        //     video.play();
        // }
        // videoWrapper.onblur = () => {
        //     video.removeAttribute("loop", "");
        //     video.pause();
        // }