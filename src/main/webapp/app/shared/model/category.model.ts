export interface ICategory {
    data: any;
    code: string;
    category_id?: string;
    category_name?: string;
    category_description?: string;
    category_root?: string;
    category_child?: string;
    category_parent?: string;
    display_in_slider?: boolean;
    created_date?: string;
    created_by?: string;
    updated_date?: string;
    updated_by?: string
}

export interface IPagination {
    page_num: number;
    page_size: number;
    total_page: number;
    total_item: number
}

export const defaultValue: Readonly<ICategory> = {
    category_id: '',
    category_name: '',
    category_description: '',
    // category_root: null,
    category_child: '',
    category_parent: '',
    display_in_slider: false,
    created_date: '',
    created_by: '',
    updated_date: '',
    updated_by: '',
    code: "",
    data: undefined
};
