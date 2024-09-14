module.exports = (resources) => {
  const my = {}
  const shared = {
    // SHARED_VAR: value
    // ...
  }

  // ============================================================================

  my.run = async (input) => {
    const { bundled_config, _debug } = resources
    let output = {}

    try {
      const data = await setup(await validate( await load(input)))
      // business logic goes here...
      // output = ...
    } catch (e) { 
      // if (e.message === ...
      //   throw new Error('...
      // }
      // Default case
      _debug(e.stack)
      throw (e)
    }

    return output

    async function load(input={}) {
      const config = {}
      // config.var1 = input.var1
      // ...
      // config.config1 = await bundled_config.config('CONFIG1')
      // ...
      config.files=input.Files
      config.scanned_files=input.scanned_files
      config.errored_files=input.errored_files
      return config
    }
    
    async function setup(config) {
      const data = {...config}
      // ...
      return data
    }

    async function validate(config) {
      ;[
        // [variable, "display name"],
        [config.files,"Files array"],
        [config.scanned_files,"Scanned files array"],
        [config.errored_files,"Errored files array"]
      ].forEach(([item, name]) => { if (!item) { throw new Error( 'MissingInput: ' + name )}})
      return config
    }
  }

  return my
}

