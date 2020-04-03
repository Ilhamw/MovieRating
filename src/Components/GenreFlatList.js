import React, { Component } from 'react'
import { Text, View, FlatList, TouchableOpacity } from 'react-native'

export default class GenreFlatList extends Component {
    render() {
        return (
            <FlatList
                horizontal={true}
                data={this.props.genre}
                renderItem={({ item }) => (
                    <TouchableOpacity
                    onPress={() => {
                        this.props.getFilter(item.name, item.id)}
                    }
                    >
                        <Text
                            style={{
                                // backgroundColor: this.props.focus.includes(item.name) ? "#FE024E" : "white",
                                backgroundColor: this.props.focus == item.name ? "#FE024E" : "white",
                                borderRadius: 30,
                                overflow: 'hidden',
                                paddingVertical: 10,
                                paddingHorizontal: 15,
                                margin: 5,
                                textAlign: "center"
                            }}
                        >{item.name}</Text>
                    </TouchableOpacity>
                )}
                keyExtractor={item => item._id}
            />
        )
    }
}
