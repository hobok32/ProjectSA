import { StyleSheet, Dimensions } from 'react-native';

let width = Dimensions.get('screen').width;
let height = Dimensions.get('screen').height;

HEADER_MAX_HEIGHT = height / 5;
HEADER_MIN_HEIGHT = HEADER_MAX_HEIGHT / 2;

PROFILE_IMAGE_MAX_HEIGHT = HEADER_MAX_HEIGHT / 1.5;
PROFILE_IMAGE_MIN_HEIGHT = PROFILE_IMAGE_MAX_HEIGHT / 2;

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    header: {
        position: 'absolute',
        top: 0, left: 0, right: 0, bottom: 0,
        backgroundColor: 'lightskyblue',
        height: HEADER_MAX_HEIGHT
    },
    imgView: {
        height: PROFILE_IMAGE_MAX_HEIGHT,
        width: width,
        marginTop: HEADER_MAX_HEIGHT - (PROFILE_IMAGE_MAX_HEIGHT / 2),
        flexDirection: 'row', justifyContent: 'center'
    },
    imgHeader: {
        flex: 1, width: null, height: null
    },
    img: {
        borderRadius: PROFILE_IMAGE_MAX_HEIGHT / 2,
        width: PROFILE_IMAGE_MAX_HEIGHT,
        height: PROFILE_IMAGE_MAX_HEIGHT,
        borderWidth: 1,
        borderColor: 'white',
        marginLeft: 10, backgroundColor: 'black'
    },
    txt: {
        fontWeight: 'bold',
        fontSize: 15,
        alignSelf: 'flex-start',
        color: 'darkolivegreen',
        marginLeft: 10,
        borderBottomWidth: 0,
        borderBottomColor: 'slateblue',
        width: PROFILE_IMAGE_MAX_HEIGHT,
        textAlign: 'center'
    },
    viewAddFruit: {
        flex: 1,
        alignItems: 'flex-end',
        flexDirection: 'row'
    },
    pickerFruit: {
        height: PROFILE_IMAGE_MAX_HEIGHT / 2,
        width: 115, borderWidth: 1,
        borderColor: 'black'
    },
    viewAddIcon: {
        justifyContent: 'center',
        alignItems: 'center',
        height: PROFILE_IMAGE_MAX_HEIGHT / 2,
        flexDirection: 'row',
        marginRight: 20
    },
})

export default styles;