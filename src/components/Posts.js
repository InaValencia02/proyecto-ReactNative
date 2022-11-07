import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { auth, db } from '../firebase/config';

class Posts extends Component {
    constructor(props) {
        super(props);
        this.state = {
            liked: this.props.post.data.likes.includes(auth.currentUser.email)
        }
    }

    componentDidMount() {

    }
    like() {

        db.collection('posteos')
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
        db.collection('posteos')
            .doc(this.props.post.id)
            .update({
                likes: firebase.firestore.FieldValue.arrayRemove(auth.currentUser.email)
            })
            .then(() => {
                this.setState({ liked: false })
            })
            .catch(e => console.log(e))

    }


    render() {
        return (
            <View style={styles.postContainer}>



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
        )
    }
}

const styles = StyleSheet.create({
    postContainer: {

    },
});


export default AddPosts