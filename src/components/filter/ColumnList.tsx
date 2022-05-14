import React, { useState } from 'react';
import { DropdownItem, Tooltip } from 'reactstrap';
import { useRecoilState } from 'recoil';
import { v4 as uuidv4 } from 'uuid';
import { filterList } from '../../stores/filterStore';

import './styles/ColumnList.css';

const ColumnList = ({ column }: { column: FilterStore.ColumnItem }) => {
    const [tooltipState, setTooltipState] = useState(false);
    const [filters, setFilters] = useRecoilState(filterList);

    return (
        <>
            <DropdownItem
                id={`Tooltip-${column.sampleHeader}`}
                onMouseEnter={() => setTooltipState(!tooltipState)}
                onClick={() =>
                    setFilters([
                        ...filters,
                        {
                            id: uuidv4(),
                            name: column.sampleHeader,
                            type: 0,
                            order: filters.length,
                        },
                    ])
                }>
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
