import React, { Component } from 'react';
import { Text, View, SafeAreaView, Image, TextInput, TouchableOpacity, TouchableHighlight, Keyboard } from 'react-native';;
import Icon from 'react-native-vector-icons/FontAwesome5';
import styles from '../../Styles';
import { register, addImage } from '../../redux/action/AuthAction';
import { connect } from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            password: '',
            password_confirmation: '',
            image: 'https://i.pinimg.com/originals/0d/36/e7/0d36e7a476b06333d9fe9960572b66b9.jpg',
            imageChange: false
        }
    }

    addImage = () => {
        return async dispatch => {
            console.log('pencet')
            const options = {
                title: 'Select Avatar',
                customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
                storageOptions: {
                    skipBackup: true,
                    path: 'images',
                },
            };
            try {
                await ImagePicker.showImagePicker(options, async (response) => {
    
                    if (response.didCancel) {
                        console.log('User cancelled image picker');
                    } else if (response.error) {
                        console.log('ImagePicker Error: ', response.error);
                    } else if (response.customButton) {
                        console.log('User tapped custom button: ', response.customButton);
                    } else {
                        console.log('response', response.uri);
                        this.props.addImage()
                    }
                });
            } catch (error) {
                console.log('error ', error)
            }
        }
    }

    render() {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: '#FFF', justifyContent: 'center' }}>
                <View style={{ padding: 30 }}>
                    <View style={{ zIndex: 1 }}>
                        <Image source={this.props.image == "" ? { uri: this.state.image } : { uri: this.props.image }}
                            style={styles.userPhoto} />
                        <View style={{ position: 'absolute', right: 100, bottom: 0, }}>
                            <TouchableOpacity
                                onPress={async () => {
                                    console.log(this.props.image)
                                    await this.props.addImage()
                                    if (this.props.auth.info == "success" && this.props.image !== "") {
                                        this.setState({ image: this.props.image })
                                        await AsyncStorage.setItem("image", [this.state.name, this.state.image, this.state.imageChange])
                                    } else {
                                        console.log('gk dapet')
                                    }
                                }
                                }>
                                <Icon name="pen" size={25} color="#FFF" style={{ backgroundColor: 'orange', borderRadius: 22.5, padding: 10, overflow: 'hidden' }} />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={{ paddingVertical: 30 }}>
                        <TextInput style={styles.input} placeholder='Name' placeholderTextColor="#000"
                            onChangeText={value => this.setState({ name: value })}
                            returnKeyType={"next"}
                            onSubmitEditing={() => { this.emailTextInput.focus(); }}
                            blurOnSubmit={false}></TextInput>
                        <TextInput keyboardType='email-address' style={styles.input} placeholder='Email' placeholderTextColor="#000"
                            onChangeText={value => this.setState({ email: value })}
                            ref={(input) => { this.emailTextInput = input; }}
                            returnKeyType={"next"}
                            onSubmitEditing={() => { this.passTextInput.focus(); }}
                            blurOnSubmit={false}></TextInput>
                        <TextInput secureTextEntry style={styles.input} placeholder='Password' placeholderTextColor="#000"
                            onChangeText={value => this.setState({ password: value })}
                            ref={(input) => { this.passTextInput = input; }}
                            returnKeyType={"next"}
                            onSubmitEditing={() => { this.confirmTextInput.focus(); }}
                            blurOnSubmit={false}></TextInput>
                        <TextInput secureTextEntry style={styles.input} placeholder='Confirm Password' placeholderTextColor="#000"
                            onChangeText={value => this.setState({ password_confirmation: value })}
                            ref={(input) => { this.confirmTextInput = input; }}
                            onSubmitEditing={() => { Keyboard.dismiss() }}
                            blurOnSubmit={false}></TextInput>
                    </View>
                    <View style={{ alignItems: 'center' }}>
                        <TouchableOpacity style={{ backgroundColor: '#FE024E', borderRadius: 30 }}
                            onPress={async () => {
                                await this.props.register(
                                    this.state.name,
                                    this.state.email,
                                    this.state.password,
                                    this.state.password_confirmation)
                                if (this.props.auth.info == "success") {
                                    this.props.navigation.navigate('Login')
                                    console.log("register success")
                                } else {
                                    console.log("register failed")
                                }
                            }}>
                            <Text style={{ color: '#FFF', fontSize: 20, fontWeight: 'bold', paddingVertical: 13, paddingHorizontal: 40 }}>SIGN UP</Text>
                        </TouchableOpacity>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{ fontSize: 15, fontWeight: 'bold', paddingVertical: 12 }}>Already have an account? </Text>
                            <TouchableOpacity
                                onPress={() => this.props.navigation.navigate('Login')}>
                                <Text style={{ fontSize: 15, fontWeight: 'bold', paddingVertical: 12, textDecorationLine: 'underline' }}>Sign In</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </SafeAreaView>
        )
    }
}

const mapStateToProps = (state) => ({
    auth: state.auth,
    image: state.auth.user.image
})

export default connect(mapStateToProps, { register, addImage })(Register)