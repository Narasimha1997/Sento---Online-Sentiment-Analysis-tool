import * as tf from '@tensorflow/tfjs'


let getRequiredMetadata = (mtd) => {

    return {
        "indexFrom" : mtd["index_from"],
        "maxlen" : mtd["max_len"],
        "wordIndex" : mtd["word_index"]
    }
}

let preprocessor = (text, mtd) => {
    const inputText = text.trim().toLowerCase().replace(/(\.|\,|\!)/g, '').split(' ');

    let inputVector_float32 = tf.buffer([1, mtd.maxlen], 'float32');

    for(let i = 0; i < inputText.length; i++) {
        const word = inputText[i];
        inputVector_float32.set(mtd.wordIndex[word] + mtd.indexFrom, 0, i);
    }

    return inputVector_float32.toTensor();
}

let inference = (inputTensor_32, model) => {
    let start = performance.now()
    let prediction = model.predict(inputTensor_32)
    let score = prediction.dataSync()[0]
    //garbage collector :

    prediction.dispose()

    let end = performance.now()
    let result = ""
    if(score > 0.5) result = "Pos"
    else result = "Neg"

    return {
        score : score, time : end - start, metadata : {
            percentagePositive : 100. * score,
            percentageNegative : 100 * (1 - score),
            result : result
        }
    }
}

export {getRequiredMetadata, inference, preprocessor}