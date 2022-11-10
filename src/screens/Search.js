import React, {Component} from 'react';
import {View, Text, TextInput, TouchableOpacity} from 'react-native';

class Search extends Component{

    constructor(){
        super();
        this.state ={
            busqueda: false,
            textSearch: '',
        }
    }

    preventSubmit(event){
        event.preventDefault()
    }

    controlChanges(event){
        this.setState({textSearch: event.target.value})
    }

    render(){
        return(
            <View>
                <Text>Search for anyone</Text>
                <TextInput keyboardType='default'
                    placeholder='   Search ' 
                    onChangeText={ text => this.setState({textSearch:text}) }
                    value={this.state.textSearch}
                    onChange={(event) => this.controlChanges(event)}
                />

                <TouchableOpacity onPress={(event) => this.preventSubmit(event)}>
                    <Text>Send</Text>
                </TouchableOpacity>
                
            </View>
        )
    }
}

export default Search