export default function validate(state) {
    let errors = {};
    
    if(!state) errors.state = "This field is required for Search";
    if (state[0]===" "){
        errors.state = 'Blank spaces are not allowed at the beginning';
    }
    if(!/[A-ZÑ]+$/i.test(state)) {
    errors.state  = "Only letters are valid and Blank spaces are not allowed at the end"
    }
}