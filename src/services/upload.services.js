import service from "./config.services";

const uploadPictureService = (pictureFile) => {
    return service.post("/upload",pictureFile)
   }

const uploadAudioService = (audioFile) => {
    return service.post("upload/uploadAudio", audioFile)
}
   export {
       uploadPictureService,
       uploadAudioService
   }