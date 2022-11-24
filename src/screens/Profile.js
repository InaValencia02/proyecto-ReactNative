import React, { Component } from 'react';
import { StyleSheet, TouchableOpacity, Text, FlatList, ScrollView, TextInput, Image } from 'react-native';
import { View } from 'react-native-web';
import Posts from '../components/Posts'
import { EvilIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { auth, db } from '../firebase/config';
import firebase from 'firebase';
class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            updateBio: false,
            updateUserName: false,
            updatePass: false,
            newusername: '',
            newbio: '',
            newPass: '',
            oldPass: '',
            userid: null,
            user: '',
            info: [],
            posts: [],            
            otherUserID: '',
            otherUser: '',
            infoOtherUser: [],
            otherUserPosts: [],
            error: '',
            err: [],
        }
    }
    componentDidMount() {
        if (this.props.route.params != undefined) {
            this.otherUser()
            this.otherUserPosts()
        } else {
            this.userInfo()
            this.userPosts()
        }
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
    otherUser() {
        db.collection('users').where("owner", "==", this.props.route.params.user).onSnapshot(
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
    otherUserPosts() {
        db.collection('posts').where("owner", "==", this.props.route.params.user).onSnapshot(
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
        this.state.newusername == '' ?
            this.setState({ error: 'You cannot send an empty form' })
            :
            db.collection('users').doc(this.state.userid).update({
                username: this.state.newusername,
            }).then(() => this.setState({ updateUserName: false }))

    }
    updateBio() {
        this.state.newbio == '' ?
            this.setState({ error: 'You cannot send an empty form' })
            :
            db.collection('users').doc(this.state.userid).update({
                bio: this.state.newbio
            }).then(() => this.setState({ updateBio: false }))

    }
    updatePassword() {
        if (this.state.newPass == '') {
            this.setState({ error: 'You cannot send an empty form' })
        } else {
            const emailCred = firebase.auth.EmailAuthProvider.credential(auth.currentUser.email, this.state.oldPass);
            auth.currentUser.reauthenticateWithCredential(emailCred)
                .then(() => {
                    return auth.currentUser.updatePassword(this.state.newPass)
                        .then(this.setState({ updatePass: false }))
                        .catch(err => {this.setState({err: err.message})})
                })
                .catch(err => {this.setState({err: err.message})})
        }


    }

    render() {
        if (this.props.route.params != undefined) {
            return (

                <ScrollView style={styles.containerHome}>
                    <View style={styles.profileContainer}>
                        {this.state.info.profilePicture == undefined || this.state.info.profilePicture == "" ?
                            <Image style={styles.img} source={require('../../assets/nophoto.jpg')} resizeMode='contain' />
                            :
                            <Image style={styles.img} source={{ uri: this.state.info.profilePicture }} />
                        }
                        <View style={styles.infoProfileContainer}>


                            <Text>
                                {this.props.route.params.user}
                            </Text>
                            <Text>
                                {this.state.info.bio}
                            </Text>
                        </View>
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


                </ScrollView>

            )

        }
        else {
            console.log(this.state.info);
            return (

                <ScrollView style={styles.containerHome}>
                    <View style={styles.profileContainer}>

                        {this.state.info.profilePicture == undefined || this.state.info.profilePicture == "" ?
                            <Image style={styles.img} source={require('../../assets/nophoto.jpg')} resizeMode='contain' />
                            :
                            <Image style={styles.img} source={{ uri: this.state.info.profilePicture }} />
                        }


                        <View style={styles.infoProfileContainer}>
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
                                    <Text style={styles.error}>{this.state.error}</Text>
                                </View>
                                :
                                <View style={styles.updateContainer}>
                                    <Text style={styles.itemFirst}>
                                        @{this.state.info.username}
                                    </Text>
                                    <TouchableOpacity onPress={() => this.setState({ updateUserName: true })} style={styles.itemSecond}>
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
                                    <Text style={styles.error}>{this.state.error}</Text>
                                    <Text style={styles.error}>{this.state.err}</Text>
                                    <TouchableOpacity onPress={() => this.updatePassword()} >
                                        <Text style={styles.button} >Update</Text>
                                    </TouchableOpacity>
                                </View>
                                :
                                <View style={styles.updateContainer} >
                                    <Text style={styles.itemFirst}> {this.state.info.owner} </Text>
                                    <TouchableOpacity onPress={() => this.setState({ updatePass: true })} style={styles.itemSecond}>
                                        <AntDesign name="setting" size={24} color="black" />
                                    </TouchableOpacity>
                                </View>
                            }


                            <View>


                                {this.state.updateBio ?

                                    <View style={styles.item}>
                                        <TextInput
                                            style={styles.field}
                                            keyboardType='default'
                                            placeholder='New bio'
                                            onChangeText={(text) => { this.setState({ newbio: text }) }}
                                            value={this.state.newbio}

                                        />
                                        <Text style={styles.error}>{this.state.error}</Text>
                                        <TouchableOpacity onPress={() => this.updateBio()} >
                                            <Text style={styles.button} >Update</Text>
                                        </TouchableOpacity>
                                    </View>
                                    :

                                    <View style={styles.updateContainer}>
                                        <Text style={styles.itemFirst}>
                                            {this.state.info.bio}
                                        </Text>
                                        <TouchableOpacity onPress={() => this.setState({ updateBio: true })} style={styles.itemSecond}>
                                            <EvilIcons name="pencil" size={24} color="black" />
                                        </TouchableOpacity>

                                    </View>

                                }

                            </View>
                        </View>
                    </View>

                    <Text>
                        Posts: {this.state.posts.length}
                    </Text>

                    <TouchableOpacity onPress={() => this.logout()}>
                        <Text style={styles.logout}>Logout</Text>
                    </TouchableOpacity>

                    {this.state.posts.length == 0 ?

                        <Text style={styles.noPosts}> No posts yet </Text>
                        :
                        <FlatList
                            data={this.state.posts}
                            keyExtractor={item => item.id.toString()}
                            renderItem={({ item }) => <Posts post={item}
                                style={styles.flatlist} />}
                        />
                    }


                </ScrollView>

            )
        }



    }
}
const styles = StyleSheet.create({
    img: {
        height: 120,
        width: 120,
        marginTop: 10,
        borderRadius: 100,
        flex: 1,
    },
    profileContainer: {
        display: 'flex',
        flexWrap: 'wrap',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    infoProfileContainer: {
        flex: 3,
        textAlign: 'center'
    },
    updateContainer: {
        display: 'flex',
        flexDirection: 'row',
        margin: 10
    },
    itemFirst: {
        flex: 2
    },
    itemSecond: {
        flex: 1
    },
    button: {
        backgroundColor: 'rgb(255, 51, 0)',
        borderRadius: 5,
        marginTop: 7,
        margin: 2,
        padding: 4,
        textAlign: 'center',
        fontSize: 15,
        color: 'white',
        flex: 2,
        width: 50,
    },
    field: {
        fontSize: 15,
        backgroundColor: 'rgb(230, 230, 230)',
        margin: 2,
        borderRadius: 5,
        padding: 3,
        color: 'rgb(153, 153, 153)',
        flex: 2
    },
    error: {
        color: 'red',
        marginTop: 1,
        textAlign: 'center',
        fontSize: 10,
    },
    logout: {
        backgroundColor: 'rgb(255, 51, 0)',
        borderRadius: 5,
        marginTop: 7,
        margin: 4,
        padding: 5,
        textAlign: 'center',
        fontSize: 12,
        color: 'white',
        flex: 2,
        width: 100,
        justifyContent: 'center',
        alignSelf: 'center'

    },
    containerHome: {
        alignContent: 'center',
        textAlign: 'center',
        backgroundColor: '#F4F4F1'
    },
    flatlist: {
        flex: 1,
        width: '100%'
    },
    noPosts: {
        marginTop: '20px',
        textAlign: 'center'
    }
})
export default Profile