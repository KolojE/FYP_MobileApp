import React from "react";
import { View, Text, ScrollView, Alert, StyleSheet, TouchableOpacity, AsyncStorage } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { IField} from "../../types/Models/Form";
import { FieldRenderer } from "../../utils/formHandler";
import { getForm } from "../../api/user";
import { submitReport } from "../../api/complainant";
import { reportSubmissionSchema } from "../../types/General";
import { setItemAsync,getItemAsync } from "expo-secure-store";


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

    const saveReportToStorage = async () => {
        try {
          const serializedData = JSON.stringify(report);
          await setItemAsync(params.formID, serializedData);
          console.log(report)
          console.log('Report data saved successfully.');
        } catch (error) {
          console.log('Error saving report data:', error);
        }
      };
      
      // Function to retrieve the report submission schema from AsyncStorage
      const getReportFromStorage = async () => {
        try {
          const serializedData = await getItemAsync(params.formID);
          if (serializedData !== null) {
            const reportData = JSON.parse(serializedData);
            setReport(reportData);
            console.log('Report data retrieved successfully:', reportData);
            return reportData;
          }
        } catch (error) {
          console.log('Error retrieving report data:', error);
        }
      };

    React.useEffect(() => {
        getReportFromStorage();
    },[])

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
                            onPress: async() => {
                                 await saveReportToStorage();
                                 navigation.dispatch(e.data.action);
                            }
                        },
                    ]
                );


            }

            )

            return unsubcribe
        },
        [navigation, submitted,report,params?.formID]
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

    const defaultFieldElements = React.useMemo(
        () =>
            defaultFields.map((field, index) => {
                setReport((prev) => { return { ...prev, [field._id]: null } })
                return <FieldRenderer _id={field._id} key={index} inputType={field.inputType} label={field.label} options={field.options} report={report} required={field.required} setReport={setReport} />
            }),
        [defaultFields]
    );

    const formFieldElements = React.useMemo(
        () =>
            fields.map((field, index) => {
                setReport((prev) => { return { ...prev, [field._id]: null } })
                return <FieldRenderer _id={field._id} key={index} inputType={field.inputType} label={field.label} options={field.options} report={report}  required={field.required} setReport={setReport} />
            }),
        [fields]
    );

    const onSubmitButtonPressed = async () => {
        if (!checkRequiredFields()) {
            return;
        }
        setItemAsync(params.formID, null);
        await submitReport({ formID: params.formID, report: report, fields: fields })
        setSubmitted(true)
    }

    const checkRequiredFields = () => {
        let missingFields: string[] = [];
        [...fields, ...defaultFields].forEach((field) => {
            if (field.required && !report[field._id]) {
                missingFields.push(field.label);
            }
        })
        if (missingFields.length > 0) {
            Alert.alert(
                'Missing Fields',
                `Please fill in the following fields: ${missingFields.join(", ")}`,
                [
                    { text: "OK", style: 'cancel', onPress: () => { } },
                ]
            );
            return false;
        }
        return true;
    }

    return (

        <SafeAreaView style={styles.container}>
            <View style={styles.titleContainer}>
                <Text style={{ color: "white", fontSize: 20 }}>Submit Report Form</Text>
            </View>
            <ScrollView contentContainerStyle={styles.scrollView}>
                    <Text style={styles.title}>Report {formName}</Text>
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
        width: "100%",
        alignItems: "center",
        paddingTop: "5%",
        paddingBottom: "10%"
    },
    title: {
        fontSize: 30,
        fontWeight: "bold",
        color: "black",
        padding:20
    },
    titleContainer: {
        backgroundColor: "#162147",
        width: "100%",
        padding:15,
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



