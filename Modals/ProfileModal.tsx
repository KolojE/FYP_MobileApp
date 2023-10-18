import { AntDesign, Entypo, MaterialCommunityIcons, Octicons } from "@expo/vector-icons";
import { UserInfo } from "../types/General"
import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TextInput, Touchable, TouchableOpacity, ToastAndroid } from 'react-native';
import { useUserInfoAction } from "../actions/userAction";
import * as ImagePicker from "expo-image-picker";
import IconText from "../Components/IconText";
import IconTextInput from "../Components/IconTextInput";

type ProfileModalProps = {
  userInfo: UserInfo;
  closeModal: () => void;
};

export default function ProfileModal({ userInfo, closeModal }: ProfileModalProps) {
  const { user, organization, totalReportCount, totalResolvedCount } = userInfo;

  const [editedPhoneNo, setEditedPhoneNo] = useState(user.contact?.phoneNo);
  const [editedAddress, setEditedAddress] = useState(user.contact?.address);
  const [edited,setEdited] = useState(false);

  const [editedPassword, setEditedPassword] = useState("password");
  const [editedConfirmPassword, setEditedConfirmPassword] = useState("");

  const [focusedPassword, setFocusedPassword] = useState(false);

  const userAction = useUserInfoAction();

  const handlePhoneNoChange = (text: string) => {
    setEdited(true);
    setEditedPhoneNo(text);
  };

  const handleAddressChange = (text: string) => {
    setEdited(true);
    setEditedAddress(text);
  };

  const onPasswordChange = (text: string) => {
    setEdited(true);
    setEditedPassword(text);
  }

  const onConfirmPasswordChange = (text: string) => {
    setEditedConfirmPassword(text);
  }

  const onProfileImagePressed = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      base64: true,
      aspect: [4, 3],
      quality: 1,
    });

    const {uri,base64} = result.assets[0];
    userAction.uploadProfilePictureAction({uri,base64});
  }

  const onPasswordFocus = () => {
    setFocusedPassword(true);
    setEditedPassword("");
  }

  const onSavePressed = () => {
    if (matchPassword()) {
      userAction.updateUserInfoAction({address:editedAddress,contact:{address:editedAddress,phoneNo:editedPhoneNo},password:editedPassword});
      setEdited(false);
      setFocusedPassword(false);
      toastMessage("Profile Updated");
    }
    else {
      toastMessage("Password doesn't match");
    }
  }

  const matchPassword = () => {
    if (editedPassword === editedConfirmPassword) {
      return true;
    }
    else {
      return false;
    }
  }
  const toastMessage = (message: string) => {
    ToastAndroid.showWithGravityAndOffset(
      message,
      ToastAndroid.SHORT,
      ToastAndroid.BOTTOM,
      0,
      50
    );
  }


  return (
    <View style={styles.container}>
      <View style={{ marginBottom: "5%",marginTop:"10%" }}>
        <AntDesign name="down" size={24} color="black" onPress={closeModal} />
      </View>
      <Text style={styles.header}>Profile</Text>
          <IconText icon={<Octicons name="organization" size={20} color={"black"} />} text={organization.name} style={{fontSize:20}} />
      <View style={styles.content}>
        <TouchableOpacity onPress={onProfileImagePressed}>
          {user.base64ProfilePicture ?
            <Image source={{ uri: `data:image/jpg;base64,${user.base64ProfilePicture}` }} style={{ ...styles.profilePicture, height: 100, width: 100 }} />
            :
            <MaterialCommunityIcons name="face-man" size={100} color="black" style={styles.profilePicture} />
          }
        </TouchableOpacity>
        <Text style={styles.name}>{user.name}</Text>
        <View style={{flexDirection:"row"}}>
          <Text style={styles.reportCount}>Total Report: {totalReportCount}</Text>
          <Text style={styles.reportCount}>Total Resolved: {totalResolvedCount}</Text>
        </View>
        <IconTextInput textInputStyle={styles.IconTextInputText} viewContainerStyle={styles.iconTextInputViewContainer} icon={<Entypo name="user" size={12} color={"black"} />} value={user.ID} editable={false} placeholder={""}  />
        <IconTextInput textInputStyle={styles.IconTextInputText} viewContainerStyle={styles.iconTextInputViewContainer} icon={<MaterialCommunityIcons name="advertisements" size={12} color={"black"} />} value={user.roleID} editable={false} placeholder={""}  />
        <IconTextInput textInputStyle={styles.IconTextInputText} viewContainerStyle={styles.iconTextInputViewContainer} icon={<Entypo name="email" size={12} color={"black"} />} value={user.email} editable={false} placeholder={""} />
        <IconTextInput textInputStyle={styles.IconTextInputText} viewContainerStyle={styles.iconTextInputViewContainer}icon={<Entypo name="phone" size={12} color={"black"} />} value={editedPhoneNo} editable={true} placeholder={"Phone No."} onTextChange={handlePhoneNoChange} />
        <IconTextInput textInputStyle={styles.IconTextInputText} viewContainerStyle={styles.iconTextInputViewContainer} icon={<Entypo name="location" size={12} color={"black"} />} value={user.contact?.address??"N/A"} editable={true} placeholder={""} />
        <IconTextInput textInputStyle={styles.IconTextInputText} viewContainerStyle={styles.iconTextInputViewContainer} icon={<MaterialCommunityIcons name="form-textbox-password" size={12} color={"black"} />} value={editedPassword}  editable={true} placeholder={"Password"}  onTextChange={onPasswordChange} onFocus={onPasswordFocus} secret /> 
        {
          focusedPassword &&
          <IconTextInput textInputStyle={styles.IconTextInputText} viewContainerStyle={styles.iconTextInputViewContainer} icon={<MaterialCommunityIcons name="form-textbox-password" size={12} color={"black"} />} value={editedConfirmPassword}  editable={true} placeholder={"Confirm Password"} onTextChange={onConfirmPasswordChange} secret /> 
        }
        {
          edited && 
        <TouchableOpacity style={styles.button} onPress={onSavePressed}>
          <Text style={styles.buttonText}>Save</Text>
          </TouchableOpacity>
        }
      </View>
    
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  content: {
    alignItems: 'center',
    backgroundColor: '#FFF',
    flex: 1,
    padding: "20%",
    borderRadius: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
  },
  profilePicture: {
    borderRadius: 75,
    marginBottom: 20,
    alignItems: "center",
  },
  name: {
    fontSize: 20,
    marginBottom: 10,
    fontWeight: 'bold',
    color: '#333',
  },
  info: {
    marginBottom: 5,
    color: '#555',
  },
  label: {
    fontWeight: 'bold',
    color: '#333',
  },
  input: {
    width: '100%',
    height: 40,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  reportCount: {
    fontSize: 12,
    marginBottom: 10,
    fontWeight: 'bold',
    color: '#333',
    marginLeft:10,

  },
  iconTextInputViewContainer:{
    width:"100%",
    height:"auto",
    flexDirection:"row",
    alignItems:"center",
    marginBottom:10,
  },
  IconTextInputText:{
    fontSize:12,
    marginLeft:10,
    color:"#333",
  },
  button: {
    width: '100%',
    height: 40,
    backgroundColor: '#0066CC',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16,
  }
});



