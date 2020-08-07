import React, { Component } from 'react';
import { MenuProvider } from 'react-native-popup-menu';
import { View, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, TextInput, Alert } from 'react-native';
import PropTypes from 'prop-types';
import {connect} from 'react-redux'
import colors from '../values/colors';
import Icon from 'react-native-vector-icons/AntDesign';
import IconMore from 'react-native-vector-icons/Feather';
import {
  widthPercentageToDP as wp, 
  heightPercentageToDP as hp
} from 'react-native-responsive-screen'
import Modal from './Modal'
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';

const PopupMenu = () => (
  <View>
    <Text>Hello world!</Text>
    <Menu>
      <MenuTrigger text='Select action' />
      <MenuOptions>
        <MenuOption onSelect={() => alert(`Save`)} text='Save' />
        <MenuOption onSelect={() => alert(`Delete`)} >
          <Text style={{color: 'red'}}>Delete</Text>
        </MenuOption>
        <MenuOption onSelect={() => alert(`Not called`)} disabled={true} text='Disabled' />
      </MenuOptions>
    </Menu>
  </View>
);

class TodoItem extends Component {
  constructor(props){
    super(props)
    this.state = {
        visibleDeleteConfirm: false,  
        visibleItemInfo: false,
        menuOpen: false,
        visibleItemEdit: false,
        _title: this.props.item.title, 
        _content: this.props.item.content,
    }
    this.onEdit = this.onEdit.bind(this);
  };
  CheckedDone(){
    this.props.dispatch({
      type: 'CHECK_DONE',
      id: this.props.item.id
    })
  }
  CheckedNotDone(){
    this.props.dispatch({
      type: 'CHECK_NOT_DONE',
      id: this.props.item.id
    })
  }
  DeleteTodo(){
    this.props.dispatch({
      type: 'DELETE_TODO',
      id: this.props.item.id
    })
  }
  _onPressMore(){
    this.setState({ menuOpen: true });
  };

  onBackdropPress(){
    this.setState({ menuOpen: false });
  };

  onEdit(){
      const {_title, _content} = this.state;
      if (_title === '') {
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
              // _title: '',
              // _content:'',
              visibleItemEdit: false,
          })
          this.props.dispatch({
              type: 'EDIT_TODO',
              title: _title,
              content: _content,
              id: this.props.item.id,
          });
          
      }
  }

  render(){
    const { title, content, checked} = this.props.item;

    return(
      <View 
          style={styles.itemMain}
          
      >
          {/* Modal confirm delete */}
          <Modal
            animation="fade"
            visible={this.state.visibleDeleteConfirm}
            mode="overFullScreen"
            //transparentContainer={true}
            bottomHalf={false}
            outsideClick={() => {
                this.setState({ visibleDeleteConfirm: false });
            }}

        >
            <View style={styles.modalConfirmContent}>
                <View style={styles.slideDownButton}></View>
                <View style={styles.modalConfirmContainer}> 
                    <View>
                        <Text style={styles.modalConfirmTitle}>{'Bạn có chắc muốn xóa công việc\n này không ?'} </Text>
                    </View>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity
                                style={styles.positiveButton}
                                onPress = {() => this.setState({visibleDeleteConfirm: false}), this.DeleteTodo.bind(this)  }>
                                <View>
                                    <Text 
                                        style={styles.positiveButtonText}>
                                            Có
                                    </Text>
                                </View>
                        </TouchableOpacity>
                        <TouchableOpacity  
                                style={styles.negativeButton}
                                onPress = {() => this.setState({ visibleDeleteConfirm: false })}>
                                <View>
                                    <Text 
                                        style={styles.negativeButtonText}>
                                            Hủy
                                    </Text>
                                </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
          </Modal>
          {/* Modal show todo info */}
          <Modal
              modalHeight= {300}
              animation="fade"
              visible={this.state.visibleItemInfo}
              mode="overFullScreen"
              //transparentContainer={true}
              bottomHalf={false}
              outsideClick={() => this.setState({ visibleItemInfo: false })}

          >
              <View style={styles.modalInfoContainer}>
                <View style={styles.modalInfoHeader}>
                  <TouchableOpacity 
                      style={styles.headerInfoRightIcon} 
                      onPress = {() => this.setState({ visibleItemInfo: false })}
                  >
                      <Icon name='close' size={24} color={colors.primary_blue}></Icon>
                  </TouchableOpacity>
                  <Text style={styles.modalInfoHeaderTitle}>{title}</Text>
                </View>
                {content !== '' ? 
                  <View style={styles.modalInfoContent}>
                      <Text style={styles.modalInfoContentText}>{content}</Text>
                  </View>
                : null }

              </View>
          </Modal>
          {/* Modal edit todo item*/}
          <Modal
              animation="fade"
              visible={this.state.visibleItemEdit}
              outsideClick={() => {
                  this.setState({visibleItemEdit: false})
              }}
          >
              <View style={styles.modalAddContent}>
                  <View style={styles.modalHeader}>
                      <TouchableOpacity 
                          style={styles.headerRightIcon} 
                          onPress={() =>  this.setState({visibleItemEdit: false})}
                      >
                          <Icon name='close' size={24} color={colors.primary_blue}></Icon>
                      </TouchableOpacity>
                      <Text style={styles.modalHeaderTitle}>Chỉnh sửa công việc</Text>
                  </View>
                  <View>
                      <TextInput
                          multiline={true}
                          style={styles.inputTitle}
                          placeholderTextColor={colors.light_black}
                          underlineColorAndroid="transparent"
                          //placeholder={'Nhập tên công việc '}
                          autoCorrect={false}
                          value={this.state._title}
                          autoCapitalize={'none'}
                          returnKeyType={'done'}
                          caretHidden={false}
                          onChangeText= {(value) => { console.log(this.state._title), this.setState({_title :value})}}
                      />
                      <TextInput
                          multiline={true}
                          style={styles.inputContent}
                          placeholderTextColor={colors.light_black}
                          underlineColorAndroid="transparent"
                          //placeholder={'Nhập nội dung công việc '}
                          autoCorrect={false}
                          value={this.state._content}
                          autoCapitalize={'none'}
                          returnKeyType={'done'}
                          caretHidden={false}
                          onChangeText= {(value) => { console.log(this.state._content), this.setState({_content :value})}}
                      />
                  </View>
                  <TouchableOpacity
                      style={styles.addButton}
                      onPress={this.onEdit}
                      >
                      <View>
                      <Text
                          style={styles.addButtonText}
                      >
                          Lưu
                      </Text>
                      </View>
                  </TouchableOpacity>
              </View>
          </Modal>
          <TouchableOpacity 
              style={styles.itemChecked}
              onPress={checked 
                ? this.CheckedNotDone.bind(this)
                : this.CheckedDone.bind(this)}
              >
              <Icon 
                  name={checked ? "checkcircle" : "checkcircleo"} 
                  size={24} 
                  color={colors.primary_blue}
              > 
              </Icon>
          </TouchableOpacity>
          <TouchableWithoutFeedback onPress={()=> this.setState({visibleItemInfo: true})}>
            <View 
                stlye={styles.itemContainer}
                
            >
                <Text style={this.props.isDeleting ? styles.itemTitleDelete : styles.itemTitle} numberOfLines={1}>{title}</Text>
                <Text style={this.props.isDeleting ? styles.itemContentDelete :  styles.itemContent} numberOfLines={2}>{content}</Text>
            </View>   
          </TouchableWithoutFeedback>
          <Menu 
              opened={this.state.menuOpen}
              onBackdropPress={() => this.onBackdropPress()}
              onSelect={value => this.onOptionSelect(value)}>
            <MenuTrigger style={styles.itemChecked} onPress={() =>  this.setState({ menuOpen: true })}>
                    <IconMore 
                        name="more-vertical" 
                        size={24} 
                        color={colors.primary_blue}
                    > 
                    </IconMore>
            </MenuTrigger>
            <MenuOptions optionsContainerStyle={styles.optionsstyle}>
              <MenuOption  
                  text= 'Xóa' 
                  onSelect={()=> this.setState({ ...this.state, menuOpen: false, visibleDeleteConfirm: true})}/>
              <MenuOption  
                  text= 'Chỉnh sửa'
                  onSelect={()=> this.setState({...this.state,  menuOpen: false, visibleItemEdit: true  })}/>
            </MenuOptions>
          </Menu>      
    </View>

    );
  }
}   

function mapStatetoProps(state){
  return {
      isDeleting: state.isDeleting,
  };
}

export default connect(mapStatetoProps)(TodoItem);

const styles = StyleSheet.create({
  itemMain:{
    width: wp('100%')-20,
    backgroundColor: colors.white,
    borderRadius: 50,
    borderStyle: 'dotted',
    borderWidth: 1,
    marginBottom: 10,
    alignSelf: 'center',
    flexDirection: 'row',
    padding: 5,
    
  },
  itemChecked:{
      width: 50,
      height: 50,
      alignSelf: 'center',
      padding: 12,
  },
  itemContainer:{
      flexDirection: 'column',
      //width: wp('65%'),
      //justifyContent: 'flex-start',
      paddingTop: 5,
      paddingBottom: 5,
      backgroundColor: colors.black,
  },
  itemTitle:{
      width: wp('100%')-125,
      fontFamily: 'Montserrat-SemiBold',
      fontSize: 16,
      
  },
  itemContent:{
      marginTop: 5,
      fontFamily: 'Montserrat-Medium',
      fontSize: 12,
      //width: wp('66%'),
      width: wp('100%')-125,
      color: colors.grey,
  },
  itemTitleDelete:{
    width: wp('100%')-125,
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 16,
    
},
itemContentDelete:{
    marginTop: 5,
    fontFamily: 'Montserrat-Medium',
    fontSize: 12,
    //width: wp('66%'),
    width: wp('100%')-125,
    color: colors.grey,
},
  modalConfirm:{
    width: wp('80%'),
    height: hp('30%'),
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: colors.white,
  },
  modalConfirmContent:{
      width: wp('70%'),
      height: hp('20%'),
      marginTop: -5,
      flexDirection: 'column',
  },
  modalConfirmContainer:{
      width: wp('70%'),
      height: hp('20%'),
      flexDirection: 'column',
      justifyContent:'space-around'
  },  
  modalConfirmTitle:{
      width: wp('70%'),
      justifyContent: 'center',
      alignSelf: 'center',
      fontSize: 14,
      //fontWeight: 'bold',
      // marginTop: 30,
      // marginBottom: 30,
      textAlign: 'center',
      fontFamily: 'Montserrat-SemiBold'
  },
  buttonContainer:{
      width: wp('70%'),
      flexDirection: 'row',
      alignSelf: 'center',
      //height: hp('15%'),
      justifyContent: 'space-around'
  },
  positiveButton:{
      borderWidth: 1,
      borderColor:colors.primary_blue,
      alignSelf:'center',
      justifyContent:'center',
      width: wp('25%'),
      height: hp('6%'),
      backgroundColor: colors.white,
      borderRadius:50,
      color: colors.white, 
      
  },
  negativeButton:{
      alignSelf:'center',
      justifyContent:'center',
      width:  wp('25%'),
      height: hp('6%'),
      backgroundColor: colors.primary_blue,
      borderRadius:50,
      color: colors.white,  
  },
  positiveButtonText: {
      color: colors.primary_blue,
      fontWeight: "normal",
      fontSize: 14,
      alignSelf: "center",
      fontFamily: "Montserrat-Medium",
      paddingBottom: 15,
      paddingTop: 15,   
  },
  negativeButtonText: {
      color: colors.white,
      fontWeight: "normal",
      fontSize: 14,
      alignSelf: "center",
      fontFamily:"Montserrat-Medium",
      paddingBottom:15,
      paddingTop: 15,  
  },
  modalInfoContainer:{
    width: wp('80%'),
    flexDirection: 'column',
    backgroundColor: colors.white,
  },
  modalInfoContent:{
    backgroundColor: colors.white,
    borderWidth: 1, 
    borderRadius: 20, 
    borderColor: colors.black,
    width: wp('80%') - 20,
    //height: 190,
    alignSelf: 'center',
    padding: 20,
    //marginBottom: 30
  },
  modalInfoContentText:{
    fontSize: 14, 
    fontFamily:"Montserrat-Medium",
    color: colors.black,
  },
  modaInfoHeader:{
    //backgroundColor: colors.white,
    width: wp('80%'),
    //height: 70,
    flexDirection: 'column',
    alignSelf: 'center',
    backgroundColor: colors.white,
  },
  modalInfoHeaderTitle:{
      color: colors.white,
      fontSize: 18,
      fontFamily: 'Montserrat-SemiBold',
      alignSelf: "center",
      width: wp('60%'),
      textAlign: 'center',
      paddingBottom: 10,
      color: colors.primary_blue,
      marginBottom: 20,
  },
  headerInfoRightIcon:{
      alignSelf: 'flex-end',
      padding: 5,
      marginBottom: -20,
  },
  optionsstyle:{
    borderRadius: 10,
    padding: 5,
    marginTop: 50,
    width: 150,
  },
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