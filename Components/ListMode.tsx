import { IReport } from "../types/Models/Report"
import ReportList from "./ReportList"
import { FlatList, Modal, View } from "react-native"
import UpdateReportModal from "../Modals/UpdateReportModal"
import React from "react"
import { useSelector } from "react-redux"
import { RootState } from "../redux/store"

export default function ListMode({ navigation }) {

    let reports: IReport[] = useSelector((state:RootState) => state.report.reports)
    const [selectedReport, setSelectedReport] = React.useState<IReport>(null)


    const onReportPressed = (report: IReport) => {
        setSelectedReport(report)
    }

    const onModalClose = () => {
        setSelectedReport(null)
    }

    const onReportForwardPressed = (report: IReport) => {
        navigation.navigate("ChatRoom", { report: report, complainantID: report.complainant._id })
    }

    function renderItem({ item }: { item: IReport }) {
        return (
            <View style={{ width: "90%", alignSelf: "center" }}>
                <ReportList onPressed={onReportPressed} report={item} key={item._id} onForwardMessagePress={onReportForwardPressed} />
            </View>
        )

    }
    return (
        <>
        <View style={{flex: 1,marginBottom:20}}>
            <FlatList
                style={{ width: "100%"}}
                data={reports}
                scrollEnabled={true}
                renderItem={renderItem}
            />
            <Modal visible={!!selectedReport} >
                {
                    selectedReport &&
                    <UpdateReportModal onForwardPressed={onReportForwardPressed} closeModal={onModalClose} reportID={selectedReport._id} />
                }
            </Modal>
         </View>
        </>
    )
}