import React from 'react';
import { Auth0ContextInterface, withAuth0 } from '@auth0/auth0-react';
import FilterListItem from './FilterListItem';
import { Button, Card, CardBody, CardFooter, CardTitle } from 'reactstrap';
import AddFilterButton from './AddFilterButton';
import { useRecoilValue } from 'recoil';
import filterStore from '../../stores/filterStore';
import { v4 as uuidv4 } from 'uuid';

const FilterTable = ({ auth0 }: { auth0: Auth0ContextInterface }) => {
    const { filterList } = useRecoilValue(filterStore);

    const showResult = () => {
        alert(JSON.stringify(filterList, null, 4));
    };

    return (
        <Card id='filter-table'>
            <CardBody>
                <CardTitle tag={'h5'}>Filters</CardTitle>
                <div id='filter-list'>
                    {filterList.length
                        ? filterList.map((filter) => (
                              <FilterListItem key={uuidv4()} filter={filter} />
                          ))
                        : 'No filters added yet'}
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
    );
};

export default withAuth0(FilterTable);
