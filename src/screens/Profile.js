import React, {Component} from 'react';
import { StyleSheet, ActivityIndicator, Text, FlatList, ScrollView } from 'react-native';
import { View } from 'react-native-web';
import {auth, db} from '../firebase/config';

class Profile extends Component{

    constructor () {
        super();
        this.state = {
            user: ''
        }
    }

    componentDidMount() {
        db.collection('users').where("owner", "==", auth.currentUser).onSnapshot(
            docs => {
                let user = [];

                docs.forEach( doc => {
                    user.push({
                        user: doc.data()
                    })

                this.setState({
                    user: user
                })
                })
            }
        )
    }

    render () {

        return (

            <View>
                
            <Text>
                Hola 
            </Text>

            </View>

        );
    }


}

export default Profile