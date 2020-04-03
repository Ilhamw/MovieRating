import { StyleSheet } from 'react-native'

export default StyleSheet.create({
    logo: {
        height: 160,
        width: 160,
        alignSelf: 'center',
        backgroundColor: '#FE024E',
        borderRadius: 25
    },

    userPhoto: {
        height: 180,
        width: 180,
        alignSelf: 'center',
        borderRadius: 180,
        borderColor: 'gray',
        borderWidth: 2
    },

    input: {
        color: '#000',
        fontSize: 20,
        marginVertical: Platform.OS === 'android' ? 5 : 15,
        borderBottomColor: '#000',
        borderBottomWidth: 1,
    },

    homeView: {
        flex: 1,
        backgroundColor: 'white',
        borderBottomStartRadius: 20,
        borderBottomEndRadius: 20,
        overflow: 'hidden',
    },

    userView: {
        flex: 1,
        backgroundColor: 'rgba(200, 200, 200, 1)',
        borderBottomStartRadius: 20,
        borderBottomEndRadius: 20,
        overflow: 'hidden',
    },

    sectionHead: {
        marginVertical: 5,
        fontSize: 30,
        fontWeight: 'bold',
        color: "#FE024E"
    },

    userHead: {
        color: "#FFF",
        textAlign: 'center', 
        alignSelf: 'center', 
        fontWeight: 'bold', 
        fontSize: 40, 
        fontFamily: Platform.OS == "android" ? 'sans-serif-condensed' : null
    },

    infoCards: {
        paddingHorizontal: 10, 
        paddingBottom: 10, 
        marginHorizontal: 10,
        marginVertical: 5,
        borderRadius: 15, 
        backgroundColor: "#FFF" 
    },

    reviewCards: {
        backgroundColor: '#FFF',
        margin: 10,
        padding: 10,
        borderRadius: 30
    }
})
