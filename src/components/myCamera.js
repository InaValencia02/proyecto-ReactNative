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
    }


    componentDidMount() {
        Camera.requestCameraPermissionsAsync()
          .then(()=>{
               this.setState({
                   permission: true,
               })
          })
          .catch( e => console.log(e))          
      }

      takePicture(){
        console.log(this.metodosDeCamara);
        this.metodosDeCamara.takePictureAsync()
         .then(photo => {
            this.setState({
              uriImg: photo.uri, 
              showCamera:false
            })
        })
      }

      savePhoto(){
        fetch(this.state.photo)
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
            showCamera: true
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
                    type={Camera.Constants.Type.back}
                    ref = { (metodos) => this.metodosDeCamara = metodos }
                    />

                    <View style={styles.button}>

                        <TouchableOpacity onPress={() => this.takePicture()}>
                            <Text>
                            Take picture
                            </Text>
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
        flex: 1
    },
    camera : {
        flex: 1,
        height: '800px',
        width: '400px'
    },
    view: {
        flex: 1
    }
})

export default MyCamera


  
