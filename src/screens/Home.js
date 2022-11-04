import React, {Component} from 'react';
import { StyleSheet, ActivityIndicator, Text, FlatList, ScrollView } from 'react-native';
import Post from '../components/Post'

const styles = StyleSheet.create({ 

})

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
            <ScrollView style={styles.cotainerHome}>               
                                                   
                {this.state.posts === null ?

                    <ActivityIndicator size='large' color='yellow' />
                    :
                    <FlatList
                        data={this.state.posts}
                        keyExtractor={item => item.id.toString()}
                        renderItem={({ item }) => <Post post={item} />}
                    />
                }                
            </ScrollView> 
        );
    }

}

export default Home