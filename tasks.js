module.exports = (resources) => {
  const my = {}
  const shared = {
    // SHARED_VAR: value
    // ...
    'PATH':'S3://<proxy-bucket>/<uuid>/<filename>/analysis/vtt/entity/<name>.vtt'
  }

  // ============================================================================

  my.run = async (input) => {
    const {s3_driver} = resources
    let output = {}
    let arrOut =[]
    try {
      const data = await setup(await validate( await load(input)))
      // business logic goes here...
      // output = ...
      const filesArray= data.files
      const scannedFilesArray= data.scanned_files
      const erroredFilesArray= data.errored_files
      //Filtering of the files that are both in the Files and Scanned Files array
      const scannedFilesDictionary={}
      scannedFilesArray.forEach((file)=>{scannedFilesDictionary[file]=file})
      const filesOutput= filesArray.filter((file)=>{return !(file in scannedFilesDictionary)})
      //Filtering of the files that are both in the Files and Errored Files array so they don't upload twice
      const filesDictionary={}
      filesArray.forEach((file)=>{filesDictionary[file]=file})
      const erroredFilesOutput= erroredFilesArray.filter((file)=>{return !(file in filesDictionary)})
      //Final array for upload
      arrOut=[...filesOutput, ...erroredFilesOutput]
      //S3 module for uploading result
      await s3_driver().add(shared.PATH,arrOut).then((res)=>{
        const prueba=JSON.parse(res)
        output.status=prueba.status
        output.message=prueba.message
      })
      if(output.status ==='error'){
        throw new Error
      }
      
    } catch (e) { 
      output.status='error'
      output.message='Serverside error.Please try again'
      return output
    }
    output=arrOut
    return output

    async function load(input={}) {
      const config = {}
      // config.var1 = input.var1
      // ...
      // config.config1 = await bundled_config.config('CONFIG1')
      // ...
      config.files=input.files
      config.scanned_files=input.scanned_files
      config.errored_files=input.errored_files
      return config
    }
    
    async function setup(config) {
      const data = {...config}
      // ...
      data.files=data.files.filter((id)=>{
        if(isAlphaNumerical(id)){
          return id
        }
      })
      data.scanned_files=data.scanned_files.filter((id)=>{
        if(isAlphaNumerical(id)){
          return id
        }
      })
      data.errored_files=data.errored_files.filter((id)=>{
        if(isAlphaNumerical(id)){
          return id
        }
      })
      
      return data
    }

    async function validate(config) {
      ;[
        // [variable, "display name"],
        [config.files,'Files array'],
        [config.scanned_files,'Scanned files array'],
        [config.errored_files,'Errored files array']
      ].forEach(([item, name]) => { if (!item) { throw new Error( 'MissingInput: ' + name )}})
        if(!config.files.length){throw new Error('Files array is empty')}
      return config
    }

    function isAlphaNumerical(id){
      const check= /[a-zA-Z0-9]/  
      return check.test(id)
    }
  }

  return my
}

