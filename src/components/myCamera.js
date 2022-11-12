import { Camera } from 'expo-camera'
import { React, Component } from 'react'
import { View, Text, TouchableOpacity, FlatList, Image, TextInput} from "react-native"
import {StyleSheet} from 'react-native';
import {storage} from '../firebase/config';

class MyCamera extends Component {

    constructor(props){
        super(props)
        this.state = {
            showCamera: true,
            permission: false,
            uriImg: ''
        }
        this.cameraMethods = undefined
    }


    componentDidMount() {
        Camera.requestCameraPermissionsAsync()
          .then(()=>{
               this.setState({
                   permission: true,
               })
          })
          .catch( e => console.log('El error fue' + e))          
      }

      takePicture(){
        console.log(this.cameraMethods);
        this.cameraMethods.takePictureAsync()
         .then(photo => {
            this.setState({
              uriImg: photo.uri, 
              showCamera:false
            })
        })
      }

      savePhoto(){
        fetch(this.state.uriImg)
         .then(res=>res.blob())
         .then(image =>{
           const ref=storage.ref(`photos/${Date.now()}.jpg`)
           ref.put(image)
                .then(()=>{
                   ref.getDownloadURL()
                        .then(url => {
                            this.props.onImageUpload(url);
                            
                        })
                 })
         })
         .catch(e=>console.log(e))
       }

       clearPhoto() {
        this.setState({
            showCamera: true,
            uriImg: ''
        })
       }
       
      
    
      render() {
        return (
            <>
            
            {this.state.permission ?

                this.state.showCamera === false ?
            
                <View style={styles.view}>

                    <Image
                    style={styles.camera}
                    source={{uri: this.state.uriImg}}
                    />

                    <View>
                        <TouchableOpacity onPress={() => this.savePhoto()}>

                            <Text>
                                
                            Use this image

                            </Text>

                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => this.clearPhoto()}>
                            <Text>
                            Delete
                            </Text>
                        </TouchableOpacity>
                    </View>

                </View>    

                :

                <View style={styles.view}>

                    <Camera
                    style={styles.camera}
                    type={Camera.Constants.Type.front}
                    ref = { (metodos) => this.cameraMethods = metodos }
                    />

                    <View style={styles.button}>

                        <TouchableOpacity onPress={() => this.takePicture()}>
                            <Text style={styles.field}>   Take a picture</Text>
                        </TouchableOpacity>

                    </View>

                </View>

                : 

                <Text>
                    You don't have permission
                </Text>

            }
            
            </>
            
        )
        }
}

const styles = StyleSheet.create({
    button : {
        flex: 1,
        justifyContent:'center',
        alignItems: 'center'
    },
    camera : {
        flex: 1,
        height: '800px',
        width: '400px'
    },
    view: {
        flex: 1
    },
    field: {
        fontSize: 15,
        backgroundColor: 'rgb(230, 230, 230)',
        margin: '1%',
        borderRadius: '30px',
        padding: '1%',
        color: 'rgb(153, 153, 153)',
        marginTop: '-2%'
    },
})

export default MyCamera


  
