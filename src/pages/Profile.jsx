import React from 'react';
import { Card, CardHeader, CardTitle } from '../components/Card';

const Profile = () => {
    return (
        <div className='grid grid-cols-12'>
            <div className='col-span-12'>
                <Card>
                    <CardHeader>
                        <CardTitle>Profile</CardTitle>
                    </CardHeader>
                    <div className='p-6'>
                        Mi Perfil
                    </div>
                </Card>
            </div>
        </div>
    );
}

export default Profile;
