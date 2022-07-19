export default function validate(stateValidate) {

    let errors = {};

  if(!/[-a-zA-Z0-9@:%._~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_.~#?&//=]*)?/gi.test(stateValidate.image)){
    errors.image = "Invalid url"
  }

  if (!stateValidate.name) {
    errors.name = 'Name is required';
} else if (stateValidate.name[0]===" "){
  errors.name = 'Blank spaces are not allowed at the beginning';
} else if (!/[A-ZÑ]+$/i.test(stateValidate.name)) {
    errors.name = 'Only letters are valid and Blank spaces are not allowed at the end';
};

  if (!stateValidate.height_min) {
      errors.height_min = 'Minimun height is required';
  } else if (!/^[0-9]+$/.test(stateValidate.height_min)){
    errors.height_min = 'Only numbers are valid';
  } else if (parseInt(stateValidate.height_min) >= parseInt(stateValidate.height_max)){
    errors.height_min = "Minimun height can not be higher or equal than maximun heigh"
  } else if (stateValidate.height_min < 1){
    errors.height_min = "Minimun height can not be lower than 1"
  };

  if (!stateValidate.height_max) {
    errors.height_max = 'Maximun height is required';
} else if (!/^[0-9]+$/.test(stateValidate.height_max)) {
  errors.height_max = 'Only numbers are valid';
} else if (parseInt(stateValidate.height_max) <= parseInt(stateValidate.height_min)){
  errors.height_max = "Maximun height can not be lower or equal than minimun heigh"
} if (stateValidate.height_max > 80) {
  errors.height_max = "Maximun height can not be higher than 80"
};

  if(!stateValidate.weight_min) {
    errors.weight_min = "Minimun weight is required";
  } else if (!/^[0-9]+$/.test(stateValidate.weight_min)) {
    errors.weight_min = "Only numbers are valid";
  } else if (stateValidate.weight_min < 1){
    errors.weight_min = "Minimun weight can not be lower than 1"
  } else if (parseInt(stateValidate.weight_min) >= parseInt(stateValidate.weight_max)){
    errors.weight_min = "Minimun weight can not be higher or equal than maximun weigh"
  };

  if(!stateValidate.weight_max) {
    errors.weight_max = "Maximun weight is required";
  } else if (!/^[0-9]+$/.test(stateValidate.weight_max)) {
    errors.weight_max = "Only numbers are valid";
  } else if (parseInt(stateValidate.weight_max) <= parseInt(stateValidate.weight_min)){
    errors.weight_max = "Maximun weight can not be lower or equal than minimun weigh"
  } else if (stateValidate.weight_max > 95) {
    errors.weight_max = "Maximun weight can not be higher than 95"
  };

  if (!/^[0-9]+$/.test(stateValidate.life_span_min)) {
    errors.life_span_min = "Only numbers are valid";
  } else if (parseInt(stateValidate.life_span_min) >= parseInt(stateValidate.life_span_max)){
    errors.life_span_min = "Minimun life span can not be higher or equal than maximun life span"
  } else if (stateValidate.life_span_min < 1){
    errors.life_span_min = "Minimun life span can not be lower than 1"
  };

  if (!/^[0-9]+$/.test(stateValidate.life_span_max)) {
    errors.life_span_max = "Only numbers are valid";
  } else if (parseInt(stateValidate.life_span_max) <= parseInt(stateValidate.life_span_min)){
    errors.life_span_max = "Maximun life span can not be lower or equal than minimun life span"
  } else if (stateValidate.life_span_max > 20){
    errors.life_span_max = "Maximun life span can not be higher than 20"
  };

  return errors;
};