import React, {Component} from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import {auth} from '../firebase/config';

const styles = StyleSheet.create({
    field: {
        fontSize: 20,
    },
})

class Login extends Component{

    constructor(){
        super();
        this.state ={
            email: '',
            password: '',
            login: false,
            error: [],
        }
    }

    componentDidMount(){
        auth.onAuthStateChanged( user => {
            if(user){
                this.setState({login: true})
                this.props.navigation.navigate('AppMainWindow')
            }
        })
    }

    onSubmit(){
        auth.signInWithEmailAndPassword(this.state.email, this.state.password)
        .then( res => {
            this.setState({login: true})
            this.props.navigation.navigate('AppMainWindow')
        })
        .catch(err => {this.setState({error: err.message})})
    }

    render(){
        return(
            <View>
                <Text>Login</Text>
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

                <TouchableOpacity onPress={() => this.onSubmit()}>
                    <Text style={styles.button}> Send </Text> 
                </TouchableOpacity> 

                <Text style={styles.error}>{this.state.error}</Text>

                <TouchableOpacity onPress={() => this.props.navigation.navigate('Register')}>
                    <Text style={styles.text}>Don't have an account? Create one!</Text>
                </TouchableOpacity>

            </View>
        )
    }

}

export default Login