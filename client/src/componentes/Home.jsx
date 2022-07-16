import React, { Component } from "react";
import { connect } from "react-redux";
import { getAllDogs } from "../redux/actions";
import Cards from "./Cards";


export class Razas extends Component{
    componentDidMount() {
        this.props.getAllDogs();    
      }

      render() {
        return <div>
          {/* {console.log(this.props.dogs)} */}
         {this.props.dogs.length === 0 ? "Breed not found" : <Cards props={this.props.dogs}></Cards>}
          
        </div>
      }  
}



export function mapStateToProps(state){
    return {
        dogs: state.dogs
        //loading: state.loading
    }
  }
  
  export function mapDispatchToProps(dispatch) {
    return {
      getAllDogs: () => dispatch(getAllDogs())
      
    };
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(Razas);