import React, {Component} from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet} from 'react-native';
import { Camera } from 'expo-camera'
import {auth, db} from '../firebase/config';

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
            permission: false,
            urlPhoto: '',
            showCamera: true,
        }
    }

    componentDidMount(){
        auth.onAuthStateChanged((user)=>{
          console.log(user)
        })

        Camera.requestCameraPermissionsAsync()
        .then(() => {
            this.setState({permission: true})
        })
        .catch(e => console.log('El error fue' + e))
    }

    takePicture(){
        this.cameraMethods.takePictureAsync()
        .then(photo => {
           this.setState({
             urlPhoto: photo.uri, 
             showCamera:false
           })
       })
    }

    savePicture(){
        fetch(this.state.urlPhoto)
        .then(res => res.blob())
        .then(image => {
            const ref = storage.ref(`photos/${Date.now()}.jpg`)
            ref.put(image)
                .then(() =>{
                    ref.getDownloadURL()
                        .then(url => {
                            this.props.onImageUpload(url);
                        })
                })
        })
        .catch(e => console.log('El error es' + e))
    }

    deletePicture(){
        this.setState({urlPhoto: '', showCamera: true})
    }

    onSubmit(){
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
                <View>
                    {this.state.permission ?
                        this.state.showCamera === false ?
                        <View> 
                            <Text>Photo preview</Text>
                            <Image style={styles.preview}
                                source={ {uri:this.state.urlPhoto} }
                            />
                            <View> 
                                <TouchableOpacity onPress={() => this.savePicture}>
                                    <Text>Save</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => this.deletePicture}>
                                    <Text>Delete</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        :
                        <View> 
                            <Camera style={styles.cameraBody}
                            type={Camera.Constants.Type.back}
                            ref={cameraMethods => this.cameraMethods = cameraMethods}
                            />
                            <TouchableOpacity style={styles.shootButton} onPress={()=>this.takePicture()}>
                                <Text style={styles.field} >Upload a profile picture</Text>
                            </TouchableOpacity>
                        </View>
                    :
                    <Text>Permission is needed to use the camera</Text>
                    }
                </View>

                {
                    this.state.email == '' || this.state.password == '' || this.state.username == ''?
                    <Text>You need to fill the email, password and username</Text>
                    :
                    <TouchableOpacity onPress={() => this.onSubmit()}>
                        <Text style={styles.button}> Send </Text> 
                    </TouchableOpacity> 
                }

                <Text style={styles.error}>{this.state.error}</Text>

                <TouchableOpacity onPress={() => this.props.navigation.navigate('Login')}>
                    <Text style={styles.text}>Already have an account? Log in!</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

export default Register
