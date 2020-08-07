import React, { useState, Component } from 'react';
import {
    StyleSheet,
    View,
    FlatList,
    Alert,
    Fab
} from 'react-native';
import {
    widthPercentageToDP as wp, 
    heightPercentageToDP as hp
} from 'react-native-responsive-screen'
import colors from '../values/colors';
import { FloatingAction } from "react-native-floating-action";
import Header from './Header'
import {connect} from 'react-redux'
import TodoItem from './TodoItem'
import AddTodo from './AddTodo';


const actions = [
    {
      text: "Add",
      icon: require("../assets/images/ic_plus.png"),
      name: "bt_add",
      position: 1
    },
    // {
    //   text: "Delete",
    //   icon: require("../assets/images/ic_delete.png"),
    //   name: "bt_delete",
    //   position: 2
    // },
  ];

class AllTask extends Component{
    constructor(props){
        super(props)
        this.state = {
            visible: false,
            title: '',
            content: '',
        }
        this.onAdd = this.onAdd.bind(this);
    };
    
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

    toggleIsAdding(){
        this.props.dispatch({
            type: 'TOGGLE_IS_ADDING'
        })
    }

    toggleIsDeleting(){
        this.props.dispatch({
            type: 'TOGGLE_IS_DELETING'
        })
    }
    
    getTodoList(){
        const {filterStatus, todos} = this.props;
        return todos;
    }

    render(){
        
        return (               
            <View style={styles.container}>
                <Header title={'Tất cả công việc'}></Header> 
                <View style={styles.listView}>
                        <FlatList
                            data={this.getTodoList()}
                            renderItem={({item}) => <TodoItem item={item}/>}
                            keyExtractor={item => item.id}
                            />              
                </View>
                     <FloatingAction
                        actions={actions}
                        // onPressItem={name => {
                        //     if (name==='bt_add'){
                        //         //this.toggleIsAdding.bind(this);
                        //         this.props.dispatch({
                        //             type: 'TOGGLE_IS_ADDING',
                        //         })
                        //     }
                        //     if (name ==='bt_delete'){
                        //         this.props.dispatch({
                        //             type: 'TOGGLE_IS_DELETING',
                        //         })
                        //     }
                        // }}
                        overrideWithAction
                        showBackground={false}
                        onPressItem={
                           name =>  { this.props.dispatch({type: 'TOGGLE_IS_ADDING'})}
                        }
                    />
                    <AddTodo/>
            </View>
        );
    }
}

function mapStatetoProps(state){
    return {
        filterStatus: state.filterStatus,
        todos: state.todos,
        isAdding: state.isAdding,
        isDeleting: state.isDeleting
    };
}

export default connect(mapStatetoProps)(AllTask);

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.primary_blue,
        flex: 1,
        flexDirection: 'column'
    },
    addButton: {
        //borderWidth:1,
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
    listView:{
         width: wp('100%'),
        //height: hp('85%') ,
        flex: 1,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        marginTop: -20,
        paddingTop: 10,
        backgroundColor: colors.white,
    },
    
    modalAddContent:{
        width: wp('80%'),
        //height: 300,
        flexDirection: 'column',
        backgroundColor: colors.white,
    },
    modalHeader:{
        //backgroundColor: colors.white,
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
    },
    headerRightIcon:{
        alignSelf: 'flex-end',
        padding: 5,
        marginBottom: -20,
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