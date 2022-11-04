import React, {Component} from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import {auth, db} from '../firebase/config';

class AddPosts extends Component {
    constructor(){
        super();
        this.state ={
            description: '',
        }
    }

    componentDidMount() {

    }

    submitPost() {
        db.collection('posteos').add({
            user: '', 
            mail: '',
            createdAt: Date.now(),
            description: this.state.description,
            likes: [],
            comments: [], 
            photo: ''
        }).then(() => {
            this.props.navigation.navigate("Home") 
        }).catch(err => console.log(err))
    }

    render() {
        return(
            <View style={styles.postContainer}>
                <Image style={styles.image}>

                </Image>

                <TextInput 
                    style={styles.postInput} 
                    placeholder="Describe your food" 
                    onChangeText={ text => this.setState({ description: text }) }
                    value={this.state.description}
                >
                </TextInput>

                <TouchableOpacity onPress={() =>  {this.submitPost();  this.props.navigation.navigate('Home')}}>
                        <Text style={styles.postButton}>
                            Post
                        </Text>
                </TouchableOpacity>

            </View>
        )
    }
}

const styles = StyleSheet.create({
    postContainer: {

    },
    postInput: {

    },
    postButton : {
        
    }
});


export default AddPosts