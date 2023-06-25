import React from "react";
import { View, ScrollView, Text, StyleSheet, TouchableOpacity, Image, Modal } from "react-native";
import { AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import IUser from "../types/Models/User";
import { IReport } from "../types/Models/Report";
import { detailRenderer } from "../utils/reportHandler";

type ReportModalProps = {
    report: IReport;
    closeModal: () => void;
};

export default function ReportModal({
    report,
    closeModal
}: ReportModalProps) {

    const [detailElements, setDetailElements] = React.useState<JSX.Element[]>([]);

    const [photoUri, setPhotoUri] = React.useState<string>(null);



    React.useEffect(() => {
        const details = report.details;
        let detailElements: JSX.Element[] = [];
        for (const key in details) {
            const detail = details[key];
            detailElements.push(detailRenderer(detail, key));
        }
        setDetailElements(detailElements);
    }, []);


    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.contentContainer}>
                <TouchableOpacity
                    style={styles.closeButton}
                    onPress={() => { closeModal() }}
                >
                    <AntDesign name="close" size={24} color="black" />
                </TouchableOpacity>
                <Text style={styles.reportId}>{report._id}</Text>
                <View style={styles.detailsContainer}>
                    <View style={styles.detailRow}>
                        <Text style={styles.detailLabel}>Title</Text>
                        <View style={styles.detailValueContainer}>
                            <Text style={styles.detailValue}>{report.name}</Text>
                            <MaterialCommunityIcons
                                name="waterfall"
                                size={20}
                                color="black"
                            />
                        </View>
                    </View>
                    <View style={styles.detailRow}>
                        <Text style={styles.detailLabel}>Submission Date</Text>
                        <Text style={styles.detailValue}>
                            {new Date(report.submissionDate).toDateString()}
                        </Text>
                    </View>
                    {detailElements}
                </View>
                <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Latest Updated Date</Text>
                    <Text style={styles.detailValue}>
                        {new Date(report.updateDate).toDateString()}
                    </Text>
                </View>
                <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Updated At:</Text>
                    <Text style={styles.detailValue}>
                        {report.updateDate.toLocaleTimeString()}
                    </Text>
                </View>
                <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Updates Comment</Text>
                    <Text style={styles.detailValue}>
                        {report.status.comment}
                    </Text>
                </View>
                <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Status</Text>
                    <Text style={styles.detailValue}>
                        {report.status.desc}
                    </Text>
                </View>
            </ScrollView>
            <Modal visible={photoUri != null}>
                <Image source={{ uri: photoUri }} />
            </Modal>

        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    contentContainer: {
        paddingHorizontal: 20,
        paddingTop: 20,
    },
    closeButton: {
        alignSelf: "flex-end",
        marginBottom: 20,
    },
    reportId: {
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 20,
    },
    detailsContainer: {
        backgroundColor: "white",
        borderRadius: 8,
        padding: 20,
    },
    detailRow: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 20,
    },
    detailLabel: {
        flex: 1,
        fontWeight: "bold",
        marginRight: 10,
    },
    detailValueContainer: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#f2f2f2",
        padding: 10,
        borderRadius: 4,
    },
    detailValue: {
        flex: 1,
        marginRight: 10,
    },
});
