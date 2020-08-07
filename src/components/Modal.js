import React, { Component } from "react";
import {
  Modal,
  StyleSheet,
  TouchableWithoutFeedback,
  View
} from "react-native";
import colors from "../values/colors";

class  CustomModal extends Component {
  render(){
  return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={this.props.visible}
        >
            <TouchableWithoutFeedback
                        onPress={() => this.props.outsideClick()}
                    >
                        <View style={styles.background}/> 
                </TouchableWithoutFeedback>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        {this.props.children}
                    </View>
                </View>
        </Modal>
  );
    }
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  background:{
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.8)'    
    },
  modalView: {
    margin: 20,
    backgroundColor: colors.white,
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
});

export default CustomModal;
