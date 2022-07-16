import React, { Component } from 'react';
import { connect } from "react-redux";
import {getDog} from '../redux/actions';

class SearchBar extends Component {

    constructor(props) {
        
        super(props);
        this.state = {      
            name: ""
        }
    //    console.log(this.state)
    }
    
    handleChange(e) {
        this.setState( {name: e.target.value} ); 
    //    console.log(e.target.value) //letra x letra que voy escribiendo
    }

    handleSubmit(e) {
        e.preventDefault();
        this.props.getDog(this.state.name);
       // console.log(this.state.name) //cuando apreto Search consologea el nomber que escribi
       this.setState({name: ""});
    }
    
  render (){
    const {name} = this.state;
   // console.log(name)
    return (
    <div>
        <form onSubmit={(e) => this.handleSubmit(e)}>
        <input 
        type="text"
        placeholder='Breed...'
        value={name}
        onChange={(e) => this.handleChange(e)}
        />
        <button type="submit">Search</button>
        </form>

    </div>
    );
  };
}

function mapStateToProps(state){
   // console.log(state) los 3 estados globales 
    return{
        dogs: state.dogs
    }
}

// function mapDispacthToProps(dispatch){
//  //   console.log(dispatch) no se si realmente esta haciendo algo ese dispatch
//     return{
//         getAllDogs: () => dispatch(getAllDogs())
//     }
// }

export default connect(mapStateToProps, {getDog})(SearchBar);