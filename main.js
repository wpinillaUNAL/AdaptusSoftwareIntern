const tasks= require('./tasks')
const s3_driver = require('./s3_driver')
const retorno = tasks({"s3_driver":s3_driver}).run({"files":["a","b","c","d"," ", ",,.,+"], "scanned_files":["c","d"], "errored_files":["a", "b","j"]})
retorno.then((response)=>{console.log(response)})