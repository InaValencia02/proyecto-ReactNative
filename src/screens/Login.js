import React, {Component} from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import {auth} from '../firebase/config';

const styles = StyleSheet.create({
    field: {
        fontSize: 15,
        backgroundColor: 'rgb(230, 230, 230)',
        margin: '1%',
        borderRadius: '30px',
        padding: '1%',
        color: 'rgb(153, 153, 153)'
    },
    
    button:{
        backgroundColor: 'rgb(255, 51, 0)',
        borderRadius: '30px',
        marginTop: '5%',
        margin: '2%',
        padding: '1%',
        textAlign: 'center',
        fontSize: 15,
        color: 'white',
    },
    redirect: {
        textAlign: 'right',
        marginRight: '4%',
        color: 'rgb(51, 51, 51)',
        marginTop: '1%',
        fontSize: 12,
    },
    error: {
        color: 'red',
        marginTop: '1%',
        textAlign: 'center',
        fontSize: 12,
    },
    container: {
        backgroundColor: 'white',
        flex: 1,
        
    }, 
    titleContainer: {
        display: 'flex',
        flexWrap: 'wrap',
        flexDirection: 'row',
        justifyContent: 'center',   
        alignItems: 'center',
        marginBottom: 35,

         
    },
    img:{
        height: 120,
        width: 120,
        marginTop: 10,
        borderRadius: 100,
        flex: 1,
    },
    title: {
        fontSize: 50,
        fontWeight: 'bold',
        margin: 10,        
        flex: 2
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
            requiredField: '',
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
        this.state.email == '' || this.state.password == '' ? 
        this.setState({requiredField: 'You need to fill the email and password to submit this form'})
        :
        auth.signInWithEmailAndPassword(this.state.email, this.state.password)
        .then( res => {
            this.setState({login: true})
            this.props.navigation.navigate('AppMainWindow')
        })
        .catch(err => {this.setState({error: err.message})})
    }

    render(){
        return(
            <View style={styles.container}>

                <View style={styles.titleContainer}>
                <Image style={styles.img} source={require('../../assets/favicon.png')} resizeMode='contain'/>
                <Text style={styles.title}>Login</Text>
                </View>
                

                <TextInput style={styles.field} 
                    keyboardType='email-address'
                    placeholder='   Email'
                    onChangeText={ text => this.setState({email:text}) }
                    value={this.state.email} 
                /> 
                <TextInput style={styles.field} 
                    keyboardType='default'
                    placeholder='   Password'
                    secureTextEntry={true} 
                    onChangeText={ text => this.setState({password:text}) }
                    value={this.state.password}
                /> 

                <Text style={styles.error}>{this.state.error}</Text>
                <Text style={styles.error}>{this.state.requiredField}</Text>

                <TouchableOpacity onPress={() => this.onSubmit()}>
                    <Text style={styles.button}> Send </Text> 
                </TouchableOpacity> 

                <TouchableOpacity onPress={() => this.props.navigation.navigate('Register')}>
                    <Text style={styles.redirect}>Don't have an account? Create one!</Text>
                </TouchableOpacity>

            </View>
        )
    }

}

export default Login