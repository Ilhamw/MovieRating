import React, { Component } from 'react'
import { Text, View, SafeAreaView, TouchableOpacity, Image, StatusBar, ScrollView, ToastAndroid } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage';
import styles from '../../Styles';
import { getUser, handleImage } from '../../redux/action/UserAction'
import { getDetails } from '../../redux/action/MovieAction'
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome5'
import IconM from 'react-native-vector-icons/MaterialCommunityIcons'
import ImagePicker from 'react-native-image-picker';
import ProfileModal from '../../Components/ProfileModal';
import InfoModal from '../../Components/InfoModal'
import WatchListFlatList from '../../Components/WatchListFlatList';

class User extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: [],
            token: '',
            watchList: [],
            profileModal: false,
            infoModal: false,
            response: '',
        }
    }


    componentDidMount = async () => {
        await this.getToken()
        await this.getUser()
        await this.getWatchList()
    }

    getToken = async () => {
        const res = await AsyncStorage.getItem("token")
        this.setState({ token: res })
    }

    getWatchList = async () => {
        const res = await AsyncStorage.getItem("watchList")
        const list = JSON.parse(res)
        console.log("Watch List: ", list)
        const watchList = []
        for (let i = 0; i < list.length; i++) {
            await this.props.getDetails(list[i])
            console.log('id', list[i])
            const data = {
                id: list[i],
                num: (i + 1),
                title: this.props.details.movie_details[0].title,
            };
            console.log(data)
            watchList.push(data)
            this.setState({ watchList: watchList })
            // this.setState({watchList: [...this.state.watchList, data]})
        }
        console.log('WatchList:', this.state.watchList)
    }

    delMovie = async (id) => {
        const res = await AsyncStorage.getItem("watchList")
        const list = JSON.parse(res)
        list.splice((list.indexOf(id)), 1)
        console.log(list)
        await AsyncStorage.setItem("watchList", JSON.stringify(list))
        this.setState({ watchList: '' })
        this.getWatchList()
        ToastAndroid.showWithGravityAndOffset(
            'Movie removed from Watch List',
            ToastAndroid.SHORT,
            ToastAndroid.BOTTOM,
            0,
            200
          );
    }

    getUser = async () => {
        await this.props.getUser(this.state.token)
        if (this.props.user.info === "success") {
            this.setState({ user: this.props.userData })
            console.log("fetch complete")
        } else {
            console.log("error fetching")
        }
    }

    handleImage = () => {
        const options = {
            title: 'Select Avatar',
            customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
            storageOptions: {
                skipBackup: true,
                path: 'images',
            },
        };
        try {
            ImagePicker.showImagePicker(options, async (response) => {

                if (response.didCancel) {
                    console.log('User cancelled image picker');
                } else if (response.error) {
                    console.log('ImagePicker Error: ', response.error);
                } else if (response.customButton) {
                    console.log('User tapped custom button: ', response.customButton);
                } else {
                    this.props.handleImage(response, this.state.token)
                }
            });
        } catch (error) {
            console.log('error during upload', error)
        }
    }

    infoModal = async (id) => {
        // await this.getDetails(id)
        await this.props.getDetails(id);
        this.setState({ infoModal: !this.state.infoModal })
        // console.log('details', this.state.details)
    }

    profileModal = () => {
        this.setState({ profileModal: !this.state.profileModal })
    }

    exitModal = () => {
        this.setState({ profileModal: false, infoModal: false })
    }

    deleteToken = async () => {
        try {
            await AsyncStorage.removeItem('token');
            this.props.navigation.navigate('AuthLoading');
            ToastAndroid.showWithGravityAndOffset(
                'Log out successful',
                ToastAndroid.SHORT,
                ToastAndroid.BOTTOM,
                0,
                200
              );
        } catch (error) {
            console.log(error.message);
        }
    }

    render() {
        return (
            <SafeAreaView style={{ flex: 1, justifyContent: 'center', zIndex: 0 }}>
                <StatusBar backgroundColor='#FE024E' />
                <View style={{ flex: 1, backgroundColor: 'black', zIndex: 0 }}>
                    <View style={styles.userView}>
                        <View style={{ flex: 1, zIndex: 1 }}>
                            <View style={{ backgroundColor: "#FE024E", borderBottomEndRadius: 50, borderBottomStartRadius: 50, zIndex: 2, }} >
                                <Text style={styles.userHead}>User</Text>
                            </View>
                            <View style={{ flex: 0, flexDirection: 'row', padding: 7.5 }}>
                                <View>
                                    <Image style={{ height: 150, width: 150, borderRadius: 75, borderWidth: 2, borderColor: 'white', backgroundColor: '#E8E8E8' }}
                                        source={{ uri: this.props.image }} />
                                    <View style={{ position: 'absolute', left: 100, bottom: 0 }}>
                                        <TouchableOpacity
                                            onPress={async () => {
                                                await this.handleImage()
                                            }}>
                                            <Icon name="pen" size={25} color="#FFF" style={{ backgroundColor: 'orange', borderRadius: 22.5, padding: 10, overflow: 'hidden' }} />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                                <View style={{ flex: 1, justifyContent: "space-evenly", alignItems: 'center' }}>
                                    <View style={{ justifyContent: "center", alignItems: 'center' }}>
                                        <Text style={{ fontWeight: 'bold', fontSize: 20 }}>{this.props.userData.name}</Text>
                                        <Text style={{ fontSize: 18 }}>{this.props.userData.email}</Text>
                                    </View>
                                    <TouchableOpacity
                                        onPress={() => this.profileModal()}>
                                        <Text style={{ backgroundColor: '#FE024E', color: '#FFF', padding: 10, fontSize: 20, fontWeight: 'bold', borderRadius: 20 }}>Edit Profile</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <ScrollView style={{ flex: 1, backgroundColor: "#FFF", borderRadius: 17.5, marginVertical: 10, padding: 10 }}>
                                <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                                    <Text style={{ flex: 0, fontSize: 20, fontWeight: 'bold' }}>My WatchList</Text>
                                    <TouchableOpacity
                                        style={{ flex: 1 }}
                                        onPress={() => this.getWatchList()}>
                                        <IconM name="refresh" color="#FE024E" size={25} />
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={{ flex: 0, justifyContent: 'flex-end' }}
                                        onPress={async () => {
                                            await AsyncStorage.removeItem("watchList")
                                            ToastAndroid.showWithGravityAndOffset(
                                                'Watch List Cleared',
                                                ToastAndroid.SHORT,
                                                ToastAndroid.BOTTOM,
                                                0,
                                                200
                                            );
                                            this.setState({ watchList: '' })
                                        }}>
                                        <Text style={{ color: '#FE024E', textDecorationLine: 'underline' }}>clear WatchList</Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={{
                                    borderWidth: 1,
                                    borderColor: '#FE024E',
                                    marginVertical: 5
                                }} />
                                <WatchListFlatList
                                    watchList={this.state.watchList}
                                    infoModal={id => this.infoModal(id)}
                                    delMovie={id => this.delMovie(id)}
                                />
                            </ScrollView>
                            <TouchableOpacity style={{ flex: 0, padding: 10, marginHorizontal: 10, marginVertical: 2, backgroundColor: '#FFF', alignItems: "center", borderColor: '#467EE5', borderWidth: 3, borderRadius: 5 }}
                                onPress={() => this.deleteToken()}>
                                <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Logout</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

                <ProfileModal
                    visible={this.state.profileModal}
                    exitModal={this.exitModal}
                    image={this.props.image}
                    handleImage={() => this.handleImage()}
                />

                <InfoModal
                    details={this.props.details}
                    visible={this.state.infoModal}
                    disabled={true}
                    addWatchList={id => this.setWatchList(id)}
                    revModal={id => null}
                    exitModal={() => this.setState({ infoModal: false })}
                />
            </SafeAreaView>
        )
    }
}

const mapStateToProps = (state) => ({
    user: state.user,
    userData: state.user.user,
    details: state.movie.details,
    token: state.user.token,
    image: state.user.image,
})

export default connect(mapStateToProps, { getUser, handleImage, getDetails,  })(User)