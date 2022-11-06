import { Camera } from 'expo-camera'
import { React, Component } from 'react'
import { View, Text, TouchableOpacity, FlatList, Image, TextInput} from "react-native"
import {StyleSheet} from 'react-native';


class MyCamera extends Component {

    constructor(props){
        super(props)
        this.state = {
            photo: '',
            showCamera: true,
            permission: false,
            description: '',
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
              photo: photo.uri, 
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
       
      
    
      render() {
        return (
            <View style={styles.view}>
                <Camera
                    style={styles.cameraBody}
                    type={Camera.Constants.Type.back}
                    ref={metodosDeCamara => this.metodosDeCamara = metodosDeCamara}
                 />

                <TouchableOpacity 
                    // style={styles.shootButton}
                    onPress={()=>this.takePicture()}>
                    <Text>Shoot</Text>
                </TouchableOpacity>



                <Image  style={styles.preview}
                        source={ {uri:this.state.photo} }
                />
                
                <View // style={styles.buttonArea} 
                >
                    <TouchableOpacity onPress={()=>this.savePhoto()}>
                        <Text>Aceptar</Text>
                    </TouchableOpacity>
                    
                    <TouchableOpacity onPress={()=>this.clearPhoto()}>
                        <Text>Rechazar</Text>
                    </TouchableOpacity>
                </View>

            </View>
            
        )
        }
}

const styles = StyleSheet.create({
    preview : {
        width: '50vw',
        height: '30vh',
    },
    cameraBody : {
        width: '30vw',
        height: '30vh',
        position: 'absolute',
    },
    view: {
        position: 'absolute',
        marginTop: '50px'
    }
})

export default MyCamera


  
