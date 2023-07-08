import { ScrollView, View, Text, StyleSheet } from "react-native";
import ReportType from "../../Components/ReportType";
import { SafeAreaView } from "react-native-safe-area-context";
import Title from "../../Components/Title";
import React from "react";
import { getForms } from "../../api/user";
import IForm from "../../types/Models/Form";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { getContrastColor } from "../../utils/colors";

export default function AddReportScreen({ navigation }) {

  const [reportForms, setReportForms] = React.useState<IForm[]>([]);
  const [reprotFormElements, setReportFormElements] = React.useState<JSX.Element[]>([])
  React.useEffect(() => {
    getForms().then(forms => {
      setReportForms(forms)
    }
    )
  }, [])

  React.useEffect(() => {
    setReportFormElements((prev) => {
      return reportForms.map((reportForm, index) => {
        return <ReportType
         color={reportForm.color}
          label={reportForm.name}
           formID={reportForm._id}
            image={<MaterialCommunityIcons
              name={reportForm.icon as any?? "file-document-outline"}
              size={50}
              color={getContrastColor(reportForm.color)}
             />} navigation={navigation} key={index} />
      })
    })
  }, [reportForms])

  

  return (
    <SafeAreaView>
      <ScrollView contentContainerStyle={styles.window} >
        <Title title={"Report"} />
        <View
          style={{
            justifyContent: "center",
            flexDirection: "row",
            flexWrap: "wrap",
          }}
        >{
            reprotFormElements
          }
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  window: {
    minHeight: "100%",
    alignItems: "center",
  },

});
