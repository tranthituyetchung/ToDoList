import React, { Component, useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    TextInput,
    Alert
} from 'react-native';
import {
  widthPercentageToDP as wp, 
  heightPercentageToDP as hp
} from 'react-native-responsive-screen'
import colors from '../values/colors';
import Icon from 'react-native-vector-icons/AntDesign';
import {connect} from 'react-redux'
import Modal from './Modal'

class EditTodo extends Component {
    constructor(props) {
      super(props);
      this.state = {
        title: '',
        content: '',
    }
    this.onAdd = this.onAdd.bind(this);
    }  

    onAdd(){
      const {title, content} = this.state;
      if (title === '') {
          Alert.alert(
              "Vui lòng nhập tên công việc",
              "",
              [
              // {
              //     text: "Cancel",
              //     onPress: () => console.log("Cancel Pressed"),
              //     style: "cancel"
              // },
              { text: "OK", onPress: () => console.log("OK Pressed") }
              ],
              { cancelable: false }
          )
      } 
      else {
          this.setState({
              title: '',
              content:'',
          })
          this.props.dispatch({
              type: 'ADD_TODO',
              title: title,
              content: content,
          });
          this.props.dispatch({
              type: 'TOGGLE_IS_ADDING'
          })
          
      }
  }

    render() {
      return (
        <Modal
            animation="fade"
            visible={this.props.isAdding}
            outsideClick={() => {
                this.props.dispatch({type: 'TOGGLE_IS_ADDING'})
            }}
        >
            <View style={styles.modalAddContent}>
                <View style={styles.modalHeader}>
                    <TouchableOpacity 
                        style={styles.headerRightIcon} 
                        onPress={() => this.props.dispatch({type: 'TOGGLE_IS_ADDING'})}
                    >
                        <Icon name='close' size={24} color={colors.primary_blue}></Icon>
                    </TouchableOpacity>
                    <Text style={styles.modalHeaderTitle}>Thêm công việc mới</Text>
                </View>
                <View>
                    <TextInput
                        multiline={true}
                        style={styles.inputTitle}
                        placeholderTextColor={colors.light_black}
                        underlineColorAndroid="transparent"
                        placeholder={'Nhập tên công việc '}
                        autoCorrect={false}
                        autoCapitalize={'none'}
                        returnKeyType={'done'}
                        caretHidden={false}
                        onChangeText= {(value) => this.setState({title :value})}
                    />
                    <TextInput
                        multiline={true}
                        style={styles.inputContent}
                        placeholderTextColor={colors.light_black}
                        underlineColorAndroid="transparent"
                        placeholder={'Nhập nội dung công việc '}
                        autoCorrect={false}
                        autoCapitalize={'none'}
                        returnKeyType={'done'}
                        caretHidden={false}
                        onChangeText= {(value) => this.setState({content :value})}
                    />
                </View>
                <TouchableOpacity
                    style={styles.addButton}
                    onPress={this.onAdd}
                    >
                    <View>
                    <Text
                        style={styles.addButtonText}
                    >
                        Thêm
                    </Text>
                    </View>
                </TouchableOpacity>
            </View>
        </Modal>
      );
    }
  }


  function mapStatetoProps(state){
    return {
        isEditing: state.isEditing,
    };
}

export default connect(mapStatetoProps)(EditTodo);

const styles = StyleSheet.create({
    
    addButton: {
        borderColor:'rgba(0,0,0,0.2)',
        alignSelf:'center',
        justifyContent:'center',
        width: wp('80%'),
        height: 50,
        backgroundColor: colors.primary_blue,
        borderRadius:50,
        color: colors.white, 
        marginTop: 30,
        marginBottom: 30,       
    },
    addButtonText: {
        color: colors.white,
        fontWeight: "normal",
        fontSize: 14,
        alignSelf: "center",
        fontFamily:"Montserrat-Medium",
    },
    modalAddContent:{
        width: wp('80%'),
        flexDirection: 'column',
        backgroundColor: colors.white,
    },
    modalHeader:{
        width: wp('80%'),
        height: 70,
        flexDirection: 'column',
        alignSelf: 'center'
    },
    modalHeaderTitle:{
        color: colors.white,
        fontSize: 18,
        fontFamily: 'Montserrat-SemiBold',
        alignSelf: "center",
        width: wp('80%'),
        textAlign: 'center',
        paddingBottom: 10,
        color: colors.primary_blue,
        marginBottom: 20,
        marginTop: -35,
    },
    headerRightIcon:{
        width: 50,
        height: 50,
        alignSelf: 'flex-end',
        //padding: 5,
        marginRight: -20,
    },
    textInput: {
        top: 15, 
        fontSize: 20, 
        fontWeight: "500",
        fontFamily:"Montserrat-Medium",
    },
    inputTitle: {
        alignSelf: 'center',
        borderWidth: 1,
        borderColor: colors.black,
        width: wp('100%') - 60,
        height: 65,
        marginHorizontal: 20,
        paddingLeft: 20,
        paddingRight: 20,
        borderRadius: 20,
        color: colors.secondary_grey,
        fontFamily:"Montserrat-SemiBold",
    },
    inputContent: {
        textAlignVertical: "top",
        alignSelf: 'center',
        borderWidth: 1,
        borderColor: colors.black,
        width: wp('100%') - 60,
        height: 150,
        marginHorizontal: 20,
        paddingRight: 20,
        borderRadius: 20,
        paddingLeft: 20,
        marginTop: 20,
        marginBottom: 20,
        color: colors.secondary_grey,
        fontFamily:"Montserrat-Medium",
    },

});