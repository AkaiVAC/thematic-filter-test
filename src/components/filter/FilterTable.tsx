import React, { useEffect, useState } from 'react';
import { Auth0ContextInterface, withAuth0 } from '@auth0/auth0-react';
import { v4 as uuidv4 } from 'uuid';
import { Button, Card, CardBody, CardFooter, CardTitle } from 'reactstrap';
import { useRecoilState } from 'recoil';
import FilterListItem from './FilterListItem';
import AddFilterButton from './AddFilterButton';
import { filterList } from '../../stores/filterStore';

import './styles/FilterTable.css';
import EditFilterModal from './EditFilterModal';

const FilterTable = ({ auth0 }: { auth0: Auth0ContextInterface }) => {
    const [filters, setFilters] = useRecoilState(filterList);
    const [dragId, setDragId] = useState('');

    const handleDrag = (e: FilterStore.FilterDragEvent) => {
        setDragId(e.currentTarget.id);
    };

    const handleDrop = (e: FilterStore.FilterDragEvent) => {
        const dragBox = filters.find((box) => box.id === dragId)!;
        const dropBox = filters.find((box) => box.id === e.currentTarget.id)!;

        const dragBoxOrder = dragBox.order;
        const dropBoxOrder = dropBox.order;

        const newFilterOrder = filters.map((box) => {
            if (box.id === dragId) {
                box = { ...box, order: dropBoxOrder };
            }
            if (box.id === e.currentTarget!.id) {
                box = { ...box, order: dragBoxOrder };
            }
            return box;
        });

        setFilters(newFilterOrder.sort((a, b) => a.order - b.order));
    };

    const showResult = () => {
        alert(JSON.stringify(filters, null, 4));
    };

    useEffect(() => {}, [filters]);

    return (
        <>
            <EditFilterModal />
            <Card id='filter-table'>
                <CardBody>
                    <CardTitle tag={'h5'}>Filters</CardTitle>
                    <div id='filter-list'>
                        {filters.length ? (
                            filters.map((filter) => (
                                <FilterListItem
                                    key={uuidv4()}
                                    handleDrag={handleDrag}
                                    handleDrop={handleDrop}
                                    filter={filter}
                                />
                            ))
                        ) : (
                            <span>No filters added yet</span>
                        )}
                    </div>
                    <AddFilterButton auth0={auth0} />
                </CardBody>
                <CardFooter>
                    <div id='card-actions'>
                        <Button outline id='cancel'>
                            Cancel
                        </Button>
                        <Button
                            color='primary'
                            id='save'
                            onClick={() => showResult()}>
                            Save
                        </Button>
                    </div>
                </CardFooter>
            </Card>
        </>
    );
};

export default withAuth0(FilterTable);
