import React, {Component} from 'react';
import {View, Text, TextInput, TouchableOpacity, FlatList} from 'react-native';
import { db} from '../firebase/config';

class Search extends Component{

    constructor(){
        super();
        this.state ={
            search: false,
            textSearch: '',
            dataSearchResults: []
        }
    }

    preventSubmit(event){
        event.preventDefault()
    }

    controlChanges(event){
        this.setState({textSearch: event.target.value})
    }
    
    searchResults(){
        db.collection('users').onSnapshot(
            docs => {

                let info = [];
                console.log(info);

                docs.forEach( doc => {
                    info.push({id: doc.id, data: doc.data()})
                })
                this.setState({dataSearchResults: info, search: true})
            }
        )
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