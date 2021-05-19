# BMI - Processor

![npm](https://badges.aleen42.com/src/node.svg) ![npm](https://badges.aleen42.com/src/npm.svg)


[![https://nodei.co/npm/bmi_processor.png?downloads=true&downloadRank=true&stars=true](https://nodei.co/npm/bmi_processor.png?downloads=true&downloadRank=true&stars=true)](https://www.npmjs.com/package/bmi_processor)

BMI processor is a package that processes the json data with heights and weights and categorize the health risk and bmi category

## Tech

NodeJS 

- binary-search using d3-array library bisect function to get the range where bmi falls in
- json library used for rreading and writing json input/ouput files
- MOCHA for testing each function in the package to ensure correct CI
- Used github actions for CD to publish the package in NPM on every release 


## Installation

This package is built using default node libraries
```
npm install bmi_processor
```

## Usage 
 - take json file of hights and weights sample data
 - give input_file_name and ouput_file_name
 
 Example:
   ```js
    const bmi = require('./bmi_processor');
    let s = async function () {
        await bmi.processFile('/bmiProcessor/assets/testing_data.json', '/bmiProcessor/assets/testing_out.json')
    }

    console.log(s());
   ```
## TODO

- [ ] plotting analytics for the processed json data

## License

MIT

