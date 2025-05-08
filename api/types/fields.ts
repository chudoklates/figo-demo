type FieldType = {
  input_options: {
    values?: any[];
    min_selected?: number;
    max_selected?: number;
    allowed_types?: string[];
    max_length?: number;
    min_length?: number;
  };
  id: string;
  name: string;
  tech_name: string;
  input_type: string;
  is_required: boolean;
  ui_config: {
    helper_text: string;
    input_control: string;
    label: string;
    options: {
      value: any;
      label: string;
    }[];
  };
  conditions: {
    type: string;
    payload: string;
  }[];
};

type ObjectType = {
  id: string;
  name: string;
  tech_name: string;
  shared_instances_enabled: boolean;
  fields: FieldType[];
};

export interface SimpleField<K> {
  id: string;
  simpleValue: K;
  my_access: string;
  field_type: FieldType;
  __typename: string;
}

export interface ObjectField {
  id: string;
  objectValue: {
    id_object: string;
    fields: SimpleField<any>[];
  };
  my_access?: string;
  field_type: FieldType;
  object_type: ObjectType;
  __typename: string;
}

export interface ObjectSetField {
  id: string;
  objectSetValue: {
    id_object: string;
    fields: SimpleField<any>[];
  }[];
  my_access?: string;
  field_type: FieldType;
  object_type: ObjectType;
  __typename: string;
}

export type Field<K> = SimpleField<K> | ObjectField | ObjectSetField;
