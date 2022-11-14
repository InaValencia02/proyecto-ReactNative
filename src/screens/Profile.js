import React, {Component} from 'react';
import { StyleSheet, ActivityIndicator, TouchableOpacity, Text, FlatList, ScrollView } from 'react-native';
import { View } from 'react-native-web';
import {auth, db} from '../firebase/config';
import Posts from '../components/Posts'

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

        this.userInfo()

        this.userPosts()
        
        console.log(this.state.info);

    }

    userInfo() {

        db.collection('users').where("owner", "==", auth.currentUser.email).onSnapshot(
            docs => {
                let info = [];

                docs.forEach( doc => {
                    this.setState({
                        info: doc.data(),
                    })

                })
            }
        )


    }


    userPosts() {
        db.collection('posts').where("owner", "==", auth.currentUser.email).onSnapshot(
            docs => {
                let posts = []
                docs.forEach(doc => {
                    const data = doc.data();
                    const id = doc.id;
                    posts.push({data, id})
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
                    @{this.state.info.username}
                </Text>

                <Text>
                    {this.state.info.owner}
                </Text>

                <Text>
                    {this.state.info.bio}
                </Text>

                <Text>
                    Posts: {this.state.posts.length}
                </Text>


                <FlatList
                        data={this.state.posts}
                        keyExtractor={item => item.id.toString()}
                        renderItem={({ item }) => <Posts post={item}
                        style={styles.flatlist} />}
                    /> 

                <TouchableOpacity onPress={() => this.logout()}>
                    <Text>Logout</Text>
                </TouchableOpacity>

            </View>

        );
    }


}

const styles = StyleSheet.create({ 

})

export default Profile