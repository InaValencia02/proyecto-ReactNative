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
            camera: true
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

                <>
                    {
                    this.state.camera 
                    ? <MyCamera onImageUpload={(url) => this.onImageUpload(url)} style={styles.camera}/> 
                    : <>
                    <Image style={styles.img} source={{uri: this.state.urlImg}}/> 

                    <TextInput 
                    style={styles.postInput} 
                    placeholder="Describe your food" 
                    onChangeText={ text => this.setState({ post: text }) }
                    value={this.state.post}
                    />

                    <TouchableOpacity onPress={() =>  {this.submitPost();  this.props.navigation.navigate('Home')}}>
                        <Text style={styles.postButton}>
                            Post
                        </Text>
                    </TouchableOpacity>
                </>
                
                }
            </>

        )
    }
}

const styles = StyleSheet.create({
    postContainer: {

    },
    postInput: {

    },
    camera : {
      flex: 1  
    },
    img: {
        width: '200px',
        height: '300px'
    }
});


export default AddPosts