import { useSelector } from "react-redux"
import { RootState } from "../redux/store"
import { IReport } from "../types/Models/Report"
import { ReportGroupedByType } from "../types/General"
import ReportList from "./ReportList"
import { FlatList, Modal, View } from "react-native"
import UpdateReportModal from "../Modals/UpdateReportModal"
import React from "react"

export default function ListMode({ navigation }) {
    const groupedReport = useSelector((state: RootState) => state.report)

    let reports: IReport[] = []
    groupedReport.groupedReports.map((report: ReportGroupedByType) => {
        report.reports.map((r: IReport) => {
            reports.push({ ...r, name: report.name }) // retrive the name from the GroupedReport
        })
    })

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
            <FlatList
                data={reports}
                renderItem={renderItem}
            />
            <Modal visible={!!selectedReport} >
                <UpdateReportModal onForwardPressed={onReportForwardPressed} closeModal={onModalClose} reportID={selectedReport} />
            </Modal>
        </>
    )
}