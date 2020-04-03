import React, { Component } from 'react'
import { Text, View, FlatList, TouchableOpacity, Image } from 'react-native'
import Modal from "react-native-modal";
import Icon from 'react-native-vector-icons/FontAwesome'
import styles from '../Styles';

export default class ReviewModal extends Component {
    render() {
        return (
            <Modal isVisible={this.props.visible}
                transparent={true}
                animationType='fade'
                onBackdropPress={() => this.props.exitModal()}
                onBackButtonPress={() => this.props.exitModal()}
                style={{ margin: 0, padding: 0, backgroundColor: 'rgb(180,180,180)' }}>
                <View style={{ flex: 0, flexDirection: 'row', paddingVertical: 10, paddingHorizontal: 10, alignItems: 'center', backgroundColor: '#FE024E' }}>
                    <TouchableOpacity
                        onPress={() => this.props.exitModal()}>
                        <Icon name="close" color="#FFF" size={30} />
                    </TouchableOpacity>
                    <Text ellipsizeMode="tail" numberOfLines={1} style={{ flex: 1, color: "#FFF", fontWeight: 'bold', fontSize: 25, marginHorizontal: 10 }}>{this.props.name}</Text>
                </View>
                <View style={{ flex: 1 }}>
                    {this.props.reviews.docs === undefined ? null :
                        <FlatList
                            data={this.props.reviews.docs}
                            renderItem={({ item }) => (
                                <View style={styles.reviewCards}>
                                    <View style={{ flexDirection: 'row' }}>
                                        <Image source={{ uri: item.owner.image }} style={{ height: 75, width: 75, borderRadius: 37.5, backgroundColor: '#000', overflow: 'hidden' }} />
                                        <View style={{ justifyContent: 'space-evenly' }}>
                                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                <Icon name="star" color="gold" size={30} />
                                                <Text style={{ fontSize: 25, marginHorizontal: 5 }}>{item.rating}/10</Text>
                                                <Text style={{ fontSize: 25, fontWeight: 'bold' }}>{item.title}</Text>
                                            </View>
                                            <Text style={{ fontSize: 20, fontWeight: 'bold', marginHorizontal: 10 }}>User: {item.owner.name}</Text>
                                        </View>
                                    </View>
                                    <View style={{
                                        borderWidth: 1,
                                        borderColor: '#FE024E',
                                        marginVertical: 2
                                    }} />
                                    <Text style={{ padding: 10 }}>{item.description}</Text>
                                </View>
                            )}
                            keyExtractor={item => item._id}
                        />
                    }
                </View>
            </Modal>
        )
    }
}

