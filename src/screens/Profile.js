import React, {Component} from 'react';
import { StyleSheet, ActivityIndicator, Text, FlatList, ScrollView } from 'react-native';
import { View } from 'react-native-web';
import {auth, db} from '../firebase/config';

class Profile extends Component{

    constructor () {
        super();
        this.state = {
            userName: '',
            newPassword: '',
            bio: ''
        }
    }

    updateProfile() {
        db.collection('users')

    }

    render () {

        return (

            <View>

                <Text>Update Profile</Text>

                <View style={styles.cardContainer}>
                    <TextInput keyboardType='default'
                        placeholder='New user name'
                        onChangeText={(text) => { this.setState({ userName: text }) }}
                        value={this.state.userName}
                        style={styles.cardText}
                    />
                    <TextInput keyboardType='password'
                        placeholder='New password'
                        onChangeText={(text) => { this.setState({ newPassword: text }) }}
                        value={this.state.newPassword}
                        style={styles.cardText}
                    />
                    <TextInput keyboardType='default'
                        placeholder='My bio'
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

export default Profile