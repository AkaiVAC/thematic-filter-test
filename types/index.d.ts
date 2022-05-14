declare module FilterStore {
    type FilterDragEvent = DragEventHandler<HTMLElement> & {
        currentTarget: Record<'id', string>;
    };

    type FilterListItemType = {
        id: string;
        name: string;
        type: number;
        scoreType?: number;
        order: number;
    };

    type FilterList = Array<FilterListItemType>;

    type ColumnItem = {
        sampleHeader: string;
        sample: Array<string>;
    };

    type FilterType = 'Default' | 'Date' | 'Score' | 'Search';

    type ScoreType = 'Average' | 'NPS' | 'Threshold';
}
