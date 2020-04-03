import React, { Component } from 'react'
import { Text, View, SafeAreaView, TouchableOpacity, StatusBar, ToastAndroid } from 'react-native'
import RateModal from '../../Components/RateModal'
import InfoModal from '../../Components/InfoModal'
import ReviewModal from '../../Components/ReviewModal'
import GenreFlatList from '../../Components/GenreFlatList';
import { getNowPlaying, getGenres, getFilter, getDetails } from '../../redux/action/MovieAction'
import { handleSubmit, getReviews } from '../../redux/action/RateAction'
import { getToken } from '../../redux/action/UserAction'
import { connect } from 'react-redux';
import MoviesFlatList from '../../Components/MoviesFlatList';
import Icon from 'react-native-vector-icons/FontAwesome5'
import styles from '../../Styles';
import AsyncStorage from '@react-native-community/async-storage';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            focus: [],
            genres: [],
            movies: [],
            details: [],
            page: 1,
            filtered: false,
            infoModal: false,
            rateModal: false,
            revModal: false,
            title: '',
            rating: 0,
            description: '',
            id: '',
            name: ''
        }
    }

    componentDidMount = async () => {
        await this.getNowPlaying()
        await this.getGenres()
        await this.props.getToken()
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
            ToastAndroid.showWithGravityAndOffset(
                'Movie added to Watch List',
                ToastAndroid.SHORT,
                ToastAndroid.BOTTOM,
                0,
                200
            );
        } else if (list.includes(id) == false) {
            const newList = [...list, id]
            console.log('new', newList)
            await AsyncStorage.setItem("watchList", JSON.stringify(newList))
            ToastAndroid.showWithGravityAndOffset(
                'Movie added to Watch List',
                ToastAndroid.SHORT,
                ToastAndroid.BOTTOM,
                0,
                200
            );
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

    getNowPlaying = async () => {
        await this.props.getNowPlaying(this.state.page);
        const data = this.props.docs
        this.setState({ movies: [...this.state.movies, ...data] })
    }

    getGenres = async () => {
        await this.props.getGenres();
        await this.setState({ genres: this.props.movie.genres })
    }

    getFilter = async (name, id) => {
        // Multi-select Genre Filter
        // console.log('genre ny', name)
        // if (this.state.focus.includes(id)) {
        //     await this.state.focus.splice(this.state.focus.indexOf(id), 1)
        // } else if (this.state.focus.includes(id) == false) {
        //     await this.state.focus.push(id)
        // }
        // console.log(this.state.focus)
        // await this.props.getFilter(this.state.focus.toString());
        // this.setState({ movies: this.props.docs })

        if (this.state.focus == name) {
            this.setState({ focus: '', page: 1, movies: '' })
            this.getNowPlaying()
        } else {
            if (this.state.filtered) {
                try {
                    await this.props.getFilter(this.state.focus)
                    const data = this.props.docs
                    this.setState({ movies: data, filtered: true })
                } catch (error) {
                    console.log('filter error', error)
                }
            }
            await this.setState({ focus: name, page: 1 });
            try {
                await this.props.getFilter(this.state.focus)
                const data = this.props.docs
                this.setState({ movies: data, filtered: true })
            } catch (error) {
                console.log('filter error', error)
            }
        }
    }

    infoModal = async (id) => {
        await this.props.getDetails(id);
        this.setState({ infoModal: !this.state.infoModal })
    }

    rateModal = async (id) => {
        this.setState({ id: id })
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
                            <View style={{ backgroundColor: "#FFF", paddingTop: 2, borderTopStartRadius: 5, borderTopEndRadius: 5 }}>
                                <GenreFlatList
                                    genre={this.state.genres}
                                    focus={this.state.focus}
                                    getFilter={(name, id) => this.getFilter(name, id)}
                                />
                            </View>
                        </View>
                        <MoviesFlatList
                            movies={this.state.movies}
                            filtered={this.state.filtered}
                            infoModal={id => this.infoModal(id)}
                            rateModal={id => this.rateModal(id)}
                            getData={async () => {
                                if (this.props.movie.data.hasNextPage == false) {
                                    null
                                } else {
                                    await this.setState({ page: (this.state.page + 1) })
                                    if (this.state.filtered) {
                                        this.getFilter()
                                    } else {
                                        if (this.state.focus == '') {
                                            this.getNowPlaying()
                                        } else {
                                            this.setState({ focus: '', page: 1 })
                                            this.getNowPlaying()
                                        }
                                    }
                                }
                            }}
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
                    rating={this.state.rating}
                    changeTitle={e => this.setState({ title: e })}
                    changeDesc={e => this.setState({ description: e })}
                    getRating={value => this.setState({ rating: value })}
                    handleSubmit={async () =>
                        await this.props.handleSubmit(
                            this.state.title,
                            this.state.rating,
                            this.state.description,
                            this.state.id,
                            this.props.token)
                        }
                    exitModal={() => this.setState({ rateModal: false })}
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

export default connect(mapStateToProps, { getNowPlaying, getGenres, getFilter, getDetails, getToken, handleSubmit, getReviews })(Home)