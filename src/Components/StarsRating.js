import React, { Component } from 'react'
import { Text, View, TouchableWithoutFeedback, Animated, Easing } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'

export default class StarsRating extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rating: this.props.rating ?? 0,
            animation: new Animated.Value(1),
            numStars: this.props.numStars ?? 5,
            starColor: this.props.starColor ?? "gold"
        };
    }
    
    rate = star => {
        this.setState({ rating: star })
        this.props.getRating(star)
    };

    animate = () => {
        Animated.timing(this.state.animation, {
            toValue: 2,
            duration: 400,
            easing: Easing.ease,
            useNativeDriver: true
        }).start(() => {
            this.state.animation.setValue(1);
        });
    };

    render() {
        let stars = [];

        const animateScale = this.state.animation.interpolate({
            inputRange: [1, 1.5, 2],
            outputRange: [1, 1.4, 1]
        });

        const animateOpacity = this.state.animation.interpolate({
            inputRange: [1, 1.2, 2],
            outputRange: [1, 0.5, 1]
        });

        const animateWobble = this.state.animation.interpolate({
            inputRange: [1, 1.25, 1.75, 2],
            outputRange: ["0deg", "0deg", "0deg", "0deg"]
        });

        const animationStyle = {
            transform: [{ scale: animateScale }, { rotate: animateWobble }],
            opacity: animateOpacity
        };

        for (let x = 1; x <= this.state.numStars; x++) {
            stars.push(
                <TouchableWithoutFeedback
                    key={x}
                    onPress={() => { this.rate(x), this.animate() }}>
                    <Animated.View style={x <= this.state.rating ? animationStyle : ""}>
                        <Star filled={x <= this.state.rating ? true : false} color={this.state.starColor} />
                    </Animated.View>
                </TouchableWithoutFeedback>
            )
        }

        return (
            <View>
                <View style={{ flexDirection: "row" }}>{stars}</View>
            </View>
        )
    }
}

class Star extends React.Component {
    render() {
        return (
            <Icon
                name={this.props.filled === true ? "star" : "star-o"}
                color={this.props.color}
                size={30}
                style={{ marginHorizontal: 2 }}
            />
        );
    }
}
