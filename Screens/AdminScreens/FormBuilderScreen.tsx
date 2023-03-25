import { AntDesign } from "@expo/vector-icons";
import React, { useEffect } from "react";
import { TextInput, View, StyleSheet, Text, Modal, BackHandler } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { FieldSelectionModal } from "../../Modals/FieldSelectionModal";
import { field, FieldRenderer } from "../../utils/formBuilder";

export function FormBuilderScreen() {
    const [addFieldModal, setAddFieldModal] = React.useState(false);
    const [formField, setFormField] = React.useState(null);
    const [fields, setFields] = React.useState<Array<field>>([]);

    React.useEffect(() => {
        if (!fields) {
            return
        }
        const formField: Array<JSX.Element> = fields.map((field, key) => {
            return <FieldRenderer key={key} Type={field.Type} label={field.label} />;
        });

        setFormField(formField);
    }, [fields]);
    console.log(formField)

    return (
        <SafeAreaView style={style.window}>
            <View>
                <AntDesign onPress={() => { setAddFieldModal(true) }} name="plus" size={25} style={style.plusIcon} />
            </View>
            <View style={style.formNameContainer} >
                <TextInput placeholder="Form Name" style={style.formNameInput}>
                </TextInput>
            </View>
            <View style={style.defaultField}>
                <Text style={style.defaultFieldLabel}>Default Fields:</Text>
            </View>
            <Modal transparent={true} visible={addFieldModal} >
                <FieldSelectionModal setModal={setAddFieldModal} updateField={(field: field) => {
                    setFields((prevField) => {
                        return [...prevField, field]
                    })
                }} />
            </Modal>
            {formField}
        </SafeAreaView >
    )
}


const style = StyleSheet.create({
    window: {
        minHeight: "100%",
    },
    plusIcon: {
        marginLeft: "auto",
        marginRight: 20,
        marginTop: 20,
    },
    formNameContainer: {
        margin: 10,
        height: 60,
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: "center"
    },
    formNameInput: {
        borderWidth: 1,
        paddingLeft: 20,
        fontSize: 20,
        height: 40,
        width: "90%",
    },
    defaultField: {

    }
    , defaultFieldLabel: {
        fontSize: 12,
        marginLeft: 16
    }
});

