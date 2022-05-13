import React, { useState } from 'react';
import { Button, Card, CardBody, Input, Label } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { v4 as uuidv4 } from 'uuid';
import { useRecoilState } from 'recoil';
import filterStore from '../../stores/filterStore';
import { modalAtom } from './EditFilterModal';
import EditFilterModal from './EditFilterModal';

const FilterListItem = ({
    filter,
}: {
    filter: FilterStore.FilterListItemType;
}) => {
    const options = ['Default', 'Date', 'Score', 'Search'];
    const [cogState, setCogState] = useState(0);
    const [filterState, setFilterState] = useRecoilState(filterStore);
    const [_, setModalState] = useRecoilState(modalAtom);

    const changeFilterType = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setCogState(e.target.selectedIndex);
    };

    const deleteFilter = (filterId: string) => {
        setFilterState({
            ...filterState,
            filterList: filterState.filterList.filter(
                (row) => row.id !== filterId
            ),
        });
    };

    return (
        <>
            <EditFilterModal filter={filter} />
            <Card className='filter-list-item'>
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
                            defaultValue={filter.name}
                        />
                        <div className='filter-type'>
                            <Label>Type</Label>
                            <select
                                className='dropdown-toggle btn btn-outline-secondary'
                                title='Select filter type'
                                value={cogState}
                                onChange={(e) => changeFilterType(e)}>
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
                            onClick={() => setModalState(true)}
                            hidden={cogState !== options.indexOf('Search')}>
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
