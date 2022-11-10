import React, {Component} from 'react';
import { StyleSheet, ActivityIndicator, Text, FlatList, ScrollView } from 'react-native';
import { View } from 'react-native-web';
import { EvilIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import {auth, db} from '../firebase/config';

class UpdateProfile extends Component{

    constructor () {
        super();
        this.state = {
            username: '',           
            bio: ''
        }
    }

    updatePassword( ) {
          
    }
    // https://stackoverflow.com/questions/48370601/change-password-using-react-native-and-firebase

    updateUserName() {
        db.collection('users').doc(this.props.post.id).update({
            userName: this.state.username,           
        })  
    }
    updateBio() {
        db.collection('users').doc(this.props.post.id).update({            
            bio: this.state.bio
        })  
    }

    render () {

        return (

            <View>

                <Text>Update Profile</Text>
                <EvilIcons name="pencil" size={24} color="black" />

                <AntDesign name="setting" size={24} color="black" />

                <View style={styles.cardContainer}>
                    <TextInput keyboardType='default'
                        placeholder='New user name'
                        onChangeText={(text) => { this.setState({ username: text }) }}
                        value={this.state.username}
                        style={styles.cardText}
                    />
                   
                    <TextInput keyboardType='default'
                        placeholder='New bio'
                        onChangeText={(text) => { this.setState({ bio: text }) }}
                        value={this.state.bio}
                        style={styles.cardText}
                    />
                    <TouchableOpacity onPress={() => this.updateProfile()} >
                        <Text style={styles.like} >Update</Text>
                    </TouchableOpacity>
                </View>

            </View>

        );
    }


}

export default UpdateProfile