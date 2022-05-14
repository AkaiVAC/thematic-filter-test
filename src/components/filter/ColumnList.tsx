import React, { useState } from 'react';
import { DropdownItem, Tooltip } from 'reactstrap';
import { v4 as uuidv4 } from 'uuid';

const ColumnList = ({
    column,
    filterState,
    setFilterState,
}: {
    column: FilterStore.ColumnItem;
    filterState: FilterStore.State;
    setFilterState: any;
}) => {
    const [tooltipState, setTooltipState] = useState(false);

    const { filterList } = filterState;

    const addToFilterList = (filterName: string) => {
        setFilterState({
            ...filterState,
            filterList: [
                ...filterList,
                {
                    id: uuidv4(),
                    name: filterName,
                    type: 0,
                },
            ],
        });
    };

    return (
        <>
            <DropdownItem
                id={`Tooltip-${column.sampleHeader}`}
                onMouseEnter={() => setTooltipState(!tooltipState)}
                onClick={() => addToFilterList(column.sampleHeader)}>
                {column.sampleHeader}
            </DropdownItem>
            <Tooltip
                className='tooltip-item'
                autohide={false}
                placement={'right'}
                isOpen={tooltipState}
                target={`Tooltip-${column.sampleHeader}`}
                toggle={() => setTooltipState(!tooltipState)}>
                <h6>Sample Data</h6>
                {column.sample.slice(0, 5).map((item) => (
                    <ul key={uuidv4()}>
                        <li title={item}>{item}</li>
                    </ul>
                ))}
            </Tooltip>
        </>
    );
};

export default ColumnList;
