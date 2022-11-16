import React, {Component} from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import MyCamera from '../components/MyCamera';
import {auth, db} from '../firebase/config';

class AddPosts extends Component {
    constructor(){
        super();
        this.state ={
            post: '',
            urlImg: '',
            camera: true,
        }
    }

    submitPost() {
            db.collection('posts').add({
                urlImg: this.state.urlImg,
                owner: auth.currentUser.email,
                post: this.state.post,
                createdAt: Date.now(),
                likes: [],
                comments: [], 
            }).then(() => {
                this.props.navigation.navigate("Home") 
                this.setState({
                    camera: true,
                    post: ''
                })
            }).catch(err => console.log(err))
    }

    onImageUpload(url){

        this.setState({
            urlImg: url,
            camera: false
        })

    }

    render() {
        return(

            <View style={styles.container}>
                <Text style={styles.title}>Add a new post</Text>

                {this.state.camera ? 
                    <View style={styles.camera}>
                        <MyCamera onImageUpload={(url) => this.onImageUpload(url)} style={styles.camera}/> 
                    </View>
                    : 
                    <Image style={styles.img} source={{uri: this.state.urlImg}}/> 
                }

                <TextInput 
                    style={styles.postInput} 
                    placeholder="What are you thinking?" 
                    onChangeText={ text => this.setState({ post: text }) }
                    value={this.state.post}
                />

                {this.state.urlImg== ''? 
                    <Text style={styles.error}>You need to upload a picture</Text>
                    :
                    <TouchableOpacity onPress={() =>  {this.submitPost();  this.props.navigation.navigate('Home')}}>
                        <Text style={styles.postButton}>Post</Text>
                    </TouchableOpacity>
                }
            </View>

        )
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flex: 1,
        width: '100vw',
        padding: 30,
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    postInput: {
        width: '100%',
        fontSize: 15,
        backgroundColor: 'rgb(230, 230, 230)',
        margin: '1%',
        borderRadius: '30px',
        padding: '1%',
        color: 'rgb(153, 153, 153)'
    },
    camera : {
      flex: 1,
      margin: 30,
    },
    img: {
        width: 200,
        height: 200,
        margin: 30
    },
    title: {
        fontSize: 50,
        fontWeight: 'bold',
        height: 100,
        margin: 5,
        marginBottom: 15,
    },
    postButton: {
        backgroundColor: 'rgb(255, 51, 0)',
        borderRadius: '30px',
        margin: '2%',
        padding: 3,
        textAlign: 'center',
        fontSize: 15,
        color: 'white',
        width: 350,
    },
    error: {
        color: 'red',
        marginTop: '1%',
        textAlign: 'center',
        fontSize: 15,
    }
});


export default AddPosts