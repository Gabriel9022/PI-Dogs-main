const axios = require ('axios')
const {API_KEY} = process.env;
const {Raza, Temperamento} = require('../db');

async function getAllBreeds(req, res, next){
    const {name} = req.query;

try{
    let razas = (await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`)).data
   
   const dataApi = razas?.map(e => {
if(e.weight['metric'][2] === "N" && e.weight['metric'].length< 4) {
    e.weight['metric'] = "25 - 50"
}else if(e.weight['metric'].length< 3){
    e.weight['metric'] = e.weight['metric'].concat(" - ", e.weight['metric'])
}else if(e.weight['metric'][2] === "N"){
    e.weight['metric'] = e.weight['metric'].slice(6).concat(" - ", e.weight['metric'].slice(6))
} else if (e.life_span.length < 12) {
    lifeRepair = parseInt(e.life_span.slice(0,2))-1
    e.life_span = lifeRepair.toString().concat(" - ", e.life_span)
} else if (!e.temperament) {
    e.temperament = "Intelligent, Courageous"
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

    const dataDb = razasDb?.map(e => {
        if(Array.isArray(e.temperamentos)){
            e.temperamentos = e.temperamentos.map(e => e.name)
            e.temperamentos = e.temperamentos.join(", ")
        }
        if(!e.image){
            e.image = "https://w7.pngwing.com/pngs/774/119/png-transparent-dog-puppy-cartoon-cute-pet-s-mammal-cat-like-mammal-carnivoran-thumbnail.png" 
           }

      return {
      id: e.id,
      image: e.image,
      name: e.name,
      temperament: e.temperamentos,
      weight_min: e.weight_min,
      weight_max: e.weight_max,
      creado_por: e.creado_por,
      }})  
//console.log(dataDb)
  let data = dataDb.concat(dataApi);
    //  console.log(data)
      if(name){   
     dataName = data?.filter(e => e.name.toLowerCase().includes(name.toLowerCase()))
   
     return res.send(dataName)
     
    } 
   // if (!data.length) return res.send('No hay coincidencias')

      //  console.log(data)
    return res.status(200).send(data)
}catch(e){
    return res.status(400).send(e.message)
 }
}


async function idRaza(req, res, next) {
    try {
        const { id } = req.params;
        console.log()
        const rutaRaza = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`)
        let razaDb = await Raza.findAll({
            include: Temperamento
        });

        let objId = {}

        if(id.length < 4){
        rutaRaza.data?.forEach(e => {
            if(e.weight['metric'][2] === "N" && e.weight['metric'].length< 4) {
                e.weight['metric'] = "25 - 50"
            }else if(e.weight['metric'].length< 3){
                e.weight['metric'] = e.weight['metric'].concat(" - ", e.weight['metric'])
            }else if(e.weight['metric'][2] === "N"){
                e.weight['metric'] = e.weight['metric'].slice(6).concat(" - ", e.weight['metric'].slice(6))
            }else if (e.life_span.length < 12) {
                lifeRepair = parseInt(e.life_span.slice(0,2))-1
                e.life_span = lifeRepair.toString().concat(" - ", e.life_span)
            } else if (!e.temperament) {
                e.temperament = "Intelligent, Courageous"
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
            return  res.status(200).json(objId);
           } else {
             res.status(400).send('ID not found');
           }  
    } else {
    
        
        razaDb.forEach(e => {
            if(!e.image){
                e.image = "https://w7.pngwing.com/pngs/774/119/png-transparent-dog-puppy-cartoon-cute-pet-s-mammal-cat-like-mammal-carnivoran-thumbnail.png"
               }

            if (e.id === id) {

                objId = {
                    id: e.id,
                    name: e.name,
                    image: e.image,
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
            return  res.status(200).json(objId);
           } else {
             res.status(400).send('No se encontró el ID');
           } 
    }
//console.log(objId)
    
    }
    catch (e) {
        res.status(400).send('No se encontro el ID')
        //next(e)
    }
}

async function crearRaza (req, res, next){
    let {image, name, height_min, height_max, weight_min, weight_max, life_span_min, life_span_max} = req.body;
    const temperamentoId = req.body.temperament;
//console.log(req.body)
    name = name[0].toUpperCase().concat(name.slice(1))
    const raza = await Raza.findOne({
        where: {
            name: name,
        }
    });
//console.log(raza)
    if(raza === null) {
        var razaNueva = await Raza.create({
            image,
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
        return res.status(400).json({message: 'Ya existe esa raza'}) 
    
}



module.exports={
getAllBreeds,
idRaza,
crearRaza
}