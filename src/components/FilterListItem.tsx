import React from 'react';
import { Button, Card, CardBody, Form, Input, Label } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface FilterListItemType {
  name: string;
  type: number;
  order: number;
}
type FilterListType = Array<FilterListItemType>;

function FilterListItem({ filter }: { filter: FilterListItemType }) {
  return (
    <>
      <Card className='filter-list-item'>
        <CardBody>
          <Form className='filterForm'>
            <FontAwesomeIcon icon='grip-vertical' className='mr-1' />
            <Input
              className='filterName'
              aria-label='Filter name'
              placeholder='Add a name for the filter'
            />
            <div className='filter-type'>
              <Label>Type</Label>
              <select
                className='dropdown-toggle btn btn-outline-secondary'
                title='Select filter type'>
                <option value={'Default'}>Default</option>
                <option value={'Date'}>Date</option>
                <option value={'Score'}>Score</option>
                <option value={'Search'}>Search</option>
              </select>
            </div>
          </Form>

          <div className='filterActions'>
            <Button outline color='secondary'>
              <FontAwesomeIcon icon='gear' />
            </Button>
            <Button outline color='danger'>
              <FontAwesomeIcon icon='trash-can' />
            </Button>
          </div>
        </CardBody>
      </Card>
    </>
  );
}

export default FilterListItem;
