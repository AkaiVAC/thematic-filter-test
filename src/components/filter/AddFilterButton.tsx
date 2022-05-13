import React, { useState } from 'react';
import { Auth0ContextInterface } from '@auth0/auth0-react';

import { ButtonDropdown, DropdownToggle, DropdownMenu } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ColumnItem from './ColumnItem';

import { useRecoilState } from 'recoil';
import filterStore from '../../stores/filterStore';
import { v4 as uuidv4 } from 'uuid';

import authConfig from '../../auth_config.json';

const AddFilterButton = ({ auth0 }: { auth0: Auth0ContextInterface }) => {
    const [dropdownState, setDropdownState] = useState(false);
    const [filterState, setFilterState] = useRecoilState(filterStore);

    const getSynopsis = async () => {
        if (!auth0.isAuthenticated) return;

        try {
            if (filterState.synopsisData.columns.length) {
                return;
            }
            const response = await (
                await fetch(`${authConfig.apiBase}/synopsis`, {
                    headers: {
                        Authorization: `Bearer ${await auth0.getAccessTokenSilently()}`,
                    },
                })
            ).json();

            setFilterState({
                ...filterState,
                synopsisData: {
                    columns: (
                        response.data as Pick<
                            FilterStore.State['synopsisData'],
                            'columns'
                        >
                    ).columns,
                },
            });
        } catch (error) {
            throw new Error(`An error has occured:\n ${error}`);
        }
    };

    return (
        <ButtonDropdown
            id='add-filter-btn'
            className='mb-3'
            isOpen={dropdownState}
            toggle={() => setDropdownState(!dropdownState)}
            onClick={() => getSynopsis()}>
            <DropdownToggle>
                <FontAwesomeIcon icon='plus' className='mr-2' /> Add Filter
            </DropdownToggle>
            <DropdownMenu style={{ margin: 0 }}>
                {filterState.synopsisData.columns.map(
                    ({ sample, sampleHeader }) => (
                        <div key={uuidv4()}>
                            <ColumnItem
                                column={{
                                    sampleHeader: sampleHeader,
                                    sample: sample,
                                }}
                            />
                        </div>
                    )
                )}
            </DropdownMenu>
        </ButtonDropdown>
    );
};

export default AddFilterButton;
