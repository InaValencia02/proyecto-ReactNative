import React, {Component} from 'react';
import {View, Text, TextInput, TouchableOpacity, FlatList} from 'react-native';
import { db} from '../firebase/config';

class Search extends Component{

    constructor(){
        super();
        this.state ={
            search: false,
            textSearch: '',
            dataSearchResults: [],
        }
    }

    preventSubmit(event){
        event.preventDefault()
        db.collection('users').onSnapshot(
            docs => {

                let info = [];

                docs.forEach( doc => {
                    info.push({id: doc.id, data: doc.data()})
                })
                this.setState({dataSearchResults: info, search: true})
            }
        )
    }
  
    controlChanges(event){
        this.setState({textSearch: event.target.value})
    }

    filterUser(){
        let textToFilter = this.state.textSearch.toLowerCase();
  
        let userName = this.state.dataSearchResults.data.username;
        this.setState({
          dataSearchResults: userName.filter((user) => user.toLowerCase().includes(textToFilter) )})
    }
    
    clear() {
        this.setState({
            dataSearchResults: [],
            search: false,
            textSearch: '',
        })
    };

    render(){
        console.log(this.state.dataSearchResults)
        return(
            <View>
                <Text>Search for anyone</Text>
                <TextInput keyboardType='default'
                    placeholder='   Search ' 
                    onChangeText={ text => this.setState({textSearch:text}) }
                    value={this.state.textSearch}
                    onChange={(event) => this.controlChanges(event)}
                />

                {this.state.textSearch == '' ?
                    <Text>You cannot send an empty form</Text>
                    :
                    <TouchableOpacity onPress={(event) => this.preventSubmit(event)}>
                        <Text>Send</Text>
                    </TouchableOpacity>
                }

                <TouchableOpacity onPress={() => this.clear()}>
                    <Text>Clear search</Text>
                </TouchableOpacity>

            {this.state.dataSearchResults.length === 0?
            <Text>Sorry, that user does not exist</Text>
            :
            <FlatList 
                    data={this.state.dataSearchResults}
                    keyExtractor={item => item.id.toString()}
                    renderItem={({ item }) => <Text>{item.data.username}</Text> }
                />
            }
                
            </View>
        )
    }
}

export default Search