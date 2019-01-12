import {ModelAndMetadataContainer} from './Model'
import {stream_preprocessor, stream_executor, getRequiredMetadata} from './Common'

class StreamInfenrece {
    constructor(url, uiHandler) {
        this.uiHandler = uiHandler
        this.preprocessedInput = []
        this.textData = []
        this.model = new ModelAndMetadataContainer(url, uiHandler)
        this.model.init()
    }

    init(textData) {
        var mtd = getRequiredMetadata(this.model.mtd_data)
        this.uiHandler("Preprocessing Inputs....")
        this.preprocessedInput = stream_preprocessor(textData, mtd)
        this.textData = textData
    }

    computeResult(resultObjects) {
        let totalPositive = 0.0
        let totalNegative = 0.0
        let countPositive = 0
        let countNegative = 0
        let totalTime = 0

        for(var i = 0; i < resultObjects.length; i++) {
            var object = resultObjects[i]

            totalTime += object.time
            totalPositive += object.metadata.percentagePositive
            totalNegative += object.metadata.percentageNegative

            if(object.metadata.result === 'Pos') countPositive +=1
            else countNegative +=1
        }

        return {
            "averagePositive" : totalPositive / resultObjects.length,
            "averageNegative" : totalNegative / resultObjects.length,
            "totalPositive" : countPositive,
            "totalNegative" : countNegative,
            "goodnessRatio" : countPositive / (countNegative + countPositive),
            "totalTime" : totalTime,
            "results" : resultObjects,
            "textData" : this.textData
        }
    }

    run() {
        this.uiHandler("Running inference in batch mode...")
        var resultObjects = stream_executor(this.preprocessedInput ,this.model.model)
        this.uiHandler("Computing result statistics ...")
        return this.computeResult(resultObjects)
    }

}

export default StreamInfenrece