import React, {Component} from 'react';
import { StyleSheet, ActivityIndicator, TouchableOpacity, Text, FlatList, ScrollView } from 'react-native';
import { View } from 'react-native-web';
import {auth, db} from '../firebase/config';

class Profile extends Component{

    constructor () {
        super();
        this.state = {
            user: '',
            info: [],
            posts: []
        }
    }

    componentDidMount() {
        db.collection('users').where("owner", "==", auth.currentUser.email).onSnapshot(
            docs => {
                let info = [];

                docs.forEach( doc => {
                    info.push({
                        data: doc.data(),
                    })

                this.setState({
                    info: info,
                })
                })
            }
        )

        this.userPosts()

        console.log(this.state.posts);

    }

    userPosts() {
        db.collection('posts').where("owner", "==", auth.currentUser.email).onSnapshot(
            docs => {
                let posts = []
                docs.forEach(doc => {
                    posts.push({
                        data: doc.data(),
                        id: doc.createdAt
                    })
                })
            this.setState({
                posts: posts
            })
            }
        )
    }

    logout(){
        auth.signOut()
        this.props.navigation.navigate('Login')
    }

    render () {

        console.log(this.state.info);

        return (

            <View>
                
                <Text>
                    Hola 
                </Text>

                <TouchableOpacity onPress={() => this.logout()}>
                    <Text>Logout</Text>
                </TouchableOpacity>


            

            </View>

        );
    }


}

export default Profile