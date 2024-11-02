import { Card, CardContent, CardHeader, CardTitle } from "@components/Card";
import UsersList from "@components/UsersList";

const Users = () => {

    return (
        <section className="grid grid-cols-12 py-2">

            <Card extraCss="col-span-12">
                <CardHeader>
                    <CardTitle>
                        Usuarios
                    </CardTitle>
                </CardHeader>
                <CardContent>

                    <UsersList />

                </CardContent>
            </Card>

        </section >
    );
}

export default Users;
