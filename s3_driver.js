module.exports=(resources)=>{
    const my={}

    my.add=async (array, path)=>{
        const response={}
        response.status = "200"
        response.message = "Ok"
        return JSON.stringify(response)
    }
    return my
}