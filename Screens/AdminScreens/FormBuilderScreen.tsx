import { AntDesign } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { TextInput, View, StyleSheet, Text, Modal, BackHandler, TouchableOpacity, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { FieldSelectionModal } from "../../Modals/FieldSelectionModal";
import { FieldRenderer } from "../../utils/formHandler";
import { IField, inputType } from "../../types/Models/Form";
import { addNewForm, updateForm } from "../../api/admin";
import { getForm } from "../../api/user";


export function FormBuilderScreen({ route, navigation }) {

    const params = route.params;

    const [addFieldModal, setAddFieldModal] = useState(false);
    const [formFieldElements, setFormFieldElements] = useState([]);
    const [fields, setFields] = React.useState<Array<IField>>([]);
    const [formName, setFormName] = useState('');

    const defaultFieldElements = [
        <FieldRenderer inputType={inputType.Date} label="Date of Occurence" required={false} />,
        <FieldRenderer inputType={inputType.Time} label="Time of Occurence" required={false} />,
        <FieldRenderer inputType={inputType.Map} label="Location" required={false} />,
    ]

    console.log(fields)

    useEffect(() => {

        if (params?.formID) {
            getForm(params.formID).then((res) => {
                setFormName(res.name);
                setFields(res.fields);
            }, (rej) => {
                console.log(rej)
            });
        }
    }, [])


    const onFieldUpPressed = (index) => {
        if (index > 0) {
            const newFields = [...fields];
            const temp = newFields[index - 1];
            newFields[index - 1] = newFields[index];
            newFields[index] = temp;
            setFields(newFields);
            setFormFieldElements([])
        }
    }

    const onFieldDownPressed = (index) => {
        if (index < fields.length - 1) {
            const newFields = [...fields];
            const temp = newFields[index + 1];
            newFields[index + 1] = newFields[index];
            newFields[index] = temp;
            setFields(newFields);
            setFormFieldElements([])
        }
    }

    useEffect(() => {
        const formFieldElements = fields.map((field, index) => (
        <View
            style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
            }}>
                <View 
                style={{
                    flex: 15,
                }}
                >
            <FieldRenderer key={index} inputType={field.inputType} label={field.label} options={field.options} required={field.required} />
                </View>
            <TouchableOpacity onPress={() => {}}
                style={{
                    flex:1,
                }}
            >
                <AntDesign name="delete" size={15} color="black" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {
                onFieldUpPressed(index);
            }}
                style={{
                    flex:1,
                }}
            >
                <AntDesign name="up" size={15} color="black" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {
                onFieldDownPressed(index);
            }}
                style={{
                    flex:1,
                }}
            >
                <AntDesign name="down" size={15} color="black" />
            </TouchableOpacity>
        </View>
        ));
        setFormFieldElements(formFieldElements);

    }, [fields]);

    const handleAddField = (field) => {
        console.log(field)
        setFields([...fields, field]);
    };

    const validateForm = () => {
        if (formName.length < 1) {
            return false;
        }
        return true
    }

    const onSaveButtonClicked = () => {
        if(!validateForm())
        {
            Alert.alert("Please enter a form name");
            return;
        }

        if (params?.formID) {
            updateForm({ fields: fields, activation_Status: true, name: formName, _id: params.formID })
            navigation.navigate("dashBoard")
            return;

        }
        addNewForm({ fields: fields, activation_Status: false, name: formName })
        navigation.goBack()
    }

    const onAddFieldButtonClicked = () => {
        setAddFieldModal(true)
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.saveButton} onPress={onSaveButtonClicked} >
                    <AntDesign name="save" size={24} color="#fff" />
                </TouchableOpacity>
                <TouchableOpacity onPress={onAddFieldButtonClicked}>
                    <AntDesign name="plus" size={24} color="#fff" />
                </TouchableOpacity>
            </View>
            <View style={styles.form}>
                <View style={styles.formName}>
                    <TextInput
                        placeholder="Form Name"
                        style={styles.formNameInput}
                        value={formName}
                        onChangeText={setFormName}
                    />
                </View>
                <View>
                    <Text>Default Fields</Text>
                    <View style={styles.formFields}>{defaultFieldElements}</View>
                </View>
                <View>
                    <Text>Custom Fields</Text>
                    <View style={styles.formFields}>{formFieldElements}</View>
                </View>
            </View>
            <Modal transparent={true} visible={addFieldModal}>
                <FieldSelectionModal setModal={setAddFieldModal} updateField={handleAddField} />
            </Modal>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        padding: 20,
        backgroundColor: '#2f4f4f',
    },
    form: {
        flex: 1,
        padding: 20,
    },
    formName: {
        marginBottom: 20,
    },
    formNameInput: {
        borderWidth: 1,
        paddingLeft: 20,
        fontSize: 20,
        height: 40,
    },
    formFields: {
        marginTop: 20,
    },
    saveButton: {
        marginRight: "auto",
    }
});
