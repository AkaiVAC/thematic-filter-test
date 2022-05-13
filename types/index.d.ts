declare module FilterStore {
    type FilterListItemType = {
        id: string;
        name: string;
        type: number;
        scoreType?: number;
    };

    type ColumnItem = {
        sampleHeader: string;
        sample: Array<string>;
    };

    type State = {
        filterList: Array<FilterListItemType>;
        synopsisData: {
            columns: Array<ColumnItem>;
        };
    };
}
