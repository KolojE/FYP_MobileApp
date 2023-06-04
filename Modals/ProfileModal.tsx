import { AntDesign, Entypo } from "@expo/vector-icons";
import { UserInfo } from "../types/General"
import React, { useState } from 'react';
import { View, Text ,Image, StyleSheet, TextInput } from 'react-native';

type ProfileModalProps = {
  userInfo: UserInfo;
  closeModal: () => void;
};

export default function ProfileModal({ userInfo,closeModal}: ProfileModalProps){
  const { user, organization, totalReportCount, totalResolvedCount } = userInfo;

  const [editedPhoneNo, setEditedPhoneNo] = useState(user.contact?.phoneNo);
  const [editedAddress, setEditedAddress] = useState(user.contact?.address);

  const handlePhoneNoChange = (text: string) => {
    setEditedPhoneNo(text);
  };

  const handleAddressChange = (text: string) => {
    setEditedAddress(text);
  };


  return (
    <View style={styles.container}>
        <View style={{marginBottom:"5%"}}>
            <AntDesign name="down" size={24} color="black" onPress={closeModal} />
        </View>
      <Text style={styles.header}>Profile</Text>
      <View style={styles.content}>
        {user.base64ProfilePicture && (
          <Image source={{ uri: `data:image/jpg;base64,${user.base64ProfilePicture}` }} style={styles.profilePicture} />
        )}
        <Text style={styles.name}>{user.name}</Text>
        <Text style={styles.info}>
          <Text style={styles.label}>ID:</Text> {user.ID}
        </Text>
        <Text style={styles.info}>
          <Text style={styles.label}>Email:</Text> {user.email}
        </Text>
        <TextInput
          style={styles.input}
          value={editedPhoneNo}
          onChangeText={handlePhoneNoChange}
          placeholder="Phone No"
        />
        <TextInput
          style={styles.input}
          value={editedAddress}
          onChangeText={handleAddressChange}
          placeholder="Address"
        />
        <Text style={styles.info}>
          <Text style={styles.label}>Organization:</Text> {organization.name}
        </Text>
        <Text style={styles.info}>
          <Text style={styles.label}>Total Reports:</Text> {totalReportCount}
        </Text>
        <Text style={styles.info}>
          <Text style={styles.label}>Total Resolved Reports:</Text> {totalResolvedCount}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      margin:20,
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
      padding: "20%",
      borderRadius: 10,
      elevation: 3,
      shadowColor: '#000',
      shadowOpacity: 0.2,
      shadowOffset: { width: 0, height: 2 },
    },
    profilePicture: {
      width: 150,
      height: 150,
      borderRadius: 75,
      marginBottom: 20,
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
  });
  

  
