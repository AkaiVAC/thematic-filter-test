import { Auth0ContextInterface } from '@auth0/auth0-react';
import { SetterOrUpdater } from 'recoil';
import authConfig from '../auth_config.json';

const getColumnsUtil = async (
    auth0: Auth0ContextInterface,
    setColumns: SetterOrUpdater<FilterStore.ColumnItem[]>
) => {
    if (!auth0.isAuthenticated) return;

    try {
        const response = await (
            await fetch(`${authConfig.apiBase}/synopsis`, {
                headers: {
                    Authorization: `Bearer ${await auth0.getAccessTokenSilently()}`,
                },
            })
        ).json();

        setColumns(response.data.columns as Array<FilterStore.ColumnItem>);
    } catch (error) {
        alert(
            'There was an error fetching the column information. Please try again.'
        );
        throw new Error(`An error has occured:\n ${error}`);
    }
};

export default getColumnsUtil;
