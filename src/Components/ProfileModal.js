import React, { Component } from 'react'
import { Text, View, TouchableOpacity, Image, TextInput, Keyboard, ScrollView, ToastAndroid } from 'react-native'
import styles from "../Styles"
import { getUser, changeProfile, changePassword } from '../redux/action/UserAction'
import { connect } from 'react-redux';
import Modal from "react-native-modal";
import Icon from 'react-native-vector-icons/FontAwesome'
import Icon5 from 'react-native-vector-icons/FontAwesome5'

class ProfileModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            password: '',
            password_confirmation: '',
            hasFocus: ''
        }
    }

    componentDidMount = async () => {
        await this.props.getUser(this.props.token)
    }

    handleUpdate = async () => {
        console.log('click')
        if(this.state.name !== '') {
            console.log(this.state.name)
            await this.props.changeProfile(this.state.name, this.props.token)
        } else {
            console.log("Name field cannot be empty")
        }

        if (this.state.password !== '' && this.state.password === this.state.password_confirmation) {
            await this.props.changePassword(this.state.password, this.props.token)
        } else {
            console.log("Password and password confirmation does not match")
        }
        this.props.getUser(this.props.token)
        console.log('lewat')
        console.log(this.props.user.info)
        this.setState({name: '', password: '', password_confirmation: ''})
        ToastAndroid.showWithGravityAndOffset(
            'Profile Updated',
            ToastAndroid.SHORT,
            ToastAndroid.BOTTOM,
            0,
            200
          );
        this.props.exitModal()
    }

    render() {
        return (
            <Modal isVisible={this.props.visible}
                transparent={true}
                animationType='fade'
                onBackButtonPress={() => this.props.exitModal()}
                style={{ flex: 1, margin: 0, padding: 0 }}>
                <View style={{ flex: 1, backgroundColor: "rgb(180,180,180)" }}>
                    <View style={{ flex: 0, flexDirection: 'row', paddingVertical: 10, paddingHorizontal: 10, alignItems: 'center' }}>
                        <TouchableOpacity
                            onPress={() => this.props.exitModal()}>
                            <Icon name="close" color="#FFF" size={30} />
                        </TouchableOpacity>
                        <Text style={{ flex: 1, color: "#FFF", fontWeight: 'bold', fontSize: 25, marginHorizontal: 10 }}>Edit Profile</Text>
                        <TouchableOpacity
                            style={{ alignSelf: 'flex-end' }}
                            onPress={() => this.handleUpdate()}>
                            <Icon name="check" color="#FFF" size={30} />
                        </TouchableOpacity>
                    </View>
                    <ScrollView style={{ flex: 1, backgroundColor: "#FFF", margin: 3 }}>
                        <View style={{ zIndex: 1, margin: 15 }}>
                            <Image source={{ uri: this.props.image }}
                                style={styles.userPhoto} />
                            <View style={{ position: 'absolute', right: 110, bottom: 0, }}>
                                <TouchableOpacity
                                    onPress={() => this.props.handleImage()}>
                                    <Icon5 name="pen" size={25} color="#FFF" style={{ backgroundColor: 'orange', borderRadius: 22.5, padding: 10, overflow: 'hidden' }} />
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={{ paddingHorizontal: 25 }}>
                            <TextInput style={styles.input} placeholder={this.props.userData.name} placeholderTextColor={this.state.hasFocus === "name" ? "gray" : "#000"}
                                onChangeText={value => this.setState({ name: value })}
                                returnKeyType={"next"}
                                onFocus={() => this.setState({hasFocus: "name"})}
                                onBlur={() => this.setState({hasFocus: ''})}
                                onSubmitEditing={() => { this.passTextInput.focus(); }}
                                blurOnSubmit={false}></TextInput>
                            <TextInput keyboardType='email-address' style={styles.input}
                                placeholder={this.props.userData.email}
                                editable={false}></TextInput>
                            <TextInput secureTextEntry style={styles.input} placeholder='Change Password' placeholderTextColor={this.state.hasFocus === "pass" ? "gray" : "#000"}
                                onChangeText={value => this.setState({ password: value })}
                                ref={(input) => { this.passTextInput = input; }}
                                returnKeyType={"next"}
                                onFocus={() => this.setState({hasFocus: "pass"})}
                                onBlur={() => this.setState({hasFocus: ''})}
                                onSubmitEditing={() => { this.confirmTextInput.focus(); }}
                                blurOnSubmit={false}></TextInput>
                            <TextInput secureTextEntry style={styles.input} placeholder='Confirm New Password' placeholderTextColor={this.state.hasFocus === "connfirm" ? "gray" : "#000"}
                                onChangeText={value => this.setState({ password_confirmation: value })}
                                ref={(input) => { this.confirmTextInput = input; }}
                                onFocus={() => this.setState({hasFocus: "confirm"})}
                                onBlur={() => this.setState({hasFocus: ''})}
                                onSubmitEditing={() => { Keyboard.dismiss() }}
                                blurOnSubmit={false}></TextInput>
                        </View>
                    </ScrollView>
                </View>
            </Modal >
        )
    }
}

const mapStateToProps = (state) => ({
    user: state.user,
    userData: state.user.user,
    token: state.user.token,
    image: state.user.image,
})

export default connect(mapStateToProps, { getUser, changeProfile, changePassword })(ProfileModal)