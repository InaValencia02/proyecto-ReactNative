import React, {Component} from 'react';
import {View, Image, Text, StyleSheet} from 'react-native';

const styles = StyleSheet.create({
    image: {
        height: 130,
        width: 130,
        borderRadius: '100%',
        alignSelf: 'center',
        marginTop: '5%'
    },
    resultsContainer:{
        display: 'flex',
        flexDirection: 'row',
        flex: 1,
        padding: 30,
    },
    name: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    bio:{
        fontSize: 20,
        color: 'rgb(153, 153, 153)',
    }
})

class SearchResults extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render(){
        console.log(this.props.userInfo)
        return(
            <View style={styles.resultsContainer}>
                
                <Text style={styles.name}>{this.props.userInfo.data.username} </Text>
                <Image source={{uri: this.props.userInfo.data.profilePicture}} style={styles.image}/>
                <Text style={styles.bio}>{this.props.userInfo.data.bio}</Text>
            </View>
        )
    }

}

export default SearchResults