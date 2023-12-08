export interface ISpecifications {
    specifications_id?: string;
    product_id?: string;
    content?: string;
    created_date?: string;
    created_by?: string;
    updated_date?: string;
    updated_by?: string;
    selected_file?: File;
    SpecificationList?: any
}
  
export const defaultValue: Readonly<ISpecifications> = {
  specifications_id: "",
  product_id: "",
  content: "",
  created_date: "",
  created_by: "",
  updated_date: "",
  updated_by: "",
  selected_file: null,
}

export interface ISpecificationsFile {
  product_id?: string;
  selected_file?: File
}

export const defaultValueFile: Readonly<ISpecificationsFile> = {
  product_id: "",
  selected_file: null,
}

export interface ISpecification {
  specification_name: string;
  specification_value: string;
}

export interface ISpecificationList {
  specification: ISpecification;
}