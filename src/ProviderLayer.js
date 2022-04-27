import React from 'react'
import { AuthProvider, DatabaseProvider, useFirebaseApp } from 'reactfire';
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';
import App from './App';


export default function ProviderLayer() {

    const app = useFirebaseApp();
    const auth = getAuth(app);
    const database = getDatabase(app);


    return (
        <div>
            <AuthProvider sdk={auth}>
                <DatabaseProvider sdk={database}>
                    <App />
                </DatabaseProvider>
            </AuthProvider>
        </div>
    )
}
