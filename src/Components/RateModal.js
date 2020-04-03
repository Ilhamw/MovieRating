import React, { Component } from 'react'
import { Text, View, TextInput, TouchableOpacity } from 'react-native'
import Modal from "react-native-modal";
import StarsRating from './StarsRating';

export default class RateModal extends Component {
    render() {
        return (
            <Modal isVisible={this.props.visible}
                transparent={true}
                animationType='fade'
                onBackdropPress={() => this.props.exitModal()}
                onBackButtonPress={() => this.props.exitModal()}
                style={{ flex: 1 }}>
                <View style={{
                    backgroundColor: '#FE024E',
                    alignItems: 'center',
                    borderRadius: 15,
                    overflow: 'hidden'
                }}>
                    <Text style={{ fontWeight: 'bold', fontSize: 30, color: "#FFF" }}>Rate Movie</Text>
                    <View style={{ alignItems: 'center', width: '100%', padding: 20, backgroundColor: "rgb(180,180,180)", borderRadius: 15 }}>
                        <Text style={{fontSize: 20, fontWeight: 'bold'}}>How was the Movie?</Text>
                        <View style={{ flexDirection: 'row', justifyContent: 'center', marginVertical: 10 }}>
                            <StarsRating
                                numStars={10}
                                getRating={value => this.props.getRating(value)}
                            />
                        </View>
                        <Text style={{ fontWeight: 'bold', fontSize: 17, marginVertical: 5 }}>Your Rating: {this.props.rating}</Text>
                        <TextInput placeholder="Write a headline for your review here" style={{ width: '100%', backgroundColor: '#FFF', borderRadius: 10, marginVertical: 5 }} 
                        onChangeText={e => this.props.changeTitle(e)}/>
                        <TextInput placeholder="Write your review here" style={{ textAlignVertical: 'top', height: 150, width: '100%', backgroundColor: '#FFF', borderRadius: 10 }} 
                        onChangeText={e => this.props.changeDesc(e)}/>
                        <TouchableOpacity
                        onPress={async () => {
                            await this.props.handleSubmit(),
                            this.props.exitModal()
                        }}>
                            <Text style={{backgroundColor: "#FE024E", paddingVertical: 8, paddingHorizontal: 25, margin: 10, fontSize: 20, fontWeight: 'bold', color: "#FFF", borderRadius: 10}}>Submit</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        )
    }
}
