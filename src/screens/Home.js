import React, {Component} from 'react';
import { StyleSheet, ActivityIndicator, Text, FlatList, View } from 'react-native';
import Posts from '../components/Posts'
import {auth, db} from '../firebase/config';

class Home extends Component{

 constructor() {
        super();
        this.state = {           
            post: '',
            posts: null
        }
    }

    componentDidMount() {
        
        db.collection('posteos').orderBy('createdAt', 'desc').onSnapshot(
            docs => {
                let array = []
                docs.forEach(doc => {
                    const data = doc.data();
                    const id = doc.id;
                    array.push({data,id})                            
                    this.setState({posts: array})                    
                });
            }
        )              
    }

    render() {

        return (
            <View style={styles.containerHome}>               
                                                   
               { this.state.posts === null ?

                    <ActivityIndicator size='large' color='black' />
                    :
                    <FlatList
                        data={this.state.posts}
                        keyExtractor={item => item.id.toString()}
                        renderItem={({ item }) => <Posts post={item}
                        style={styles.flatlist} />}
                    /> 
        }               
            </View> 
        );
    }

}

const styles = StyleSheet.create({ 
    containerHome: {
        alignContent: 'center',  
        textAlign: 'center'    
    },
    flatlist: {
        flex: 1
    }
})

export default Home