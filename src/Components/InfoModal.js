import React, { Component } from 'react'
import { Text, View, TouchableOpacity, Image, ImageBackground, Linking, ScrollView } from 'react-native'
import styles from "../Styles"
import Modal from "react-native-modal";
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome'

class InfoModal extends Component {
    render() {
        return (
            <Modal isVisible={this.props.visible}
                transparent={true}
                animationType='fade'
                onBackButtonPress={() => this.props.exitModal()}
                style={{ flex: 1, margin: 0, padding: 0, backgroundColor: 'gray' }}>
                {this.props.details.movie_details == undefined ? <View /> :
                    <View style={{ flex: 1, justifyContent: 'flex-end' }}>
                        <ScrollView style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.6)' }}>
                            <ImageBackground
                                blurRadius={2}
                                style={{
                                    flex: 1,
                                    height: 'auto',
                                    width: '100%',
                                    borderBottomLeftRadius: 20,
                                    borderBottomRightRadius: 20,
                                }}
                                source={{ uri: this.props.details.movie_details[0].poster }}
                            >
                                <View style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)' }}>
                                    <TouchableOpacity
                                        onPress={() => this.props.exitModal()}>
                                        <Icon name="close" color="white" size={30} />
                                    </TouchableOpacity>
                                    <View style={{ flexDirection: 'row', marginLeft: 15, marginVertical: 20 }} >
                                        <Image
                                            style={{ height: 200, width: 160, marginRight: 5, }}
                                            source={{ uri: this.props.details.movie_details[0].poster }}
                                        />
                                        <View style={{ flex: 1, justifyContent: 'space-around', alignItems: 'center' }}>
                                            <TouchableOpacity onPress={() => Linking.openURL(this.props.details.movie_details[0].trailer)}>
                                                <Text style={{ backgroundColor: "#FE024E", color: "#FFF", width: 180, fontSize: 20, fontWeight: 'bold', paddingVertical: 7.5, borderRadius: 12, textAlign: 'center' }}>Watch Trailer</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity
                                                disabled={this.props.disabled}
                                                onPress={() => this.props.addWatchList(this.props.details.movie_details[0]._id)}>
                                                <Text style={{
                                                    color: this.props.disabled ? "gray" : "#FFF",
                                                    borderColor: this.props.disabled ? "gray" : "#FFF",
                                                    width: 180,
                                                    fontSize: 20,
                                                    fontWeight: 'bold',
                                                    paddingVertical: 8,
                                                    borderRadius: 12,
                                                    borderWidth: 3,
                                                    textAlign: 'center'
                                                }}>Add to Watchlist</Text>
                                            </TouchableOpacity>
                                            <View>
                                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                    <Text style={{ fontSize: 23, fontWeight: 'bold', color: "#FFF" }}>{this.props.details.movie_rating}</Text>
                                                    <Icon name="star" color={this.props.details.movie_rating < 2 ? "gray" : "gold"} size={25} />
                                                    <Icon name="star" color={this.props.details.movie_rating < 4 ? "gray" : "gold"} size={25} />
                                                    <Icon name="star" color={this.props.details.movie_rating < 6 ? "gray" : "gold"} size={25} />
                                                    <Icon name="star" color={this.props.details.movie_rating < 8 ? "gray" : "gold"} size={25} />
                                                    <Icon name="star" color={this.props.details.movie_rating < 10 ? "gray" : "gold"} size={25} />
                                                </View>
                                                <Text style={{ fontSize: 18, fontWeight: 'bold', color: "#FFF" }}>{this.props.details.movie_reviews.length} Reviews</Text>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                            </ImageBackground>
                            <View style={{ borderRadius: 10 }}>
                                <View style={styles.infoCards}>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <Text style={styles.sectionHead}>{this.props.details.movie_details[0].title}</Text>
                                    </View>
                                    <View style={{ flexDirection: "row", justifyContent: 'space-between' }}>
                                        <View style={{ flex: 1, flexDirection: "row", marginVertical: 5 }}>
                                            {this.props.details.movie_details[0].genre == undefined ? null :
                                                this.props.details.movie_details[0].genre.map(e => <Text> {e} </Text>)}
                                        </View>
                                        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{this.props.details.movie_details[0].releaseYear}</Text>
                                    </View>
                                </View>
                            </View>
                            <View style={{
                                marginHorizontal: 10,
                                marginVertical: 1
                            }} />
                            <View style={styles.infoCards}>
                                <Text style={styles.sectionHead}>Synopsis</Text>
                                <Text style={{ fontSize: 18 }}>{this.props.details.movie_details[0].synopsis}</Text>
                            </View>
                            <View style={{
                                marginHorizontal: 10,
                                marginVertical: 1
                            }} />
                            <View style={styles.infoCards}>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <Text style={styles.sectionHead}>Reviews</Text>
                                    <TouchableOpacity
                                        onPress={() => this.props.revModal(
                                            this.props.details.movie_details[0]._id,
                                            this.props.details.movie_details[0].title
                                        )}>
                                        <Text style={{ color: '#FE024E', fontSize: 15 }}>See all</Text>
                                    </TouchableOpacity>
                                </View>
                                <View>
                                    {this.props.details.movie_reviews[0] ?
                                        <Text>{this.props.details.movie_reviews[0].title}</Text>
                                        : <Text>No Reviews</Text>}
                                </View>

                            </View>
                        </ScrollView>
                    </View>}
            </Modal >
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

export default connect(mapStateToProps)(InfoModal)