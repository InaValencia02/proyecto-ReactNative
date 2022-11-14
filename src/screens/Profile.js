import React, { Component } from 'react';
import { StyleSheet, ActivityIndicator, TouchableOpacity, Text, FlatList, ScrollView, TextInput } from 'react-native';
import { View } from 'react-native-web';
import { auth, db } from '../firebase/config';
import Posts from '../components/Posts'
import { EvilIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import firebase from 'firebase';



class Profile extends Component {

    constructor() {
        super();
        this.state = {
            userid: null,
            user: '',
            info: [],
            posts: [],
            updateBio: false,
            updateUserName: false,
            updatePass: false,
            newusername:'',
            newbio: '',
            newPass: '',
            oldPass: ''
        }
    }

    componentDidMount() {

        this.userInfo()

        this.userPosts()

    }

    userInfo() {
        db.collection('users').where("owner", "==", auth.currentUser.email).onSnapshot(
            docs => {

                docs.forEach(doc => {
                    this.setState({
                        userid: doc.id,
                        info: doc.data(),
                    })
                })
            }
        )
    }


    userPosts() {
        db.collection('posts').where("owner", "==", auth.currentUser.email).onSnapshot(
            docs => {
                let posts = []
                docs.forEach(doc => {
                    const data = doc.data();
                    const id = doc.id;
                    posts.push({ data, id })
                })
                this.setState({
                    posts: posts
                })
            }
        )
    }

    logout() {
        auth.signOut()
        this.props.navigation.navigate('Login')
    }

    updateUserName() {
        db.collection('users').doc(this.state.userid).update({
            username: this.state.newusername,
        }).then (() => this.setState({updateUserName: false})) 
        
    }
    updateBio() {
        db.collection('users').doc(this.state.userid).update({
            bio: this.state.newbio
        }).then(() => this.setState({updateBio: false}))
        
    }

    updatePassword( ) {
        const emailCred  = firebase.auth.EmailAuthProvider.credential(auth.currentUser.email, this.state.oldPass);
            auth.currentUser.reauthenticateWithCredential(emailCred)
            .then(() => {                    
              return auth.currentUser.updatePassword(this.state.newPass)
                        .then (this.setState({updatePass: false}));
            })
            .catch(error => {console.log(error);});
           
    }


    render() {



    
    
            return (        

                <ScrollView>
                     {this.state.updateUserName ?
                               
                               <View style={styles.updateContainer}>                             
                                  <TextInput 
                                  style={styles.field} 
                                  keyboardType='default'
                                    placeholder='New user name'
                                    onChangeText={(text) => { this.setState({ newusername: text }) }}
                                    value={this.state.newusername}
                                    
                                     />
                                  <TouchableOpacity onPress={() => this.updateUserName()} >
                                      <Text style={styles.button} >Update</Text>
                                  </TouchableOpacity>
                              </View>   
                              :
      
                              <View  style={styles.updateContainer}>
                              <Text style={styles.itemFirst}>
                                  @{this.state.info.username}
                              </Text>
                              <TouchableOpacity onPress={() => this.setState({updateUserName: true})} style={styles.itemSecond}>
                                  <EvilIcons name="pencil" size={24} color="black" />
                              </TouchableOpacity>
                          </View>                           
      
                          }
    
                    
                        {this.state.updatePass ?
                               
                               <View >  
                                <TextInput 
                                        style={styles.field} 
                                        keyboardType='default'
                                        placeholder='Old Password'
                                        onChangeText={(text) => { this.setState({ oldPass: text }) }}
                                        value={this.state.oldPass}
                                        
                                        />                           
                                  <TextInput 
                                    style={styles.field} 
                                    keyboardType='default'
                                    placeholder='New Password'
                                    onChangeText={(text) => { this.setState({ newPass: text }) }}
                                    value={this.state.newPass}
                                    
                                     />
                                  <TouchableOpacity onPress={() => this.updatePassword()} >
                                      <Text style={styles.button} >Update</Text>
                                  </TouchableOpacity>
                              </View>   
                              :
      
                              <View  style={styles.updateContainer} >
                              <Text style={styles.itemFirst}>
                                  {this.state.info.owner}
                              </Text>
                              <TouchableOpacity onPress={() =>  this.setState({updatePass: true})} style={styles.itemSecond}>
                                  <AntDesign name="setting" size={24} color="black" />
                              </TouchableOpacity>
          
                                </View>
                                                  
      
                          }
                   
    
                    <View>
    
    
                        {this.state.updateBio ?
                               
                             <View  style={styles.item}>                             
                                <TextInput
                                style={styles.field} 
                                keyboardType='default'
                                placeholder='New bio'
                                onChangeText={(text) => { this.setState({ newbio: text }) }}
                                value={this.state.newbio}
                               
                                />
                                <TouchableOpacity onPress={() => this.updateBio()} >
                                    <Text style={styles.button} >Update</Text>
                                </TouchableOpacity>
                            </View>   
                            :
    
                            <View  style={styles.updateContainer}>
                                <Text style={styles.itemFirst}>
                                {this.state.info.bio}
                                 </Text>
                                <TouchableOpacity onPress={() => this.setState({updateBio: true})} style={styles.itemSecond}>
                                <EvilIcons name="pencil" size={24} color="black" />
                                </TouchableOpacity>
    
                                </View>                            
    
                        }
    
                    </View>
    
    
                    <Text>
                        Posts: {this.state.posts.length}
                    </Text>
    
    
                    <FlatList
                        data={this.state.posts}
                        keyExtractor={item => item.id.toString()}
                        renderItem={({ item }) => <Posts post={item}
                            style={styles.flatlist} />}
                    />
    
                    <TouchableOpacity onPress={() => this.logout()}>
                        <Text style={styles.button}>Logout</Text>
                    </TouchableOpacity>
    
                </ScrollView>
    
            )


       ;
    }


}

const styles = StyleSheet.create({
    updateContainer: {
        display :'flex',
        flexDirection: 'row',
        margin: 10        
    },
    itemFirst: {
        flex: 2

    },
    itemSecond: {
        flex: 1
    },
    button:{
        backgroundColor: 'rgb(255, 51, 0)',
        borderRadius: 5,
        marginTop: '5%',
        margin: '2%',
        padding: '1%',
        textAlign: 'center',
        fontSize: 15,
        color: 'white',
        flex: 2
    },
    field: {
        fontSize: 15,
        backgroundColor: 'rgb(230, 230, 230)',
        margin: '1%',
        borderRadius: 5,
        padding: '1%',
        color: 'rgb(153, 153, 153)',
        flex: 2
    }


})

export default Profile