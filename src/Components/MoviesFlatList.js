import React, { Component } from 'react'
import { Text, View, FlatList, TouchableOpacity, Image } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import IconE from 'react-native-vector-icons/Entypo'

export default class MoviesFlatList extends Component {
    render() {
        return (
            <FlatList
                data={this.props.movies}
                renderItem={({ item }) => (
                    <View style={{ borderRadius: 25, padding: 8, margin: 10, borderColor: '#FE024E', borderWidth: 2 }}>
                        <View style={{ flex: 0, flexDirection: 'row' }}>
                            <View style={{ flex: 0 }}>
                                <Image source={{ uri: item.movie_detail[0].poster }} style={{ height: 130, width: 130, borderRadius: 10 }} />
                            </View>
                            <View style={{ flex: 1, marginHorizontal: 5 }}>
                                <Text style={{ marginVertical: 5, fontWeight: 'bold', fontSize: 25, color: '#FE024E' }}
                                    ellipsizeMode="tail" numberOfLines={1}
                                >{item.movie_detail[0].title}</Text>
                                <View style={{
                                    borderWidth: 1,
                                    borderColor: '#FE024E',
                                }} />
                                <View style={{ flex: 1, flexDirection: 'row' }}>
                                    <View style={{ flex: 0 }}>
                                        <Text style={{ color: "#FE024E", fontWeight: 'bold' }}>{item.movie_detail[0].releaseYear}</Text>
                                        <Text style={{ color: "#FE024E", fontWeight: 'bold', fontSize: 20 }}>
                                            {item.ratingAverage ? item.ratingAverage : "N/A"} {<Icon name="star" color="gold" size={20} />}
                                        </Text>
                                    </View>
                                    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end' }}>
                                        <TouchableOpacity
                                            style={{ alignSelf: 'flex-end', marginHorizontal: 5 }}
                                            onPress={() => { console.log(item.movie_detail[0]._id); this.props.infoModal(item.movie_detail[0]._id) }}>
                                                <IconE name="info-with-circle" color="#FE024E" size={32} />
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            style={{ alignSelf: 'flex-end' }}
                                            onPress={() => this.props.rateModal(item.movie_detail[0]._id)}>
                                            <Text style={{ backgroundColor: "#FE024E", borderRadius: 20, padding: 7.5, color: "#FFF", fontWeight: 'bold' }}>Rate</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>
                )}
                keyExtractor={item => item.movie_detail[0]._id}
                onEndReachedThreshold={0.5}
                onEndReached={({ }) => {
                    this.props.getData()
                }}
            />
        )
    }
}
