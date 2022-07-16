const axios = require ('axios')
const {API_KEY} = process.env;
const {Raza, Temperamento} = require('../db');

async function getAllBreeds(req, res, next){
    const {name} = req.query;
  //  if (name) return nombreDetalle(name, res);
try{
    let razas = (await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`)).data
    // if(name) {
    //     razas = razas.filter(e => e.name.includes(name))
    // }
    // if (!razas.length) throw new Error ("No hay coincidencias con la búsqueda")
   // console.log(razas);
   const dataApi = razas?.map(e => {
if(e.weight['metric'][2] === "N" && e.weight['metric'].length< 4) {
    e.weight['metric'] = "25 - 50"
}else if(e.weight['metric'].length< 3){
    e.weight['metric'] = e.weight['metric'].concat(" - ", e.weight['metric'])
}else if(e.weight['metric'][2] === "N"){
    e.weight['metric'] = e.weight['metric'].slice(6).concat(" - ", e.weight['metric'].slice(6))
}

    return {
    id: e.id,
    image: e.image['url'],
    name: e.name,
    temperament: e.temperament,
    weight_min: e.weight['metric'].slice(0,2).trim(),
    weight_max: e.weight['metric'].slice(4).trim(),
    }})

    let razasDb = await Raza.findAll({
        include: Temperamento
    });
    // if(name) {
    //     razasDb = razasDb.filter(e => e.name.includes(name))

    //   }
    // if (!razasDb.length) throw new Error ("No hay coincidencias con la búsqueda DB")
   // console.log(razasDb)

    const dataDb = razasDb?.map(e => {
       
      return {
      id: e.id,
      name: e.name,
      temperament: e.temperamentos,
      weight_min: e.weight_min,
      weight_max: e.weight_max,
      }})  
//console.log(dataDb)
  let data = dataApi.concat(dataDb);
    //  console.log(data)
      if(name){
     data = data?.filter(e => e.name.includes(name))
      }
   // if (!data.length) return res.send('No hay coincidencias')

      //  console.log(data)
    return res.send(data)
}catch(e){
    return res.send(e.message)
 }
}

/*function nombreDetalle (name, res) {
    
    
        axios.get(`https://api.thedogapi.com/v1/breeds/search?q=${name}&api_key=${API_KEY}`)
        .then (response => {
           // console.log (response)
            const resp = response.data.map(e => {
                return {
             //       imagen: e.image['url'],
                    nombre: e.name,
           //         temperamento: e.temperament,
              //      peso: e.weight['metric']
                    }
        })
        res.json(resp)})
        .catch(e => next(e))

    } */

async function idRaza(req, res, next) {
    try {
        const { id } = req.params;
        const rutaRaza = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`)
        let razaDb = await Raza.findAll({
            include: Temperamento
        });
        console.log(razaDb)
        let objId = {}
     //  console.log(typeof(id))
        if(id.length < 4){
        rutaRaza.data?.forEach(e => {
            if(e.weight['metric'][2] === "N" && e.weight['metric'].length< 4) {
                e.weight['metric'] = "25 - 50"
            }else if(e.weight['metric'].length< 3){
                e.weight['metric'] = e.weight['metric'].concat(" - ", e.weight['metric'])
            }else if(e.weight['metric'][2] === "N"){
                e.weight['metric'] = e.weight['metric'].slice(6).concat(" - ", e.weight['metric'].slice(6))
            }

            if (e.id === parseInt(id)) {

                objId = {
                    id: e.id,
                    image: e.image['url'],
                    name: e.name,
                    temperament: e.temperament,
                    weight_min: e.weight['metric'].slice(0,2).trim(),
                    weight_max:e.weight['metric'].slice(4).trim(),
                    height_min: e.height['metric'].slice(0,2).trim(),
                    height_max: e.height['metric'].slice(4).trim(),
                    life_span_min: e.life_span.slice(0,2).trim(),
                    life_span_max: e.life_span.slice(4).trim()
                }
            }

        })
        if (objId.hasOwnProperty("name")) {
            return  res.json(objId);
           } else {
              throw new Error ('No se encontró el ID');
           } 
    } else {
     const temperam = razaDb.map(e => {
             
              return  e.temperamentos
            
        })
        //console.log()
        razaDb.forEach(e => {

            if (e.id === id) {

                objId = {
                    id: e.id,
                    //image: e.image['url'],
                    name: e.name,
                    temperament: e.temperamentos,
                    weight_min: e.weight_min,
                    weight_max: e.weight_max,
                    height_min: e.height_min,
                    height_max: e.height_max,
                    life_span_min: e.life_span_min,
                    life_span_max: e.life_span_max
                }
            }

        })
        if (objId.hasOwnProperty("name")) {
            return  res.json(objId);
           } else {
              throw new Error ('No se encontró el ID');
           } 
    }
//console.log(objId)
    
    }
    catch (e) {
        res.send('No se encontro el ID')
        //next(e)
    }
}

async function crearRaza (req, res, next){
    const {name, height_min, height_max, weight_min, weight_max, life_span_min, life_span_max} = req.body;
    const temperamentoId = req.body.temperament;
//console.log(req.body)

    const raza = await Raza.findOne({
        where: {
            name: name,
        }
    });
//console.log(raza)
    if(raza === null) {
        var razaNueva = await Raza.create({
            name,
            height_min,
            height_max,
            weight_min,
            weight_max,
            life_span_min,
            life_span_max
        } )

      //  console.log(razaNueva)
        const razaN = await razaNueva.addTemperamento(temperamentoId);
        return res.json(razaN);
    }
        res.send('Ya existe esa raza')
    
}


module.exports={
getAllBreeds,
idRaza,
crearRaza
}