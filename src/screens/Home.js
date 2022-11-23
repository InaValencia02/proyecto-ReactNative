import React, {Component} from 'react';
import { StyleSheet, ActivityIndicator, Text, FlatList, ScrollView, Image, View,  } from 'react-native';
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
        
        db.collection('posts').orderBy('createdAt', 'desc').onSnapshot(
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
            <ScrollView style={styles.containerHome}>    
            <View style={styles.logoContainer}>
                <Image style={styles.img} source={require('../../assets/favicon.png')} resizeMode='contain'/>
                <Text style={styles.title}>BookLand</Text>
            </View>           
                                                   
               { this.state.posts === null ?

                    <ActivityIndicator size='large' color='orange' style={styles.loader} />
                    :
                    <FlatList
                        data={this.state.posts}
                        keyExtractor={item => item.id.toString()}
                        renderItem={({ item }) => <Posts post={item} navigation={this.props.navigation}
                        style={styles.flatlist} />}
                    /> 
        }               
            </ScrollView> 
        );
    }

}

const styles = StyleSheet.create({ 
    containerHome: {
        alignContent: 'center',  
        textAlign: 'center',
        backgroundColor: '#F4F4F1',
        pading : 25,
    },    
    loader:{
        marginTop: 100
    },
    logoContainer: {
        display: 'flex',
        flexWrap: 'wrap',
        flexDirection: 'row',             
        alignItems: 'center',
        textAlign: 'left',
        marginBottom: 5,  
        backgroundColor: 'white',
        padding: 5      
    },
    img:{
        height: 40,
        width: 40,              
        flex: 1,
    },
    title: {
        fontSize: 18,                     
        flex: 2, 
              
    },
})

export default Home
