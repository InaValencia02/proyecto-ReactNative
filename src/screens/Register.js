import React, {Component} from 'react';
import MyCamera from '../components/MyCamera'
import { View, Text, TextInput, TouchableOpacity, StyleSheet, TouchableHighlightBase} from 'react-native';
import {auth, db} from '../firebase/config';
import MyCamera from '../components/MyCamera';

const styles = StyleSheet.create({
    title:{
        fontSize: 50,
    },
    field: {
        fontSize: 20,
    },
    button: {
        fontSize: 20,
    },
    error: {
        color: 'red',
        fontSize: 20,
    },
    text: {
        fontSize: 15,
    }
})

class Register extends Component{

    constructor(props){
        super(props);
        this.state ={
            email: '',
            password: '',
            username: '',
            bio: '',
            error: [],
            registered: false,
            requiredField: '',
            post: '',
            urlImg: '',
            camera: true
        }
    }

    componentDidMount(){
        auth.onAuthStateChanged((user)=>{
          console.log(user)
        })
    }

    onSubmit(){
        this.state.email == '' || this.state.password == '' || this.state.username == ''?
        this.setState({requiredField: 'You need to fill the email, username and password in order to submit this form'})
        :
        auth.createUserWithEmailAndPassword(this.state.email, this.state.password)
        .then( res => {
            this.setState({registered: true})
            db.collection('users').add({
                owner: auth.currentUser.email,
                createdAt: Date.now(),
                username: this.state.username,
                bio: this.state.bio,
            })
            .then(() => {this.props.navigation.navigate('Login')})
        })
        .catch(err => {this.setState({error: err.message})})
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
                <MyCamera />

                <TouchableOpacity onPress={() => this.onSubmit()}>
                    <Text style={styles.button}> Send </Text> 
                </TouchableOpacity> 

                <Text style={styles.error}>{this.state.error}</Text>
                <Text style={styles.error}>{this.state.requiredField}</Text>

                <TouchableOpacity onPress={() => this.props.navigation.navigate('Login')}>
                    <Text style={styles.text}>Already have an account? Log in!</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

export default Register
