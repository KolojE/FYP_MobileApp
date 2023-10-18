import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import TagSelector from '../Components/TagSelector';
import { IStatus } from '../types/Models/Status';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export type statusReplacementMapper = {
    [key: string]: string
}

type StatusReplaceSelectionModalProps = {
    statuses: IStatus[];
    statusesToDelete: IStatus[];
    onConfirm: (statusMap: statusReplacementMapper) => void;
}

export default function StatusReplaceSelectionModal({ statuses, statusesToDelete, onConfirm }: StatusReplaceSelectionModalProps) {

    const [statusMap, setStatusMap] = useState<statusReplacementMapper>({});
    const availableStatuses = statuses.filter((status) => !statusesToDelete.includes(status));
    const [selectedStatusToDelete, setSelectedStatusToDelete] = useState<IStatus[]>([]);



    useEffect(() => {
        let statusMap: statusReplacementMapper = {};
        statusesToDelete.forEach((status) => {
            statusMap[status._id] = availableStatuses[0]._id;
        })
        setStatusMap(statusMap);
    }, [statuses, statusesToDelete])



    const onStatusToDeleteTagSelected = (status: IStatus, selected: boolean) => {
        if (selected) {
            setSelectedStatusToDelete(prev => [...prev, status]);
        } else {
            setSelectedStatusToDelete(prev => prev.filter((statusToDelete) => statusToDelete._id !== status._id))
        }
    }

    const onStatusToReplaceTagSelected = (status: IStatus, selected: boolean) => {
        let statusMapCopy = { ...statusMap };
        selectedStatusToDelete?.forEach((statusToDelete) => {
            console.log(statusToDelete.desc + " " + status.desc)
            console.log(JSON.stringify(selectedStatusToDelete, null, 2))
            statusMapCopy[statusToDelete._id] = status._id;
        })
        setStatusMap(statusMapCopy);
    }

    const statusToDeleteTags = statusesToDelete.map((status, index) => {
        return (
            <View
                style={{
                    margin: 5,
                }}
            >
                <TagSelector
                    onSelect={onStatusToDeleteTagSelected}
                    tagName={status.desc}
                    tagValue={status}
                    key={status._id}
                />
            </View>
        )
    })

    const statusToReplaceTags = availableStatuses.map((status, index) => {
        return (
            <View
                style={{
                    margin: 5,
                }}
            >
                <TagSelector
                    onSelect={onStatusToReplaceTagSelected}
                    tagName={status.desc}
                    tagValue={status}
                    multiSelect={false}
                    key={status._id}
                />
            </View>
        )
    })

    const statusesReplacementList = Object.keys(statusMap).map((statusMapKey: string) => {
        return (
            <View
                style={{
                    padding: 10,
                    width: "80%",
                    alignSelf: "center",
                }}
            >
                <View
            style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
            }}
                >

                    <Text
                        style={{
                            fontWeight: "bold",
                            flex:1
                        }}
                    >{`${statusesToDelete?.find(
                        (status) => status._id === statusMapKey
                    ).desc}`}
                    </Text>
                    <MaterialCommunityIcons
                        name="arrow-right"
                        size={20}
                        color="black"
                        style={{
                            marginRight: 10,
                            flex:1
                        }}
                    />
                    <Text
                        style={{
                            fontWeight: "bold",
                            marginRight: 10,
                            flex:1
                        }}
                    >{`${availableStatuses?.find(
                        (status) => status._id === statusMap[statusMapKey]
                    ).desc}`}</Text>
                </View>
            </View>
        )
    })


    return (
        <View
            style={{
                flex: 1,
                backgroundColor: "white",
                padding: 20,
                borderRadius: 10,
                elevation: 5,
                shadowColor: "black",

            }}
        >
            <Text
                style={{
                    fontSize: 20,
                    fontWeight: "bold",
                    marginBottom: 10,
                }}
            >Please select status to replace the deleted status
            </Text>
            <Text
                style={{
                    fontSize: 15,
                    fontWeight: "bold",
                    marginBottom: 10,
                }}>
                Statuses to delete:
            </Text>
            <View
                style={{
                    alignItems: "center",
                    justifyContent: "center",
                    flexDirection: "row",
                    padding: 10
                }}
            >
                {statusToDeleteTags}
            </View>
            <Text
                style={{
                    fontSize: 15,
                    fontWeight: "bold",
                    marginBottom: 10,
                }}>
                Statuse to replace with:
            </Text>
            <View
                style={{
                    alignItems: "center",
                    justifyContent: "center",
                    flexDirection: "row",
                    padding: 10
                }}
            >
                {availableStatuses.length > 0 ? statusToReplaceTags : <Text>No available statuses</Text>}
            </View>
                <Text
                    style={{
                        fontSize: 15,
                        fontWeight: "bold",
                        marginBottom: 10,
                    }}
                >
                    Report will be updated with the following changes:
                </Text>
            <View
                style={{
                    width: "100%",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                {statusesReplacementList}
            </View>
            <View
                style={{
                    width: "100%",
                    alignItems: "center",
                    justifyContent: "center",
                    marginTop:"auto"
                }}
            >
                <TouchableOpacity
                    onPress={() => onConfirm(statusMap)}
                    style={{
                        backgroundColor: "#2E9E9B",
                        padding: 10,
                        borderRadius: 10,
                        elevation: 5,
                        shadowColor: "black",
                        width: "40%",
                        alignItems: "center",
                    }}
                >
                    <Text
                    
                    style={{
                        color: "white",
                        fontWeight: "bold",
                    }}
                    >
                        Confirm changes
                    </Text>
                </TouchableOpacity>
            </View>

        </View>
    )

}