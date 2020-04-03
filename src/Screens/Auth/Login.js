import React, { Component } from 'react';
import { Text, View, SafeAreaView, Image, TextInput, TouchableOpacity, Keyboard } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'
import styles from '../../Styles'
import { login } from '../../redux/action/AuthAction'
import { connect } from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            image: ''
        }
    }


    componentDidMount = async () => {
        await this.getChange()
    }

    getChange = async () => {
        const res = await AsyncStorage.getItem("image")
        this.setState({ image: res })
        console.log('res', res)
        console.log('image', this.state.image)
    }

    setData = async (key, value) => {
        try {
            await AsyncStorage.setItem(key, value);
            console.log("data saved")
        } catch (error) {
            console.log("error saving data")
        }
    }

    render() {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: '#FFF', justifyContent: 'center' }}>

                <View style={{ padding: 30 }}>
                    <Image source={require('../../../assets/clap_w.png')} style={styles.logo} />
                    <View style={{ paddingVertical: 20 }}>
                        <TextInput keyboardType='email-address' style={styles.input} placeholder='Email' placeholderTextColor="#000"
                            onChangeText={value => this.setState({ email: value })}
                            returnKeyType={"next"}
                            onSubmitEditing={() => { this.passTextInput.focus(); }}
                            blurOnSubmit={false}></TextInput>
                        <TextInput secureTextEntry style={styles.input} placeholder='Password' placeholderTextColor="#000"
                            onChangeText={value => this.setState({ password: value })}
                            ref={(input) => { this.passTextInput = input; }}
                            onSubmitEditing={() => { Keyboard.dismiss() }}
                            blurOnSubmit={false}></TextInput>
                    </View>
                    <View style={{ alignItems: 'center' }}>
                        <TouchableOpacity style={{ backgroundColor: '#FE024E', borderRadius: 30 }}
                            onPress={async () => {
                                await this.props.login(
                                    this.state.email,
                                    this.state.password)
                                if (this.props.auth.info == "login success" && this.props.token !== "") {
                                    await this.setData("token", this.props.token)
                                    this.props.navigation.navigate('AuthLoading')
                                    console.log("login success")
                                } else {
                                    console.log("login failed")
                                }
                            }}>
                            <Text style={{ color: '#FFF', fontSize: 20, fontWeight: 'bold', paddingVertical: 13, paddingHorizontal: 40 }}>SIGN IN</Text>
                        </TouchableOpacity>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{ fontSize: 15, fontWeight: 'bold', paddingVertical: 12, paddingHorizontal: 5 }}>Don't have an account?</Text>
                            <TouchableOpacity
                                onPress={() => this.props.navigation.navigate('Register')}>
                                <Text style={{ fontSize: 15, fontWeight: 'bold', paddingVertical: 12, textDecorationLine: 'underline' }}>Sign Up</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <View style={{
                                flex: 1,
                                borderWidth: 1,
                                borderColor: '#FE024E',
                            }} />

                            <Text style={{ flex: 0, color: '#FE024E', fontSize: 20, marginHorizontal: 10 }}> or </Text>

                            <View style={{
                                flex: 1,
                                borderWidth: 1,
                                borderColor: '#FE024E',
                            }} />
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginVertical: 15 }}>
                        <TouchableOpacity >
                            <Icon name="facebook-square" color="#3b5998" size={60} />
                        </TouchableOpacity>
                        <TouchableOpacity >
                            <Icon name="google-plus-square" color="#db4a39" size={60} />
                        </TouchableOpacity>
                        <TouchableOpacity >
                            <Icon name="linkedin-square" color="#0e76a8" size={60} />
                        </TouchableOpacity>
                    </View>
                </View>

            </SafeAreaView>
        )
    }
}

const mapStateToProps = (state) => ({
    auth: state.auth,
    name: state.auth.user.name,
    token: state.auth.user.token
})

export default connect(mapStateToProps, { login })(Login)