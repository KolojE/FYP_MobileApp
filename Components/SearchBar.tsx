import { Entypo } from "@expo/vector-icons";
import IconTextInput from "./IconTextInput";
import { StyleSheet } from "react-native";

type SearchBarProps = {
    onSearchTextChanged: (text: string) => void
}

export default function SearchBar({ onSearchTextChanged }: SearchBarProps) {
    return (
        <IconTextInput icon={<Entypo name="magnifying-glass" style={{ marginRight: 10 }} />} placeholder="Enter any keyword, ID, name etc.." viewContainerStyle={styles.searchBox} editable={true} onTextChange={onSearchTextChanged} />
    )
}

const styles = StyleSheet.create({
    searchBox: {
        borderWidth: 1,
        width: "90%",
        marginTop: "5%",
        flexDirection: "row",
        alignItems: "center",
        borderRadius: 100,
        paddingLeft: 10,
        paddingTop: 2,
        paddingBottom: 2,
    }
})