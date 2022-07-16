const axios = require ('axios');
const {Temperamento} = require('../db');
const {API_KEY} = process.env;

async function temperamentos (){

    const temp = (await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`)).data
    const tempTotal = temp.map(e => { return e.temperament})

    let temperamentosFiltered =  tempTotal.filter(c => c)

    let divididos = temperamentosFiltered.join(',').split(',').reduce((acc,item)=>{
     if(!acc.includes(item.trim())){
        acc.push(item.trim());
    }
    return acc;
  },[])
    
    let unaMas =  divididos.filter(c => c)

    await unaMas.forEach((temperament) => {
        if (temperament !== ""){
        Temperamento.create({
           name: temperament,
        })};
      }); 
                
}

module.exports = {
    temperamentos
}