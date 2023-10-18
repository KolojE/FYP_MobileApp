import React, { useEffect } from "react";
import { View, StyleSheet, FlatList, Modal, Text, TouchableOpacity } from "react-native";
import {
    AntDesign, Entypo
} from "@expo/vector-icons";
import IForm from "../types/Models/Form";
import { getForms } from "../api/user";
import Form from "../Components/Form";
import SearchBar from "../Components/SearchBar";
import { deleteForm } from "../api/admin";


type FormListModalProps = {
    navigation: any;
    closeModal: () => void;

}

export default function FormListModal({ navigation, closeModal }: FormListModalProps) {


    const [forms, setForms] = React.useState<IForm[]>([]);
    const [filteredForms, setFilteredForms] = React.useState<IForm[]>([]);
    const [confirmModalVisible, setConfirmModalVisible] = React.useState<boolean>(false);   
    const [formToDelete,setFormToDelete] = React.useState<string>("");
    useEffect(() => {
        getForms().then((res) => {
            setForms(res);
        });
    }, [])


    const renderItem = (res: IForm, index: number) => {
        return <Form
            key={index}
            form={res}
            navigation={navigation}
            closeModal={() => {
                closeModal()
            }}
            onDeletePress={
                onDeletePress
            }
        />
    }


    const onDeletePress = (formID:string) => {
        setConfirmModalVisible(true);
        setFormToDelete (formID);
        
    }

    const handlerConfirmDelete =async(confirmed:boolean)=>{
        if (confirmed) {
            await deleteForm(formToDelete);
            setConfirmModalVisible(false);
            setForms(await getForms())
        }
        setConfirmModalVisible(false);
        return;23
    }

    const onSearchTextChanged = (text: string) => {
        if (text === "") {
            setFilteredForms([]);
            return;
        }
        setFilteredForms(forms.filter((form) => form.name.toLowerCase().includes(text.toLowerCase())));
    }

    return (
        <View style={styles.container}>
            <View style={styles.rowContainer}>
                <AntDesign onPress={() => { closeModal() }} name="down" size={24} style={styles.iconStyle} />
                <AntDesign onPress={() => { closeModal(); navigation.navigate("formBuilder"); }} name="plus" size={24} style={[styles.iconStyle, styles.iconMarginLeft]} />
            </View>
            <SearchBar
                onSearchTextChanged={onSearchTextChanged}
            />
            <FlatList
                style={styles.scrollViewContainer}
                contentContainerStyle={{ alignItems: "center" }}
                data={filteredForms.length > 0 ? filteredForms : forms}
                renderItem={({ item, index }) => renderItem(item, index)}
            />

            <Modal
                animationType="fade"
                visible={confirmModalVisible}
                onRequestClose={() => {
                    setConfirmModalVisible(!confirmModalVisible);
                }}
            >
                <View
                    style={{
                        flex: 1,
                        backgroundColor: "rgba(0,0,0,0.5)",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <View style={{ backgroundColor: "white", padding: 20, borderRadius: 10,width:"80%" }}>
                        <Text style={{ fontSize: 18, marginBottom: 10, textAlign: "center" }}>
                            Are you sure you want to delete this form?
                        </Text>
                        <Text style={{ marginBottom: 10, textAlign: "center" }}>
                            This action cannot be undone.
                        </Text>
                        <Text style={{ marginBottom: 10, textAlign: "center" }}>
                            The submitted reports under the form will still be preserved, but the form will no longer be accessible.
                        </Text>
                        <View style={{ flexDirection: "row", justifyContent: "center" }}>
                            <TouchableOpacity
                                onPress={() => {
                                    setConfirmModalVisible(false);
                                    handlerConfirmDelete(true);
                                }}
                                style={{ marginRight: 20 }}>
                                <AntDesign name="check" size={24} />
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => {
                                    setConfirmModalVisible(false);
                                    handlerConfirmDelete(false);
                                }}
                            >
                                <AntDesign name="close" size={24} />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>

        </View>

    )


}
const styles = StyleSheet.create({
    container: {
        width: "100%",
        alignItems: "center"
    }
    ,
    searchContainer: {
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        width: '90%',
    },
    rowContainer: {
        width: '90%',
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: "3%",
        justifyContent: "center",

    },
    iconStyle: {
        marginRight: '3%',
    },
    iconMarginLeft: {
        marginLeft: 'auto',
    },
    searchBox: {
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 10,
    },
    scrollViewContainer: {
        width: '100%',
    },
    scrollViewContentContainer: {
        width: '100%',
        alignItems: 'center',
    },
});
