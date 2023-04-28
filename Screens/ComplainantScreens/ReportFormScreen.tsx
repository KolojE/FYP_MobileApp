import React from "react";
import { View, Text, ScrollView, Alert } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { IField } from "../../api/Models/Form";
import { FieldRenderer } from "../../utils/formHandler";
import { getForm } from "../../api/user";

export default function ReportFormScreen({ route, navigation }) {

    const [defaultfieldElements, setDefaultFieldElements] = React.useState<JSX.Element[]>([]);
    const [formFieldElements, setFormFieldElements] = React.useState([]);

    const [defaultfields, setDefaultFields] = React.useState<IField[]>([]);
    const [fields, setFields] = React.useState<IField[]>([]);
    const [formName, setFormName] = React.useState("");

    const params = route.params;
    let submitted = false;

    React.useEffect(
        () =>
            navigation.addListener('beforeRemove', (e) => {
                // Prevent default behavior of leaving the screen
                e.preventDefault();
                if (submitted) { navigation.dispatch(e.data.action); return }
                // Prompt the user before leaving the screen
                Alert.alert(
                    'Discard changes?',
                    'You have unsaved changes. Are you sure to discard them and leave the screen?',
                    [
                        { text: "Don't leave", style: 'cancel', onPress: () => { } },
                        {
                            text: 'Save as draft',
                            style: 'destructive',
                            // If the user confirmed, then we dispatch the action we blocked earlier
                            // This will continue the action that had triggered the removal of the screen
                            onPress: () => navigation.dispatch(e.data.action),
                        },
                    ]
                );
            }),
        [navigation]
    );

    React.useEffect(() => {
        if (!params?.formID) { throw new Error("Form ID not provided!") }

        getForm(params.formID).then((res) => {
            setFormName(res.name);
            setFields(res.fields);
            setDefaultFields(res.defaultFields);
        }, (rej) => {
            console.log(rej)
        });

    }, [])

    React.useEffect(() => {

        const formFieldElements = fields.map((field, index) => (
            <FieldRenderer key={index} inputType={field.inputType} label={field.label} required={true} />
        ));

        const formDefaultFieldElement = defaultfields.map((field, index) => (
            <FieldRenderer key={index} inputType={field.inputType} label={field.label} required={true} />
        ))
        setFormFieldElements(formFieldElements);
        setDefaultFieldElements(formDefaultFieldElement);
    }, [fields]);

    return (
        <SafeAreaView>
            <ScrollView contentContainerStyle={{ alignItems: "center", width: "100%" }}>
                <View style={{ backgroundColor: "#162147", width: "100%", alignItems: "center", paddingTop: "5%", borderBottomStartRadius: 20, borderBottomEndRadius: 20 }}><Text style={{ fontWeight: "bold", color: "white", marginBottom: "5%" }}>Report Wild Fire</Text></View>
                <View style={{ marginTop: "5%", marginBottom: "10%" }}><FontAwesome name="fire" size={50} color="black" /></View>
                <Text>{formName}</Text>
                <View style={{ width: "90%", marginBottom: "3%" }}>
                    {defaultfieldElements}
                    <Text>Details</Text>
                    {formFieldElements}
                </View>
            </ScrollView >
        </SafeAreaView>
    )
}


