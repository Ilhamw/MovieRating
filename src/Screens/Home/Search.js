import React, { Component } from 'react'
import { Text, View, SafeAreaView, StatusBar, TextInput, TouchableWithoutFeedback, ToastAndroid } from 'react-native'
import RateModal from '../../Components/RateModal'
import InfoModal from '../../Components/InfoModal'
import ReviewModal from '../../Components/ReviewModal'
import { getDetails, getSearch } from '../../redux/action/MovieAction'
import { handleSubmit, getReviews } from '../../redux/action/RateAction'
import { connect } from 'react-redux';
import MoviesFlatList from '../../Components/MoviesFlatList';
import Icon from 'react-native-vector-icons/FontAwesome5'
import styles from '../../Styles';
import AsyncStorage from '@react-native-community/async-storage';

class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchInput: '',
            focus: [],
            movies: [],
            details: [],
            page: 1,
            infoModal: false,
            rateModal: false,
            revModal: false
        }
    }

    setWatchList = async (id) => {
        console.log('id', id)
        const res = await AsyncStorage.getItem("watchList")
        const list = JSON.parse(res)
        console.log('storage', list)
        if (list === null || list === undefined) {
            const newList = [id];
            console.log('storage', newList)
            await AsyncStorage.setItem("watchList", JSON.stringify(newList))
        } else if (list.includes(id) == false) {
            const newList = [...list, id]
            console.log('new', newList)
            await AsyncStorage.setItem("watchList", JSON.stringify(newList))
        } else {
            console.log('Movie already in Watch List')
            ToastAndroid.showWithGravityAndOffset(
                'Movie already in Watch List',
                ToastAndroid.SHORT,
                ToastAndroid.BOTTOM,
                0,
                200
              );
        }
    }

    infoModal = async (id) => {
        await this.getDetails(id)
        this.setState({ infoModal: !this.state.infoModal })
        // console.log('details', this.state.details)
    }

    rateModal = async (id) => {
        console.log('id', id)
        this.setState({ rateModal: !this.state.rateModal })
    }

    revModal = async (id, name) => {
        console.log(id)
        await this.props.getReviews(id)
        this.setState({ revModal: !this.state.revModal, name: name })
    }

    exitModal = () => {
        this.setState({ infoModal: false, rateModal: false, revModal: false })
    }

    getDetails = async id => {
        await this.props.getDetails(id);
        this.setState({ details: this.props.movie.details })
        // console.log('details', this.props.movie.details)
    }

    render() {
        return (
            <SafeAreaView style={{ flex: 1, justifyContent: 'center' }}>
                <StatusBar backgroundColor='#FE024E' />
                <View style={{ flex: 1, backgroundColor: 'black' }}>
                    <View style={styles.homeView}>
                        <View style={{ backgroundColor: '#FE024E', }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 10, paddingHorizontal: 5 }}>
                                <Icon name="play" color="#FE024E" size={20} style={{ backgroundColor: "#FFF", paddingLeft: 15, paddingRight: 10, paddingVertical: 5.5, borderRadius: 7.5, borderColor: "#FE024E", borderWidth: 1 }} />
                                <Text style={{ fontWeight: 'bold', fontSize: 30, color: "#FFF" }}>MilanTV</Text>
                            </View>
                            <View style={{ backgroundColor: "#FFF", marginTop: 2, borderTopStartRadius: 5, borderTopEndRadius: 5 }}>
                                <View style={{ flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: 'rgb(180,180,180)', marginVertical: 7, marginHorizontal: 5, paddingHorizontal: 10, borderRadius: 30 }}>
                                    <TouchableWithoutFeedback
                                        onPress={() => { this.input.focus() }} >
                                        <Icon name="search" color="rgb(180,180,180)" size={20} style={{ flex: 0, marginHorizontal: 5 }} />
                                    </TouchableWithoutFeedback>
                                    <TextInput placeholder="Search Movie..." ref={input => { this.input = input }} style={{ flex: 1, fontSize: 20, fontWeight: 'bold' }}
                                        onChangeText={async e => {
                                            const name = e.replace(' ', '_').toLowerCase()
                                            await this.setState({ searchInput: name })
                                            await this.props.getSearch(this.state.searchInput)
                                            this.setState({ movies: this.props.docs })
                                        }}
                                        onBlur={async () => {
                                            await this.props.getSearch(this.state.searchInput)
                                            this.setState({ movies: this.props.docs })
                                        }} />
                                </View>
                            </View>
                        </View>
                        <MoviesFlatList
                            movies={this.state.movies}
                            filtered={this.state.filtered}
                            infoModal={this.infoModal}
                            rateModal={this.rateModal}
                            getData={() => null}
                        />
                    </View>
                </View>

                <InfoModal
                    details={this.props.details}
                    visible={this.state.infoModal}
                    disable={false}
                    addWatchList={id => this.setWatchList(id)}
                    revModal={(id, name) => this.revModal(id, name)}
                    exitModal={() => this.setState({ infoModal: false })}
                />
                <RateModal
                    visible={this.state.rateModal}
                    exitModal={() => this.exitModal()}
                />

                <ReviewModal
                    visible={this.state.revModal}
                    reviews={this.props.reviews}
                    name={this.state.name}
                    exitModal={() => this.setState({ revModal: false })}
                />
            </SafeAreaView>
        )
    }
}

const mapStateToProps = (state) => ({
    movie: state.movie,
    details: state.movie.details,
    docs: state.movie.data,
    token: state.user.token,
    reviews: state.rate.reviews
})

export default connect(mapStateToProps, { getDetails, getSearch, handleSubmit, getReviews })(Search)