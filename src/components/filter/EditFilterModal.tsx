import React, { useState } from 'react';
import {
    Button,
    Form,
    Label,
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader,
} from 'reactstrap';
import { atom, useRecoilState } from 'recoil';
import { v4 as uuidv4 } from 'uuid';
import filterStore from '../../stores/filterStore';

export const modalAtom = atom({
    key: 'editFilterModal',
    default: false,
});

const EditFilterModal = ({
    filter,
}: {
    filter: FilterStore.FilterListItemType;
}) => {
    const [modalState, setModalState] = useRecoilState(modalAtom);
    const [filterState, setFilterState] = useRecoilState(filterStore);

    const scoreTypes = ['Average', 'NPS', 'Threshold'];
    const [scoreState, setScoreState] = useState(0);

    const changeScoreType = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setScoreState(e.target.selectedIndex);
        setFilterState({
            ...filterState,
            filterList: [
                ...filterState.filterList,
                {
                    ...filter,
                    scoreType: scoreState,
                },
            ],
        });
    };

    return (
        <Modal isOpen={modalState}>
            <ModalHeader>Edit Filter</ModalHeader>
            <ModalBody>
                <Form>
                    <Label>Score Type</Label>
                    <br />
                    <select
                        className='dropdown-toggle btn btn-outline-secondary'
                        title='Select filter type'
                        onChange={(e) => changeScoreType(e)}>
                        {scoreTypes.map((score: string, index: number) => (
                            <option key={uuidv4()} value={index}>
                                {score}
                            </option>
                        ))}
                    </select>
                </Form>
            </ModalBody>
            <ModalFooter>
                <Button
                    outline
                    color='secondary'
                    onClick={() => setModalState(!modalState)}>
                    Cancel
                </Button>{' '}
                <Button
                    color='primary'
                    onClick={() => setModalState(!modalState)}>
                    Save
                </Button>
            </ModalFooter>
        </Modal>
    );
};

export default EditFilterModal;
