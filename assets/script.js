

async function callApi(apikey, title){
   try{ var url = `http://www.omdbapi.com/?apikey=${apikey}&t=${title.replaceAll(" ","%20")}`
    var result = await fetch(url)
    var content = await result.json()
    return content}catch(error){
        console.error(error)
    }
}

callApi("e768172","star wars").then(
    function(result){
        console.log(result)
    }
).catch(
    function(error){
        console.error(error)
    }
)

