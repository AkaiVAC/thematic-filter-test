import { atom } from 'recoil';

export const filterList = atom<FilterStore.FilterList>({
    key: 'FilterList',
    default: [],
});

export const filterColumns = atom<Array<FilterStore.ColumnItem>>({
    key: 'FilterColumns',
    default: [],
});

export const editFilterModal = atom<boolean>({
    key: 'EditFilterModal',
    default: false,
});

export const editedFilter = atom<FilterStore.FilterListItemType>({
    key: 'EditedFilter',
    default: {} as FilterStore.FilterListItemType,
});
