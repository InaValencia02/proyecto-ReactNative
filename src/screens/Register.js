import React, {Component} from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import {auth, db} from '../firebase/config';

class Register extends Component{

    onstructor(){
        super();
        this.state ={
            email: '',
            password: '',
            username: '',
            bio: '',
            profilePicture: '',
            error: [],
            registered: false,
        }
    }

    onSubmit(){
        auth.createUserWithEmailAndPassword(this.state.email, this.state.password)
        .then( res => {
            this.setState({registered: true})
            db.collection('users').add({
                owner: auth.currentUser.email,
                createdAt: Date.now(),
                username: this.state.userName,
                bio: this.state.bio,
            })
        })
    }
    render(){
        return(
            <View>
                <Text style={styles.title}>Create your account</Text>
                <TextInput style={styles.field} 
                keyboardType='email-address'
                    placeholder='Email'
                    onChangeText={ text => this.setState({email:text}) }
                    value={this.state.email} 
                />   
                <TextInput style={styles.field} 
                    keyboardType='default'
                    placeholder='Password'
                    secureTextEntry={true} 
                    onChangeText={ text => this.setState({password:text}) }
                    value={this.state.password}
                /> 
                <TextInput style={styles.field} 
                keyboardType='default'
                    placeholder='Username'
                    onChangeText={ text => this.setState({username:text}) }
                    value={this.state.username} 
                /> 
                <TextInput style={styles.field} 
                keyboardType='default'
                    placeholder='Bio'
                    onChangeText={ text => this.setState({bio:text}) }
                    value={this.state.bio} 
                /> 

                <TouchableOpacity onPress={() => this.onSubmit()}>
                    <Text style={styles.button}> Send </Text> 
                </TouchableOpacity> 

                <Text style={styles.error}>{this.state.error}</Text>

                <TouchableOpacity onPress={() => this.props.navigation.navigate('Register')}>
                    <Text style={styles.text}>Already have an account? Log in!</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

export default Register
