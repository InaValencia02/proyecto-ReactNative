import React, {Component} from 'react';
import {ScrollView, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, View} from 'react-native';
import { db} from '../firebase/config';
import SearchResults from '../components/SearchResults';

class Search extends Component{

    constructor(){
        super();
        this.state ={
            search: false,
            textSearch: '',
            users:[],  
            filteredUsers: [],
            usersErr: ''
        }
    }
    componentDidMount () {
        db.collection('users').onSnapshot(
            docs => {

                let info = [];

                docs.forEach( doc => {
                    info.push({id: doc.id, data: doc.data()})
                })
                this.setState({users: info})
            }
        )
    }

    preventSubmit(event){       
        event.preventDefault() 

        this.setState({ usersErr: ''}); 

        let textToFilter = this.state.textSearch.toLowerCase();

        if (this.state.textSearch === '') {
            this.setState({requiredField: 'You cannot send an empty form'})
        } else {
            console.log(this.state.users)
            this.setState({requiredField: ''})

            const filteredUsers = this.state.users?.filter((user) => user.data.username.toLowerCase().includes(textToFilter));
            
            console.log(filteredUsers)

            if (filteredUsers.length === 0) return this.setState({ usersErr: 'Sorry, that user does not exist', filteredUsers: []}) 


            this.setState({ filteredUsers: filteredUsers}) 
        }
    }
  
    controlChanges(event){
        this.setState({textSearch: event.target.value})
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
            <ScrollView style={styles.container}>
                <Text style={styles.title}>Search for anyone</Text>
                <TextInput style={styles.field} 
                     keyboardType='default'
                    placeholder='   Search ' 
                    onChangeText={ text => this.setState({textSearch:text}) }
                    value={this.state.textSearch}
                    onChange={(event) => this.controlChanges(event)}
                />
               
               <View>
                    <TouchableOpacity onPress={(event) => this.preventSubmit(event)}>
                        <Text  style={styles.button}>Send</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.clear()}>
                        <Text  style={styles.button}>Clear search</Text>
                    </TouchableOpacity>
               </View>
                
                <Text style={styles.error}>{this.state.requiredField}</Text>

                <Text>{this.state.usersErr}</Text>

                <FlatList 
                        data={this.state.filteredUsers}
                        keyExtractor={item => item.id.toString()}
                        renderItem={({ item }) => <SearchResults userInfo={item}/> }
                        style={styles.flatlist}
                    />
                
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    field: {
        fontSize: 15,
        backgroundColor: 'rgb(230, 230, 230)',
        margin: '1%',
        borderRadius: '30px',
        padding: '1%',
        color: 'rgb(153, 153, 153)'
    },
    title: {
        fontSize: 50,
        fontWeight: 'bold',
        margin: '8%',
        marginBottom: '19%',
    },
    button:{
        backgroundColor: 'rgb(255, 51, 0)',
        borderRadius: '30px',
        marginTop: '5%',
        margin: '2%',
        padding: '1%',
        textAlign: 'center',
        fontSize: 15,
        color: 'white',
    },
    text: {
        textAlign: 'right',
        marginRight: '4%',
        color: 'rgb(51, 51, 51)',
        marginTop: '1%',
        fontSize: 12,
    },
    error: {
        color: 'red',
        marginTop: '1%',
        textAlign: 'center',
        fontSize: 12,
    },    
    flatlist: {
        flex: 1,
        width: '100%',
    },
    container: {
        backgroundColor: 'white',
        flex: 1,
        alignContent: 'center',  
        textAlign: 'center',
    }
})


export default Search

