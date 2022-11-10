import React, { Component } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet, FlatList, Image } from 'react-native';
import { auth, db } from '../firebase/config';
import { AntDesign} from '@expo/vector-icons';
import firebase from 'firebase';

class Posts extends Component {
    constructor(props) {
        super(props);
        this.state = {
            liked: this.props.post.data.likes.includes(auth.currentUser.email),
            comment: '',
            emptyComment: '',
            posts: []
        }
    }

    componentDidMount() {
        db.collection('posts').onSnapshot()
    }

    like() {
        db.collection('posts')
            .doc(this.props.post.id)
            .update({
                likes: firebase.firestore.FieldValue.arrayUnion(auth.currentUser.email)
            })
            .then(() => {
                this.setState({ liked: true })
            })
            .catch(error => console.log(error))
    }

    dislike() {
        db.collection('posts')
            .doc(this.props.post.id)
            .update({
                likes: firebase.firestore.FieldValue.arrayRemove(auth.currentUser.email)
            })
            .then(() => {
                this.setState({ liked: false })
            })
            .catch(e => console.log(e))
    }

    onSubmit(){
        this.state.comment == ''?
        this.setState({emptyComment: 'You need to write something'})
        :
        db.collection('posts')
            .doc(this.props.post.id)
            .update({
                comments: firebase.firestore.FieldValue.arrayUnion({owner: auth.currentUser.email, text: this.state.comment, author: auth.currentUser.email, createdAt: Date.now()})
            })
            .then(() => this.props.navigation.navigate('Home'))
            .catch(e => console.log('Error' + e))
    }

    render() {
        return (
            <View style={styles.postContainer}>

                <Image style={styles.img} source={this.props.post.data.urlImg}/>

                <Text>
                    {this.props.post.data.owner}
                </Text>

                <Text>
                    Posted on: {this.props.post.data.createdAt}
                </Text>

                <View style={styles.likes}>
                    <Text >This many people {this.props.post.data.likes.length} liked this post</Text>
                    {this.state.liked ?
                        <TouchableOpacity onPress={() => this.dislike()}>
                            <Text style={styles.like}> <AntDesign name="heart" size={24} color="red" /> </Text>
                        </TouchableOpacity>
                        :
                        <TouchableOpacity onPress={() => this.like()}>
                            <Text style={styles.like}> <AntDesign name="hearto" size={24} color="black" /> </Text>
                        </TouchableOpacity>
                    }
                </View>

                <View style={styles.comments}>
                    {this.props.post.data.comments.length === 0?
                        <Text>There aren't any comments yet</Text>
                        :
                        <FlatList 
                            data={this.props.post.data.comments.sort((a, b) => a.createdAt - b.createdAt)}
                            keyExtractor={item => item.id.toString()}
                            renderItem={({ item }) => <Text>{item.author}: {item.text}</Text>}
                        />
                    }
                    <TextInput 
                        keyboardType='default'
                        placeholder='Write a comment'
                        onChangeText={ text => this.setState({comment:text}) }
                        value={this.state.comment} 
                    />
                    <TouchableOpacity onPress={() => this.onSubmit()}>
                        <Text>Add </Text>
                    </TouchableOpacity>
                    <Text>{this.state.emptyComment}</Text>
                </View>

            </View>
        )
    }
}

const styles = StyleSheet.create({
    postContainer: {

    },
    img: {
        flex: 1
    }
});


export default Posts