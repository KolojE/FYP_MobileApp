import { AntDesign } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { TextInput, View, StyleSheet, Text, Modal, BackHandler, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { FieldSelectionModal } from "../../Modals/FieldSelectionModal";
import { FieldRenderer } from "../../utils/formHandler";
import { IField, inputType } from "../../api/Models/Form";
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


    useEffect(() => {

        if (params?.formID) {
            getForm(params.formID).then((res) => {
                setFormName(res.name);
                setFields(res.fields);
            }, (rej) => {
            });
        }
    }, [])

    useEffect(() => {
        const formFieldElements = fields.map((field, index) => (
            <FieldRenderer key={index} inputType={field.inputType} label={field.label} required={true} />
        ));
        setFormFieldElements(formFieldElements);

    }, [fields]);

    const handleAddField = (field) => {
        setFields([...fields, field]);
    };

    const onSaveButtonClicked = () => {
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
