import React, {Component} from 'react';
import MyCamera from '../components/MyCamera'
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, ScrollView} from 'react-native';
import {auth, db} from '../firebase/config';

const styles = StyleSheet.create({
    field: {
        width: '100%',
        fontSize: 15,
        backgroundColor: 'rgb(230, 230, 230)',
        margin: '1%',
        borderRadius: '30px',
        padding: '1%',
        color: 'rgb(153, 153, 153)'
    },
    title: {
        fontSize: 50,
        fontWeight: 'bold',
        height: 100,
        margin: 5,
    },
    button:{
        backgroundColor: 'rgb(255, 51, 0)',
        borderRadius: '30px',
        margin: '2%',
        padding: 3,
        textAlign: 'center',
        fontSize: 15,
        color: 'white',
        width: 350,
    },
    redirect: {
        textAlign: 'right',
        marginLeft: '50%',
        color: 'rgb(51, 51, 51)',
        marginTop: '1%',
        fontSize: 12,
        width: '100%',
        marginTop: '5%',
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
        width: '100vw',
        padding: 30,
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    camera: { 
        flex: 1,
        margin: 30
    },
    img: {
        width: '200px',
        height: '200px',
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
            urlImg: '',
            showCamera: true
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
                profilePicture: this.state.urlImg,
            })
        })
        .then(() => {this.props.navigation.navigate('Login')})
        .catch(err => {this.setState({error: err.message})})
    }

    onImageUpload(url){
        this.setState({showCamera: false, urlImg: url})
    }

    render(){
        return(
            <View style={styles.container}>
                <Text style={styles.title}>Register</Text>
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
                <TextInput style={styles.field} 
                keyboardType='default'
                    placeholder='   Username'
                    onChangeText={ text => this.setState({username:text}) }
                    value={this.state.username} 
                /> 
                <TextInput style={styles.field} 
                keyboardType='default'
                    placeholder='   Bio'
                    onChangeText={ text => this.setState({bio:text}) }
                    value={this.state.bio} 
                /> 
                {this.state.showCamera ? 
                    <View style={styles.camera}>
                        <MyCamera onImageUpload={(url) => this.onImageUpload(url)} style={styles.camera}/> 
                    </View>
                    :
                    <Image style={styles.img} source={{uri: this.state.urlImg}}/>
                }

                <Text style={styles.error}>{this.state.error}</Text>
                <Text style={styles.error}>{this.state.requiredField}</Text>

                <TouchableOpacity onPress={() => this.onSubmit()}>
                    <Text style={styles.button}> Send </Text> 
                </TouchableOpacity> 

                <TouchableOpacity onPress={() => this.props.navigation.navigate('Login')}>
                    <Text style={styles.redirect}>Already have an account? Log in!</Text>
                </TouchableOpacity> 
            </View>
        )
    }
}

export default Register
