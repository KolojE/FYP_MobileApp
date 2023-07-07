import React, {useEffect} from 'react';
import { Alert, BackHandler} from 'react-native';

export const useBackButton= <T extends boolean>(
    backAction: T extends true ? () => T: () => T,
    goBack?: T
) => {

    useEffect(() => {

        console.log("useBackButton")
        const backHandler = BackHandler.addEventListener(
          'hardwareBackPress',
          backAction,
        );
    
        return () => backHandler.remove();
        }, []);
};