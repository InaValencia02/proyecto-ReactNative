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
            posts: [],

        }
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
            .then(this.setState({comment: ''}))
            .catch(e => console.log('Error' + e))
    }

    goToProfile(user) {
        this.props.navigation.navigate("OtherProfile", {user: user})
    }    



    render() {
        console.log(this.props.post.data.urlImg)

        return (
            <View style={styles.containerHome}>      
                
                <Image style={styles.img} source={{uri: this.props.post.data.urlImg}}/>

                <Text style={styles.name}>
                    {this.props.post.data.post}
                </Text>

                <Text onPress={() =>this.goToProfile(this.props.post.data.owner)} style={styles.name}>
                    {this.props.post.data.owner}
                </Text>

                <Text style={styles.name}>
                    Posted on: {this.props.post.data.createdAt}
                </Text>

                <View style={styles.likes}>
                    <Text style={styles.like}> {this.props.post.data.likes.length} likes</Text>
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
                    { this.props.post.data.comments.length === 0?
                        <Text>There aren't any comments yet</Text>
                        :
                        <FlatList 
                            data={this.props.post.data.comments.sort((a, b) => a.createdAt - b.createdAt)}
                            keyExtractor={item => { 
                               
                                return item.createdAt.toString()}}
                            renderItem={({ item }) => <Text>{item.author}: {item.text}</Text>}
                        />
                }
                    <TextInput 
                        keyboardType='default'
                        placeholder='   Write a comment'
                        onChangeText={ text => this.setState({comment:text}) }
                        value={this.state.comment} 
                        style={styles.field}
                    />

                    <Text style={styles.error}>{this.state.emptyComment}</Text>
                    
                    <TouchableOpacity onPress={() => this.onSubmit()}>
                        <Text style={styles.button}>Add comment</Text>
                    </TouchableOpacity>
                </View>

            </View>
        )
    }
}

const styles = StyleSheet.create({
    postContainer: {
        flex: 1
    },
    img: {        
        height: 150,
        width: 150,
        alignSelf: 'center',
        marginTop: '10%'
    },
    field: {
        fontSize: 15,
        backgroundColor: 'rgb(230, 230, 230)',
        margin: '1%',
        borderRadius: '30px',
        padding: '1%',
        color: 'rgb(153, 153, 153)',
        marginTop: '5%',
    },
    button:{
        backgroundColor: 'rgb(255, 51, 0)',
        borderRadius: '30px',
        marginTop: '1%',
        margin: '2%',
        padding: '1%',
        textAlign: 'center',
        fontSize: 15,
        color: 'white',
    },
    error: {
        color: 'red',
        marginTop: '1%',
        textAlign: 'center',
        fontSize: 12,
    },
    name: {
        fontSize: 20,
    },
    bio: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    like:{
        fontSize: 20,
    }
});


export default Posts