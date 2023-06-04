import React from "react";
import { View, Text, ScrollView, Alert, StyleSheet, TouchableOpacity } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { IField, inputType } from "../../types/Models/Form";
import { FieldRenderer } from "../../utils/formHandler";
import { getForm } from "../../api/user";
import { submitReport } from "../../api/complainant";
import { reportSubmissionSchema } from "../../types/General";


type ReportFormScreenProps = {
    route: any,
    navigation: any
}




export default function ReportFormScreen({ route, navigation }: ReportFormScreenProps) {


    const [defaultFields, setDefaultFields] = React.useState<IField[]>([]);
    const [fields, setFields] = React.useState<IField[]>([]);
    const [formName, setFormName] = React.useState("");

    const [report, setReport] = React.useState<reportSubmissionSchema>({});

    const params = route.params;
    const [submitted, setSubmitted] = React.useState(false);



    React.useEffect(() => {
        if (submitted) {
            navigation.goBack();
        }
    }, [submitted])

    React.useEffect(
        () => {
            const unsubcribe = navigation.addListener('beforeRemove', (e) => {
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


            }

            )

            return unsubcribe
        },
        [navigation, submitted]
    );

    React.useEffect(() => {
        if (!params?.formID) { throw new Error("Form ID not provided!") }

        getForm(params.formID).then((res) => {
            setFormName(res.name);
            setFields(res.fields);
            setDefaultFields(res.defaultFields);
        }, (rej) => {
        });

    }, [])

    const defaultFieldElements = React.useMemo(
        () =>
            defaultFields.map((field, index) => {
                setReport((prev) => { return { ...prev, [field._id]: null } })
                return <FieldRenderer _id={field._id} key={index} inputType={field.inputType} label={field.label} required setReport={setReport} />
            }),
        [defaultFields]
    );

    const formFieldElements = React.useMemo(
        () =>
            fields.map((field, index) => {
                setReport((prev) => { return { ...prev, [field._id]: null } })
                return <FieldRenderer _id={field._id} key={index} inputType={field.inputType} label={field.label} required setReport={setReport} />
            }),
        [fields]
    );

    const onSubmitButtonPressed = () => {
        submitReport({ formID: params.formID, report: report, fields: fields })
        setSubmitted(true)
    }

    return (

        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollView}>
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>Report {formName}</Text>
                </View>
                <View style={styles.IconContainer}>
                    <FontAwesome name="fire" size={50} color="black" />
                </View>
                <View style={styles.formContainer}>
                    {defaultFieldElements}
                    <Text style={styles.detailsText}>Details</Text>
                    {formFieldElements}
                </View>
                <TouchableOpacity style={styles.submitButton} onPress={() => { onSubmitButtonPressed() }}>
                    <Text style={{ color: "white" }}>Submit</Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollView: {
        flexGrow: 1,
        width: "100%",
        alignItems: "center",
        paddingTop: "5%",
        borderBottomStartRadius: 20,
        borderBottomEndRadius: 20
    },
    title: {
        fontWeight: "bold",
        color: "white",
    },
    titleContainer: {
        backgroundColor: "#162147",
        width: "100%",
        height: "5%",
        alignItems: "center",
        justifyContent: "center",
        borderBottomEndRadius: 10,
        borderBottomStartRadius: 10
    },
    IconContainer: {
        marginTop: "5%",
        marginBottom: "10%"
    },
    formContainer: {
        width: "90%",
        marginBottom: "3%"
    },
    detailsText: {
        marginBottom: 10
    }, fieldLabel: {
        flex: 1,
        fontWeight: "bold",
    },
    fieldValue: {
        flex: 1,
        textAlign: "right",
    }, fieldContainer: {
        flexDirection: "row",
        marginVertical: 5,
    },
    submitButton: {
        backgroundColor: "blue",
        paddingVertical: 10,
        paddingHorizontal: 20,
        marginTop: "10%",
        borderRadius: 20,
    }
});



