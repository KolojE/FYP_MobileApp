import {  MaterialCommunityIcons } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import { View, Text,ScrollView, FlatList } from 'react-native';
import SearchBar from '../Components/SearchBar';

type IconSelectionModalProps = {
    onIconPress: (icon: string) => void
}

export default function IconSelectionModal({ onIconPress }: IconSelectionModalProps) {

    const [icons,setIcons] = useState(Object.keys(MaterialCommunityIcons.glyphMap));

        const renderIcon = ({item:icon} ) => {
             return  (
                 <View
                 style={{
                     width: 50,
                     height: 50,
                     justifyContent: "center",
                        alignItems: "center",
                        margin: 10,
                    }}
                    >
                    <MaterialCommunityIcons name={icon as any} size={24} color="black" onPress={() => { onIconPress(icon) }} />
                    <Text
                        style={{
                            fontSize: 10,
                        }}
                    >
                        {icon}
                    </Text>
                </View>
                )
            }

        const onSearchTextChanged = (text: string) => {
            if (text === "") {
                setIcons(Object.keys(MaterialCommunityIcons.glyphMap));
            } else {
                setIcons(Object.keys(MaterialCommunityIcons.glyphMap).filter((icon) => {
                    return icon.toLowerCase().includes(text.toLowerCase());
                }));
            }
        }
    return (
        <View style={{
            flex: 1,
            width: "100%",
            alignContent: "center",
            justifyContent: "center",
        }}>
            <View
                style={{
                    width: "100%",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
            <SearchBar 
                onSearchTextChanged={
                    onSearchTextChanged
                }
                
                />
                </View>
            <FlatList
                data={icons}
                contentContainerStyle={{
                    justifyContent: "center",
                    alignItems: "center",
                }}
                renderItem={renderIcon}
                numColumns={5}
                keyExtractor={(item) => item}
                initialNumToRender={10}
            />
        </View>
    )
    }
