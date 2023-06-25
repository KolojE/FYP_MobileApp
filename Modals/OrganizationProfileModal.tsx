import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  Switch,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ToastAndroid,
} from 'react-native';


import { useUserInfoAction } from '../actions/userAction';
import IOrganization from '../types/Models/Organization';
import { IStatus } from '../types/Models/Status';
import IconTextInput from '../Components/IconTextInput';
import {
  Entypo,
  Octicons,
} from '@expo/vector-icons';

type OrganizationProfileScreenProps = {
  organization: IOrganization;
  organizationStatues: IStatus[];
  closeModal: () => void;
};

export default function OrganizationProfileScreen({
  organization,
  organizationStatues,
  closeModal,
}: OrganizationProfileScreenProps) {
  const userAction = useUserInfoAction();

  const [organizationInfo, setOrganizationInfo] = useState<IOrganization>(organization);
  const [statuses, setStatuses] = useState<IStatus[]>(organizationStatues);
  const [statusesToDelete, setStatusesToBeDeleted] = useState<IStatus[]>([]);

  const [newStatusIdCounter, setNewStatusIdCounter] = useState<number>(0);
  const [autoActiveNewUser, setAutoActiveNewUser] = useState<boolean>(organization.system.autoActiveNewUser);
  const [edited, setEdited] = useState<boolean>(false);
  const [defaultStatus, setDefaultStatus] = useState<string>(organization.system.defaultStatus);
  const [customStatus, setCustomStatus] = useState<string>("")


  useEffect(() => {
    setStatuses(organizationStatues)
    setOrganizationInfo(organization)
  }, [organization, organizationStatues])

  const onCustomStatusChange = (text: string) => {
    setCustomStatus(text)
    setEdited(true)
  };


  const onOrganizationInfoChange = (text: string, field: string) => {
    console.log(organizationInfo)
    setOrganizationInfo((prev) => {
      return {
        ...prev,
        [field]: text,
      };
    });
    setEdited(true)
  }

  const onStatusDeletePressed = (status: IStatus) => {
    if (status._id === defaultStatus) {
      ToastAndroid.showWithGravity("Cannot delete default status !", 1, 1)
      return
    }

    if (organizationStatues.includes(status)) {
      setStatusesToBeDeleted((prev) => [...prev, status]);
    }
    setStatuses((prev) => prev.filter((s) => s._id !== status._id));
    setEdited(true)
  };
  const onDefaultStatusChange = (status: IStatus) => {
    setDefaultStatus(status._id);
    setEdited(true)
  };
  const addNewStatus = () => {
    if (customStatus.length <= 0) {
      ToastAndroid.showWithGravity("Status description cannot be empty !", 1, 1)
      return
    }
    setStatuses((prev) => [...prev, { _id: newStatusIdCounter.toString(), color: null, desc: customStatus }])
    setNewStatusIdCounter(prev => prev + 1)
    setCustomStatus("")
    setEdited(true)
  }

  const onStatusNameChange = (status: IStatus, text: string) => {
    setStatuses((prev) => {
      return prev.map(
        (prevStatus) => {
          if (prevStatus._id === status._id) {
            return {
              ...prevStatus,
              desc: text,
            }
          }
          else {
            return prevStatus
          }
        }
      )
    })
  }

  const onSavePressed = async () => {

    const newOrganization: IOrganization = {
      ...organizationInfo,
      system: {
        autoActiveNewUser,
        defaultStatus,
      },
    }

    const newStatues = statuses.map((status) => {
      return {
        ...status,
      };
    })

    await userAction.updateOrganizaitonInfo({
      organization: newOrganization, statuses: newStatues, statusesToDelete: statusesToDelete
    })
    closeModal();
  };

  const renderStatusesItem = ({ item }: { item: IStatus }) => {
    return (
      <View style={styles.statusItemContainer}>
        <TextInput style={styles.statusItemText} value={item.desc} onChangeText={(text) => {
          onStatusNameChange(item, text)
        }} />
        {item._id === defaultStatus ? (
          <Text style={styles.defaultStatusText}>Default</Text>
        ) : (
          <View style={styles.statusActionsContainer}>
            <Entypo
              name='check'
              size={16}
              style={styles.statusActionIcon}
              onPress={() => onDefaultStatusChange(item)}
            />
            <Entypo
              name='trash'
              size={16}
              style={styles.statusActionIcon}
              onPress={() => onStatusDeletePressed(item)}
            />
          </View>
        )}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Profile</Text>
      <View style={styles.profileContainer}>
        <IconTextInput
          placeholder='Organization ID'
          value={organization.ID}
          icon={<Octicons name='id-badge' size={24} style={styles.icon} />}
          editable={false}
        />
        <IconTextInput
          placeholder='Organization Name'
          value={organizationInfo.name}
          icon={<Octicons name='organization' size={24} style={styles.icon} />}
          editable={true}
          onTextChange={(text) => onOrganizationInfoChange(text, 'name')}
        />
        <IconTextInput
          placeholder='Organization Address'
          value={organizationInfo.address ?? 'N/A'}
          icon={<Entypo name='location' size={24} style={styles.icon} />}
          onTextChange={(text) => onOrganizationInfoChange(text, 'address')}
          editable={true}
        />
        <IconTextInput
          placeholder='Contact'
          value={organizationInfo.contactNo}
          icon={<Entypo name='phone' size={24} style={styles.icon} />}
          onTextChange={(text) => onOrganizationInfoChange(text, 'contactNo')}
          editable={true}
        />
      </View>
      <Text style={styles.sectionTitle}>System Settings</Text>
      <View style={styles.switchContainer}>
        <Text style={styles.switchLabel}>Auto Activate New User</Text>
        <Switch
          value={autoActiveNewUser}
          onValueChange={(value) => setAutoActiveNewUser(value)}
        />
      </View>
      <View style={styles.statusSectionContainer}>
        <Text style={styles.sectionTitle}>Statuses</Text>
      </View>
      <View style={styles.statusListContainer}>
        <FlatList
          data={statuses}
          renderItem={renderStatusesItem}
          keyExtractor={(item) => item._id}
        />

        <View style={styles.addStatusInputContainer} >
          <TextInput
            placeholder='Status descrpition'
            style={{
              flex: 1,
              borderWidth: 1,
              borderColor: 'gray',
              padding: 8,
              borderRadius: 8,
            }}
            value={customStatus}
            onChangeText={onCustomStatusChange}
          />
          <Entypo name="plus" size={24} style={{ marginLeft: "auto", padding: 8 }} onPress={addNewStatus} />
        </View>
      </View>
      <TouchableOpacity style={styles.saveButton} onPress={onSavePressed}>
        <Text style={styles.saveButtonText}>Save Settings</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  profileContainer: {
    marginBottom: 24,
  },
  icon: {
    padding: 10,
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  switchLabel: {
    flex: 1,
    fontSize: 16,
  },
  statusSectionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    paddingVertical: 12,
  },
  addButtonContainer: {
    marginLeft: 'auto',
  },
  statusListContainer: {
    borderWidth: 1,
    borderColor: 'black',
    height: '30%',
    marginBottom: 24,
  },
  statusItemContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  statusItemText: {
    flex: 1,
    fontSize: 14,
    fontWeight: '400',
  },
  defaultStatusText: {
    color: 'green',
  },
  statusActionsContainer: {
    flexDirection: 'row',
  },
  statusActionIcon: {
    marginHorizontal: 2,
  },
  saveButton: {
    backgroundColor: 'blue',
    paddingVertical: 12,
    borderRadius: 20,
    alignSelf: 'center',
    marginBottom: 12,
  },
  saveButtonText: {
    color: 'white',
    paddingHorizontal: 8,
    fontWeight: 'bold',
    fontSize: 16,
  },
  addStatusInputContainer: {
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height:100
    },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 5,
    padding: 8,
  }
});
