import React, {useEffect} from 'react';
import { Alert, BackHandler} from 'react-native';

export const useBackButton= <T extends boolean>(
    backAction: T extends true ? () => T: () => T,
    goBack?: T
) => {

    useEffect(() => {

        console.log("useBackButton")
        const backAction = () => {
          Alert.alert('Hold on!', 'Are you sure you want to go back?', [
            {
              text: 'Cancel',
              onPress: () => null,
              style: 'cancel',
            },
            {text: 'YES', onPress: () => BackHandler.exitApp()},
          ]);
          return true;
        };
    
        const backHandler = BackHandler.addEventListener(
          'hardwareBackPress',
          backAction,
        );
    
        return () => backHandler.remove();
        }, []);
};