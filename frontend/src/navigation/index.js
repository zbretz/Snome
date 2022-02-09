import React, {useContext} from 'react';
import { NavigationContainer } from '@react-navigation/native';

import AuthStack from './AuthStack'
import { AppNavigator } from './AppNavigator';
// import { useAuth } from '../contexts/Auth';
// import { Loading } from '../components/Loading';
import UserContext from '../Context/UserContext'

export default function Router() {
    // const { authData, loading } = useAuth("true");
    const context = useContext(UserContext)
    let {user_data} = context
    const authData = { token: false }


    return (
        <NavigationContainer>
            {user_data?.is_logged_in ? <AppNavigator /> : <AuthStack />}
            {/* <AppNavigator /> */}
        </NavigationContainer>
    );
};