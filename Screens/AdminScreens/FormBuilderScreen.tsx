import { AntDesign } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { TextInput, View, StyleSheet, Text, Modal, BackHandler, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { FieldSelectionModal } from "../../Modals/FieldSelectionModal";
import { field, FieldRenderer } from "../../utils/formHandler";

export function FormBuilderScreen() {
    const [addFieldModal, setAddFieldModal] = useState(false);
    const [formField, setFormField] = useState([]);
    const [fields, setFields] = React.useState<Array<field>>([]);
    const [formName, setFormName] = useState('');

    useEffect(() => {
        const formFieldElements = fields.map((field, index) => (
            <FieldRenderer key={index} Type={field.Type} label={field.label} />
        ));
        setFormField(formFieldElements);
    }, [fields]);

    const handleAddField = (field) => {
        setFields([...fields, field]);
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => setAddFieldModal(true)}>
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
                <View style={styles.formFields}>{formField}</View>
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
});
