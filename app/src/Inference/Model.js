import * as tf from '@tensorflow/tfjs'

let sendEvent = (message, uiHandler) => {
    console.log(message)
    uiHandler(message)
}

class ModelAndMetadataContainer  {

    constructor(urls, uiHandler) {
        this.model_url = urls.model
        this.metadata_url = urls.metadata
        this.uiHandler = uiHandler
        this.model  = null;
        this.mtd_data = null;
    }


    async asyncLoad() {
        let model = await tf.loadModel(this.model_url)
        sendEvent("Model loaded, now loading Metadata", this.uiHandler)
        this.model = model
    }

    async loadMetadata() {
        let mtd_model = await fetch(this.metadata_url)
        let model_data = await mtd_model.json()
        sendEvent("Metadata Loaded...Finishing...", this.uiHandler)
        this.mtd_data = model_data
    }


    async init() {
        sendEvent("Waiting for Model..", this.uiHandler)
        await this.asyncLoad()
        await this.loadMetadata()
        sendEvent('Status Ok!', this.uiHandler)
    }

}

export {ModelAndMetadataContainer}