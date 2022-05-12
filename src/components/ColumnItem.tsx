import React, { Component } from 'react';
import { DropdownItem, Tooltip } from 'reactstrap';

interface ColumnItemProps {
  column: {
    sampleHeader: string;
    sample: Array<string>;
  };
}

interface ColumnItemState {
  tooltipOpen: boolean;
  dropdownOpen: boolean;
}

class ColumnItem extends Component<ColumnItemProps, ColumnItemState> {
  state: ColumnItemState = {
    tooltipOpen: false,
    dropdownOpen: false,
  };

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
    const { column } = this.props;
    return (
      <>
        <DropdownItem
          id={`Tooltip-${column.sampleHeader}`}
          onMouseEnter={() => this.toggleTooltip()}
          onClick={() => console.log('AJSDNASKJD')}>
          {column.sampleHeader}
        </DropdownItem>
        <Tooltip
          className='tooltip-item'
          autohide={false}
          placement={'right'}
          isOpen={this.state.tooltipOpen}
          target={`Tooltip-${column.sampleHeader}`}
          toggle={() => this.toggleTooltip()}>
          <h6>Sample Data</h6>
          {column.sample.slice(0, 5).map((item) => (
            <ul key={item}>
              <li title={item}>{item}</li>
            </ul>
          ))}
        </Tooltip>
      </>
    );
  }
}

export default ColumnItem;
