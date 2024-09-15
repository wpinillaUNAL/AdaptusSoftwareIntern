module.exports = (resources) => {
  const my = {}
  const shared = {
    // SHARED_VAR: value
    // ...
  }

  // ============================================================================

  my.run = async (input) => {
    const {s3_driver} = resources
    let output = {}
    try {
      const data = await setup(await validate( await load(input)))
      // business logic goes here...
      // output = ...
      const filesArray= data.files
      const scannedFilesArray= data.scanned_files
      const erroredFilesArray= data.errored_files
      const scannedFilesDictionary={}
      scannedFilesArray.forEach((file)=>{scannedFilesDictionary[file]=file})
      const filesOutput= filesArray.filter((file)=>{return !(file in scannedFilesDictionary)})

      const filesDictionary={}
      filesArray.forEach((file)=>{filesDictionary[file]=file})
      const erroredFilesOutput= erroredFilesArray.filter((file)=>{return !(file in filesDictionary)})

      await s3_driver().add().then((res)=>{
        const prueba=JSON.parse(res)
        output.status=prueba.status
        output.message=prueba.message
      })
      if(output.status!=="200"){
        throw new Error
      }
      output=[...filesOutput, ...erroredFilesOutput]
      
    } catch (e) { 
      return output
    }

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
        [config.files,"Files array"],
        [config.scanned_files,"Scanned files array"],
        [config.errored_files,"Errored files array"]
      ].forEach(([item, name]) => { if (!item) { throw new Error( 'MissingInput: ' + name )}})
        if(!config.files.length){throw new Error("Files array is empty")}
      return config
    }

    function isAlphaNumerical(id){
      const check= /[a-zA-Z0-9]/  
      return check.test(id)
    }
  }

  return my
}

