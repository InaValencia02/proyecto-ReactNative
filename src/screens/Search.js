import React, {Component} from 'react';
import {View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet} from 'react-native';
import SearchResults from '../components/SearchResults';
import { db} from '../firebase/config';

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

    preventSubmit(){       
        let textToFilter = this.state.textSearch.toLowerCase();

        console.log(this.state.users)

        const filteredUsers = this.state.users?.filter((user) => user.data.username.toLowerCase().includes(textToFilter));
            
        console.log(filteredUsers)

        if (filteredUsers.length === 0){
            return this.setState({ usersErr: 'Sorry, that user does not exist', filteredUsers: []}) 
        }else{
            this.setState({ filteredUsers: filteredUsers, usersErr: ''}) 
        }
    }
    
    clear() {
        this.setState({
            filteredUsers: [],
            search: false,
            textSearch: '',
            usersErr: []
        })
    };

    render(){
        console.log(this.state.filteredUsers)
        return(
            <View style={styles.container}>
                <Text style={styles.title}>Search for anyone</Text>
                <TextInput style={styles.field} 
                    keyboardType='default'
                    placeholder='   Search ' 
                    onChangeText={ text => {
                        this.setState({textSearch:text});
                        this.preventSubmit()
                    }}
                    value={this.state.textSearch}
                />
               
               <View style= {styles.buttonsContainer}>
                 <TouchableOpacity onPress={() => this.clear()}>
                    <Text  style={styles.button}>Clear search</Text>
                </TouchableOpacity>
               </View>
                
                
                <Text style={styles.error}>{this.state.requiredField}</Text>               

                <Text>{this.state.usersErr}</Text>

                <FlatList 
                        style={styles.flatlist}
                        data={this.state.filteredUsers}
                        keyExtractor={item => item.id.toString()}
                        renderItem={({ item }) => <SearchResults userInfo={item} navigation={this.props.navigation}/> }
                    />
                
            </View>
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
        fontSize: 30,
        fontWeight: 'bold',
        margin: '8%',
        marginBottom: '19%',
    },
    buttonsContainer:{
        display: 'flex',
        flexDirection: 'row',    
        padding: 30, 
        justifyContent: 'space-around'               
    },
    button:{
        backgroundColor: 'rgb(255, 51, 0)',
        borderRadius: 30,
        marginTop: 5,
        margin: 2,
        padding: 7,
        textAlign: 'center',
        fontSize: 15,
        color: 'white',
        flex: 1,  
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
        width: '100%'
    },
    container:{
        backgroundColor: 'white',
        flex: 1
    }
})


export default Search

