'use strict'

const d3 = require('d3-array')

const fs = require('fs')

/**
 * made the ranges as a sorted list and when we want to decide in which Range BMI will falls
 * simply binary search for the place where we can insert our caluclated BMI without distrubing sorted order
 * if the index is even then it belogs (even_index, even_index+1)
 * else index will be reduced by one follow the same as even condition
 */
const ranges = [0,18.4, 18.5, 24.9, 25, 29.9, 30, 34.4, 35, 39.9, 40, 101]


// ? categorised as index as if BMI falls in 1st range then the catgory and health risk falls in 1st index
const Categories = [
    {'bmi_category' : 'NA', "health_risk" : 'NA', "bmi" : -1},
    {'bmi_category' : 'under weight', "health_risk" : 'malnutrion risk', "bmi" : 0},
    {'bmi_category' : 'normal weight', "health_risk" : 'low risk', "bmi" : 0},
    {"bmi_category" : 'over weight', "health_risk" : 'enhanced risk',"bmi" : 0},
    {"bmi_category" : 'moderate obese', "health_risk" : 'medium risk', "bmi" : 0},
    {"bmi_category" : 'severly obese', "health_risk" : 'high risk', "bmi" : 0},
    {"bmi_category" : 'very severe obese', "health_risk" : 'very very high risk', "bmi" : 0}
]

/**
 * Takes bmi and binary search for range where 
 * the given bmi values falls under and 
 * return the category details
 * 
 * @param {number} bmi caluclated bmi 
 * @returns category details for caluclated bmi
 */

async function getBmiDetails(bmi){

    if(bmi == 0){

        return Categories[0]

    }

    let index = await d3.bisect(ranges, bmi, 0, 12); //? 0: start index 12 size of the array Ranges which is declared above constants

    if(index%2 != 0){

        index -= 1

    }

    let data = Categories[index/2 + 1]

    data.bmi = bmi

    return data

}

/**
 * takes cm as input and return meters 
 * 
 * cm -> m
 * 
 * @param {number} cm centimeter magnitude
 * @returns converted magnitude
 */

function convertCmToM(cm){

    return cm / 100.0

}

/**
 * bmi = weight/ (hight^2) 
 * 
 * 
 * @param {Number} hight 
 * @param {Number} weight 
 * @returns {Number} caluclated bmi
 */

async function caluclateBmi(hight, weight){

    try{

        hight = await convertCmToM(hight);
        
        let bmi = weight / (hight ** 2)

        return bmi.toFixed(1)

    }
    catch(error){

        console.error(e)

        return 0

    }

}

/**
 * Reads the json file and return the data
 * 
 * 
 * @param {String} file_path to the json
 * @returns data came from the file
 */

async function readJsonFile(file_path){

    try{

        let data = await fs.readFileSync(file_path)

        data = JSON.parse(data)

        return data

    }
    catch(error){

        console.error(error)
        throw error

    }
}

/**
 * Write updated json file to given ouput file path
 * 
 * @param {Object} data json data
 * @param {String} file_path output_file path to write processed data
 * @returns Boolean 
 */


async function writeJsonFile(data, file_path){

    try{

        data = JSON.stringify(data)

        fs.writeFileSync(file_path, data)

        return true

    }
    catch(error){

        console.error(error);

        throw error

    }

}

/**
 * Takes json data with heighs and weights
 * Caluclates the bmi 
 * Get the bmi catgory details
 * Update the record
 * 
 * @param {Object} data json data of heighs and weights
 * @returns Object 
 */

async function processJsonData(data){

    if(!data){

        return {}
        
    }

    for(let record of data){

        if(record.HeightCm > 0 || record.WeightKg > 0){

            console.log("procesing record---> ", record);
            
            let bmi = await caluclateBmi(record.HeightCm, record.WeightKg);

            let bmi_category_details = await getBmiDetails(bmi);

            let copy = record

            record = Object.assign(copy, bmi_category_details);

        }
        else{

            console.log("failed to process the record due to bad data---> ", record);

        }

    }

    return data

}

async function processFile(input_file, ouput_file){

    try{

        let jsonData = await readJsonFile(input_file);

        let processedData = await processJsonData(jsonData);

        let status = await writeJsonFile(processedData, ouput_file);

        return{
            "status" : status,
            "message" : "completed"
        }

    }
    catch(error){

        console.error(error);
        
        throw error
    }

}

module.exports = {
    processFile : processFile,
    processJsonData : processJsonData,
    readJsonFile : readJsonFile,
    writeJsonFile : writeJsonFile,
    caluclateBmi : caluclateBmi,
    convertCmToM : convertCmToM,
    getBmiDetails : getBmiDetails
}
