import { gql } from "@apollo/client";

export const SimpleFieldData = gql`
  fragment SimpleFieldData on SimpleField {
    id
    simpleValue: value
    field_type {
      input_options
      id
      name
      tech_name
      input_type
      is_required
      ui_config {
        helper_text
        input_control
        label
        options {
          value
          label
        }
      }
      conditions {
        type
        payload
      }
    }
  }
`;

export const SimpleFieldWithVariantsData = gql`
  fragment SimpleFieldWithVariantsData on SimpleField {
    id
    simpleValue: value
    field_type {
      input_options
      id
      name
      tech_name
      input_type
      is_required
      is_variant_identifier
      is_variant_specific
      ui_config {
        helper_text
        input_control
        label
        options {
          value
          label
        }
      }
      conditions {
        type
        payload
      }
    }
  }
`;

export const ObjectFieldData = gql`
  fragment ObjectFieldData on ObjectField {
    id
    objectValue: value {
      id_object
      fields {
        ...SimpleFieldData
      }
    }
    field_type {
      id
      name
      tech_name
      input_type
      input_options
      category
    }
    object_type {
      id
      name
      tech_name
      shared_instances_enabled
      fields {
        id
        name
        tech_name
        input_type
        input_options
        category
      }
    }
  }
  ${SimpleFieldData}
`;

export const ObjectFieldWithVariantsData = gql`
  fragment ObjectFieldWithVariantsData on ObjectField {
    id
    objectValue: value {
      id_object
      fields {
        ...SimpleFieldData
      }
    }
    field_type {
      id
      name
      tech_name
      input_type
      is_dynamic
      is_variant_identifier
      is_variant_specific
      ui_config {
        helper_text
        input_control
        label
        options {
          value
          label
        }
      }
      input_options
      is_required
      is_nullable
      category
      conditions {
        type
        payload
      }
    }
    object_type {
      id
      name
      fields {
        id
        name
        tech_name
        input_type
        is_variant_identifier
        is_variant_specific
        ui_config {
          helper_text
          input_control
          label
          options {
            value
            label
          }
        }
        conditions {
          type
          payload
        }
        input_options
      }
    }
  }
  ${SimpleFieldData}
`;

export const ObjectSetFieldData = gql`
  fragment ObjectSetFieldData on ObjectSetField {
    id
    objectSetValue: value {
      id_object
      fields {
        ...SimpleFieldData
      }
    }
    field_type {
      id
      name
      tech_name
      input_type
      input_options
      category
    }
    object_type {
      id
      name
      tech_name
      shared_instances_enabled
      fields {
        id
        name
        tech_name
        input_type
        input_options
        category
      }
    }
  }
  ${SimpleFieldData}
`;
