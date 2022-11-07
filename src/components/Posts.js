import React, {Component} from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import {auth, db} from '../firebase/config';

class Posts extends Component {
    constructor(){
        super();
        this.state ={

        }
    }

    componentDidMount() {

    }


    render() {
        return(
            <View style={styles.postContainer}>

            </View>
        )
    }
}

const styles = StyleSheet.create({
    postContainer: {

    },
});


export default Posts