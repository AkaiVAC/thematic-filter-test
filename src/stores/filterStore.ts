import { atom } from 'recoil';

const filterStore = atom<FilterStore.State>({
    key: 'Filter',
    default: {
        filterList: [],
        synopsisData: { columns: [] },
    },
});

export default filterStore;
