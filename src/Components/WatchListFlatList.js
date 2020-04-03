import React, { Component } from 'react'
import { Text, View, FlatList, TouchableOpacity } from 'react-native'
import IconM from 'react-native-vector-icons/FontAwesome5'
import IconE from 'react-native-vector-icons/Entypo'

export default class WatchListFlatList extends Component {
    render() {
        return (
            <FlatList
                data={this.props.watchList}
                renderItem={({ item }) => (
                    <View style={{ paddingHorizontal: 2, paddingBottom: 10 }}>
                        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={{ fontSize: 15 }}>{item.num}. </Text>
                            <Text style={{ flex: 1, fontSize: 15 }} ellipsizeMode="tail" numberOfLines={1} >{item.title}</Text>
                            <TouchableOpacity
                                style={{ alignSelf: 'flex-end', marginHorizontal: 5 }}
                                onPress={() => { console.log(item.id); this.props.infoModal(item.id) }}>
                                <IconE name="info-with-circle" color="#FE024E" size={25} />
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={{ alignSelf: 'flex-end' }}
                                onPress={() => { console.log(item.id); this.props.delMovie(item.id) }}>
                                <IconM name="trash" color="#FE024E" size={23} />
                            </TouchableOpacity>
                        </View>
                        <View style={{
                            flex: 1,
                            borderWidth: 1,
                            borderColor: 'black',
                            marginVertical: 2
                        }} />
                    </View>
                )}
                keyExtractor={item => item.num}
            />
        )
    }
}
