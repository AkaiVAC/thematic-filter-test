import React, { Component } from 'react';
import authConfig from '../auth_config.json';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Auth0ContextInterface, withAuth0 } from '@auth0/auth0-react';
import FilterListItem from './FilterListItem';
import ColumnItem from './ColumnItem';
import {
  Button,
  ButtonDropdown,
  Card,
  CardBody,
  CardTitle,
  DropdownMenu,
  DropdownToggle,
} from 'reactstrap';

interface FilterProps {
  auth0: Auth0ContextInterface;
}

interface FilterListItemType {
  name: string;
  type: number;
  order: number;
}

interface FilterState {
  filterList: Array<FilterListItemType>;
  synopsisData: {
    columns: Array<{
      sampleHeader: string;
      sample: Array<string>;
    }>;
  };
  error: string;
  loading: boolean;
  dropdownOpen: boolean;
  tooltipOpen: boolean;
}

class Filter extends Component<FilterProps, FilterState> {
  state: FilterState = {
    filterList: [],
    synopsisData: {
      columns: [],
    },
    error: '',
    loading: false,
    dropdownOpen: false,
    tooltipOpen: false,
  };

  async getTableData() {
    const { isAuthenticated } = this.props.auth0;
    if (!isAuthenticated) return;
    this.setState({ loading: true, error: '' });
    const url = `${authConfig.apiBase}/synopsis`;
    const getAccessTokenSilently =
      await this.props.auth0.getAccessTokenSilently();

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${getAccessTokenSilently}`,
      },
    });

    if (!response.ok) {
      const error = `An error has occured: ${response.status}`;
      this.setState({ error });
      return;
    }

    const { data } = await response.json();

    this.setState({ synopsisData: data, loading: false });
  }

  toggleDropdown() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen,
    });
  }

  toggleTooltip() {
    this.setState({
      tooltipOpen: !this.state.tooltipOpen,
    });
  }

  render() {
    const { filterList, synopsisData, dropdownOpen } = this.state;
    return (
      <Card id='filter-table'>
        <CardBody>
          <CardTitle>Filters</CardTitle>
          <div id='filter-list'>
            {filterList.length
              ? filterList.map((filter) => <FilterListItem filter={filter} />)
              : 'No filters added yet'}
          </div>
          <ButtonDropdown
            id='add-filter-btn'
            className='mb-3'
            isOpen={dropdownOpen}
            toggle={() => this.toggleDropdown()}
            onClick={() => this.getTableData()}>
            <DropdownToggle>
              <FontAwesomeIcon icon='plus' className='mr-2' /> Add Filter
            </DropdownToggle>
            <DropdownMenu>
              {synopsisData.columns.map((column, index) => (
                <div key={`${column.sampleHeader}_item_${index}`}>
                  <ColumnItem
                    column={{
                      sampleHeader: column.sampleHeader,
                      sample: column.sample,
                    }}
                  />
                </div>
              ))}
            </DropdownMenu>
          </ButtonDropdown>
          <div id='card-actions'>
            <Button outline id='cancel'>
              Cancel
            </Button>
            <Button color='primary' id='save'>
              Save
            </Button>
          </div>
        </CardBody>
      </Card>
    );
  }
}

export default withAuth0(Filter);
