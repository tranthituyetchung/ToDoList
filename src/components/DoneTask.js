import React, { useState, Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    FlatList,
    _View,
} from 'react-native';
import {
    widthPercentageToDP as wp, 
    heightPercentageToDP as hp
} from 'react-native-responsive-screen'
import colors from '../values/colors';
import Icon from 'react-native-vector-icons/AntDesign';
import { FloatingAction } from "react-native-floating-action";
import Header from './Header'
import {connect} from 'react-redux'
import TodoItem from './TodoItem'

class DoneTask extends Component{
   
    getTodoList(){
        const {filterStatus, todos} = this.props;
        return todos.filter(e => e.checked);
    }

    render(){
        return (               
            <View style={styles.container}>
                <Header title={'Công việc đã hoàn thành '}></Header> 
                <View style={styles.listView}>  
                    <FlatList
                        data={this.getTodoList()}
                        renderItem={({item}) => <TodoItem item={item}/>}
                        keyExtractor={item => item.id}
                    />             
                </View>
            </View>
        );
    }
}

function mapStatetoProps(state){
    return {
        filterStatus: state.filterStatus,
        todos: state.todos,
    };
}

export default connect(mapStatetoProps)(DoneTask);

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.white,
        flex: 1,
    },
    // container:{
    //     //marginBottom: 30,
    //     height: hp('27%') ,
    //     flexDirection: 'column',
    //     justifyContent: 'space-around'
    // },
    main: {
        flex: 1, 
        //justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        width: wp('100'),
        backgroundColor: colors.primary_blue, 
    },
    listView:{
         width: wp('100%'),
         height: hp('85%') - 64,
        //flex: 1,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        marginTop: -20,
        paddingTop: 10,
        backgroundColor: colors.white,
    },
    item:{
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
        //width: wp('70'),
        justifyContent: 'flex-start',
        paddingTop: 5,
        paddingBottom: 5,
    },
    itemTitle:{
        fontFamily: 'Montserrat-SemiBold',
        fontSize: 16,
    },
    itemContent:{
        marginTop: 5,
        fontFamily: 'Montserrat-Medium',
        fontSize: 12,
        width: wp('70'),
        color: colors.grey,
    },
});