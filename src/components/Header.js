import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { 
    View,
    Text,
    StyleSheet,
    ImageBackground,
 } from "react-native"
import {
    widthPercentageToDP as wp, 
    heightPercentageToDP as hp
} from 'react-native-responsive-screen';
import colors from '../values/colors';

class Header extends Component {  
    render(){
        const { title } = this.props;
        return (
            <View style={styles.mainContainer}>
                <ImageBackground source={require('assets/images/bg_header.png')} style={styles.header}>
                        <Text style={styles.title}>{title}</Text>
                </ImageBackground>
            </View>
        )       
    }
    
}
Header.propTypes = {
    title: PropTypes.string.isRequired,
};

Header.defaultProps = {
  title: 'Header'
};

const styles = StyleSheet.create({
    header: {
        height: hp('15%'),
        justifyContent: 'center',
        alignItems: 'center'   
    },
    title: {
        marginTop: -10,
        color: colors.white,
        fontSize: 22,
        fontFamily: 'Montserrat-SemiBold',
    },

})
export default Header