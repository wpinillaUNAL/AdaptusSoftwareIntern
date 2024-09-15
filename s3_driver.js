module.exports=(resources)=>{
    const my={}

    my.add=async (array, path)=>{
        const response={'status':'ok', 'message':'Your array was uploaded successfully'}
        return JSON.stringify(response)
    }
    return my
}