import { View, Text, Image, Touchable, TouchableOpacity } from "react-native"
import IComplainant from "../types/Models/Complainant";
import { StyleSheet } from "react-native";
import IconText from "../Components/IconText";
import { AntDesign, MaterialCommunityIcons, Octicons } from "@expo/vector-icons";
import { useComplainantAction } from "../actions/complainantAction";


type MemberProfileModalProps = {
    member: IComplainant,
}

export default function MemberProfileModal({ member }: MemberProfileModalProps) {

    const complaiantAction = useComplainantAction();

    const onActivationButtonPressed = () => {
        console.log("pressed")
        complaiantAction.activateComplainant(member._id, !member.activation)
    }

    const onDeleteButtonPressed = () => {
        complaiantAction.deleteDeactivatedComplainant(member._id);
    }


    const activationTextStyle = member.activation ? { color: "green" } : { color: "red" };
    return (
        <View style={styles.container}>
            <View style={styles.profileIamgeContainer}>
                {
                    member.base64ProfilePicture ?
                        <Image
                            style={styles.profileImage}
                            source={{ uri: `data:image/jpg;base64,${member.base64ProfilePicture} ` }}
                        /> :
                        <MaterialCommunityIcons name="face-man-profile" size={100} color="black" style={{ backgroundColor: "white", ...styles.profileImage }} />
                }
                <Text style={styles.name}>{member.name}</Text>
            </View>
            <View style={styles.infoContainer}>
                <IconText icon={<AntDesign name="idcard" size={24} color="black" />} text={member.ID} style={styles.info} />
                <IconText icon={<AntDesign name="mail" size={24} color="black" />} text={member.email} style={styles.info} />
                <IconText icon={<AntDesign name="phone" size={24} color="black" />} text={member.contact?.phoneNo ?? "N/A"} style={styles.info} />
                <IconText icon={<AntDesign name="home" size={24} color="black" />} text={member.contact?.address ?? "N/A"} style={styles.info} />
                <IconText icon={<Octicons name="organization" size={24} color="black" />} text={member.organization.name} style={styles.info} />
                <IconText icon={<MaterialCommunityIcons name="account-reactivate" size={24} color="black" />} text={member.activation ? "Active" : "Inactive"} style={{ ...styles.info, ...activationTextStyle }} />
            </View>

            {
                member.activation ?
                    <TouchableOpacity onPress={onActivationButtonPressed} style={{ ...styles.button, backgroundColor: "red" }}>
                        <Text style={styles.buttonText}>Deactivate</Text>
                    </TouchableOpacity>
                    :
                    <View style={{ flexDirection: "row" }}>
                        <TouchableOpacity onPress={onActivationButtonPressed} style={{ ...styles.button, flex: 1, backgroundColor: "green" }}>
                            <Text style={styles.buttonText}>Activate</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={onDeleteButtonPressed} style={{ ...styles.button, flex: 1, marginLeft: 10, backgroundColor: "red" }}>
                            <Text style={styles.buttonText}>Delete</Text>
                        </TouchableOpacity>
                    </View>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        top: "40%",
        borderRadius: 25,
        flex: 1,
        padding: 16,
        backgroundColor: "white",
        alignItems: "center",
    },
    name: {
        fontSize: 24,
        fontWeight: "bold",
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        top: 0,
    },
    info: {
        fontSize: 16,
        marginLeft: 8,
    },
    infoContainer: {
        width: "80%",
        marginTop: "20%",
    },
    profileIamgeContainer: {
        width: "100%",
        alignItems: "center",
        position: "absolute",
        top: -50,

    },
    button: {
        width: "80%",
        height: 50,
        borderRadius: 25,
        alignItems: "center",
        justifyContent: "center",
        marginTop: "20%",
    },
    buttonText: {
        fontSize: 16,
        fontWeight: "bold",
        color: "white",
    }

});
