import React, { useState } from 'react';
import { Button, Card, CardBody, Input, Label } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { v4 as uuidv4 } from 'uuid';
import { useRecoilState, useSetRecoilState } from 'recoil';
import {
    filterList,
    editFilterModal,
    editedFilter,
} from '../../stores/filterStore';

import './styles/FilterListItem.css';

const FilterListItem = ({
    filter,
    handleDrag,
    handleDrop,
}: {
    filter: FilterStore.FilterListItemType;
    handleDrag: (e: FilterStore.FilterDragEvent) => void;
    handleDrop: (e: FilterStore.FilterDragEvent) => void;
}) => {
    const options = ['Default', 'Date', 'Score', 'Search'];

    const [filters, setFilters] = useRecoilState(filterList);
    const setModalState = useSetRecoilState(editFilterModal);
    const setEditedFilter = useSetRecoilState(editedFilter);

    const [cogState, setCogState] = useState(filter.type);
    const [filterName, setFilterName] = useState(filter.name);

    const editFilter = (value: string | number) => {
        if (typeof value === 'number') {
            setCogState(value);
        } else {
            if (!value.length) {
                value = filter.name;
            }
            setFilterName(value);
        }

        const newFilterValues = {
            id: filter.id,
            name: typeof value === 'string' ? value : filter.name,
            type: typeof value === 'number' ? value : cogState,
            scoreType: typeof value === 'number' ? filter.scoreType : undefined,
            order: filter.order,
        };

        setFilters(
            filters.map((filter) =>
                filter.id === newFilterValues.id ? newFilterValues : filter
            )
        );
    };

    const deleteFilter = (filterId: string) => {
        setFilters(filters.filter((row) => row.id !== filterId));
    };

    return (
        <>
            <Card
                className='filter-list-item'
                id={filter.id}
                draggable={true}
                onDragOver={(e) => e.preventDefault()}
                onDragStart={handleDrag}
                onDrop={handleDrop}>
                <CardBody>
                    <div className='filterForm'>
                        <FontAwesomeIcon
                            icon='grip-vertical'
                            className='mr-1'
                        />
                        <Input
                            className='filterName'
                            aria-label='Filter name'
                            placeholder='Add a name for the filter'
                            onBlur={(e) => editFilter(e.currentTarget.value)}
                            defaultValue={filterName}
                            required
                        />
                        <div className='filter-type'>
                            <Label>Type</Label>
                            <select
                                className='dropdown-toggle btn btn-outline-secondary'
                                title='Select filter type'
                                onChange={(e) =>
                                    editFilter(e.currentTarget.selectedIndex)
                                }
                                defaultValue={cogState}>
                                {options.map(
                                    (optionName: string, index: number) => (
                                        <option key={uuidv4()} value={index}>
                                            {optionName}
                                        </option>
                                    )
                                )}
                            </select>
                        </div>
                    </div>
                    <div className='filterActions'>
                        <Button
                            outline
                            color='secondary'
                            onClick={() => {
                                setEditedFilter(filter);
                                setModalState(true);
                            }}
                            hidden={cogState !== options.indexOf('Score')}>
                            <FontAwesomeIcon icon='gear' />
                        </Button>
                        <Button
                            outline
                            color='danger'
                            onClick={() => deleteFilter(filter.id)}>
                            <FontAwesomeIcon icon='trash-can' />
                        </Button>
                    </div>
                </CardBody>
            </Card>
        </>
    );
};

export default FilterListItem;
