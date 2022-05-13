import React, { useState } from 'react';
import { DropdownItem, Tooltip } from 'reactstrap';
import { useRecoilState } from 'recoil';
import { v4 as uuidv4 } from 'uuid';
import filterStore from '../../stores/filterStore';

const ColumnItem = ({ column }: { column: FilterStore.ColumnItem }) => {
    const [tooltipState, setTooltipState] = useState(false);
    const [filterState, setFilterState] = useRecoilState(filterStore);

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

export default ColumnItem;
