import React, { useEffect, useState } from 'react';
import {
    Button,
    Form,
    Label,
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader,
} from 'reactstrap';
import { useRecoilState, useRecoilValue } from 'recoil';
import { v4 as uuidv4 } from 'uuid';
import {
    filterList,
    editFilterModal,
    editedFilter,
} from '../../stores/filterStore';

const EditFilterModal = () => {
    const scoreTypes = ['Average', 'NPS', 'Threshold'];
    const filter = useRecoilValue(editedFilter);
    const [scoreState, setScoreState] = useState(filter.scoreType);
    const [filters, setFilters] = useRecoilState(filterList);
    const [modalState, setModalState] = useRecoilState(editFilterModal);

    const changeScoreType = () => {
        const updatedFilter = { ...filter, scoreType: scoreState };
        setFilters(
            filters.map((row) => (row.id === filter.id ? updatedFilter : row))
        );
    };

    useEffect(() => {}, [scoreState]);

    return (
        <Modal isOpen={modalState}>
            <ModalHeader>Edit Filter</ModalHeader>
            <Form>
                <ModalBody>
                    <Label>Score Type</Label>
                    <br />
                    <select
                        className='dropdown-toggle btn btn-outline-secondary'
                        title='Select filter type'
                        onChange={(e) => setScoreState(e.target.selectedIndex)}
                        value={scoreState}>
                        {scoreTypes.map((score: string, index: number) => (
                            <option key={uuidv4()} value={index}>
                                {score}
                            </option>
                        ))}
                    </select>
                </ModalBody>
                <ModalFooter>
                    <Button
                        outline
                        color='secondary'
                        type='reset'
                        onClick={() => {
                            setScoreState(filter.scoreType);
                            setModalState(false);
                        }}>
                        Cancel
                    </Button>
                    <Button
                        color='primary'
                        onClick={() => {
                            changeScoreType();
                            setModalState(false);
                        }}>
                        Save
                    </Button>
                </ModalFooter>
            </Form>
        </Modal>
    );
};

export default EditFilterModal;
