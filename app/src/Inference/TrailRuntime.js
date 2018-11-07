import * as tf from '@tensorflow/tfjs'
import {ModelAndMetadataContainer} from './Model'
import {inference, getRequiredMetadata, preprocessor} from './Common'

class TrailRuntime {

    constructor(uiHandler, urls) {
        this.uiHandler = uiHandler
        this.container = new ModelAndMetadataContainer(urls, this.uiHandler);
        this.container.init()
    }


    runPredictions(text) {
        let metadata = getRequiredMetadata(this.container.mtd_data)
        console.log(metadata)
        this.uiHandler("Running the model...")
        return inference( preprocessor(text, metadata), this.container.model)
    }

}

export default TrailRuntime