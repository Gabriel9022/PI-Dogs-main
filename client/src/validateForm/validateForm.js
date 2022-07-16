export default function validate(stateValidate) {
   // console.log(stateValidate)
    let errors = {};
/*   if (!state.name) {
      errors.name = 'Name is required';
  } else if (state.name[0]===" " || state.name.length-1 ===" "){
    errors.name = 'Blank spaces are not allowed at the beginning or end';
  } else if (!/^[A-ZÑ\s]+$/i.test(state.name)) {
      errors.name = 'Only letters are valid';
  } ; */
  if (!stateValidate.name) {
    errors.name = 'Name is required';
} else if (stateValidate.name[0]===" " || stateValidate.name.length-1 ===" "){
  errors.name = 'Blank spaces are not allowed at the beginning or end';
} else if (!/[A-ZÑ]+$/i.test(stateValidate.name)) {
    errors.name = 'Only letters are valid';
} ;

  if (!stateValidate.height_min) {
      errors.height_min = 'Minimun height is required';
  } else if (!/(?=.*[0-9][^A-ZÑ])/i.test(stateValidate.height_min)) {
    errors.height_min = 'Only numbers are valid';
  };

  if (!stateValidate.height_max) {
    errors.height_max = 'Maximun height is required';
} else if (!/(?=.*[0-9][^A-ZÑ])/i.test(stateValidate.height_max)) {
  errors.height_max = 'Only numbers are valid';
};

/*   if(!state.weight) {
    errors.weight = "Weight is required";
  } else if (!/(?=.*[0-9])/.test(state.weight)) {
    errors.weight = "Only numbers are valid";
  }; */
  if(!stateValidate.weight_min) {
    errors.weight_min = "Minimun weight is required";
  } else if (!/(?=.*[0-9])/.test(stateValidate.weight_min)) {
    errors.weight_min = "Only numbers are valid";
  };

  if(!stateValidate.weight_max) {
    errors.weight_max = "Maximun weight is required";
  } else if (!/(?=.*[0-9])/.test(stateValidate.weight_max)) {
    errors.weight_max = "Only numbers are valid";
  };

  return errors;
};
