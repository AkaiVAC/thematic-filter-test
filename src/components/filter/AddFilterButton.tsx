import React, { useState } from 'react';
import { Auth0ContextInterface } from '@auth0/auth0-react';

import { ButtonDropdown, DropdownToggle, DropdownMenu } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ColumnList from './ColumnList';

import { v4 as uuidv4 } from 'uuid';
import { useRecoilState } from 'recoil';
import { filterColumns } from '../../stores/filterStore';
import getColumnsUtil from '../../utils/getColumnsUtil';

import './AddFilterButton.css';

const AddFilterButton = ({ auth0 }: { auth0: Auth0ContextInterface }) => {
    const [dropdownState, setDropdownState] = useState(false);
    const [columns, setColumns] = useRecoilState(filterColumns);

    return (
        <ButtonDropdown
            id='add-filter-btn'
            className='mb-3'
            isOpen={dropdownState}
            toggle={() => setDropdownState(!dropdownState)}
            onClick={() =>
                !columns.length && getColumnsUtil(auth0, setColumns)
            }>
            <DropdownToggle>
                <FontAwesomeIcon icon='plus' className='mr-2' /> Add Filter
            </DropdownToggle>
            <DropdownMenu style={{ margin: 0 }}>
                {columns.map((column) => (
                    <div key={uuidv4()}>
                        <ColumnList column={column} />
                    </div>
                ))}
            </DropdownMenu>
        </ButtonDropdown>
    );
};

export default AddFilterButton;
