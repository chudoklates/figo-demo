import { Field, ObjectField, ObjectSetField } from "@/graphql/types/fields";

export function fieldIsObjectType(field: Field<any>): field is ObjectField {
  return field.field_type.input_type === "OBJECT";
}

export function fieldIsObjectSetType(
  field: Field<any>
): field is ObjectSetField {
  return field.field_type.input_type === "OBJECT_SET";
}

export function getFieldValue<X>(
  fields: Array<Field<any>>,
  fieldName: string
): X | undefined {
  const field = fields?.find(
    (field) => field.field_type?.tech_name === fieldName
  );

  if (!field) return undefined;

  if (fieldIsObjectType(field) || fieldIsObjectSetType(field)) {
    console.error(`Field is not a scalar type: ${fieldName}`);
    return undefined;
  }

  return field?.simpleValue;
}

export function getAllFieldValues(fields: Array<Field<any>>): {} {
  const values = Object.fromEntries(
    fields.map((field) => {
      const name = field.field_type.tech_name;
      const value = fieldIsObjectType(field)
        ? getAllFieldValues(field.objectValue.fields)
        : fieldIsObjectSetType(field)
        ? field.objectSetValue.map((setField) =>
            getAllFieldValues(setField.fields)
          )
        : field.simpleValue;

      return [name, value];
    })
  );

  return values;
}

export function getFieldOptions(
  parent: {} & { fields: Array<Field<any>> },
  fieldName: string
): Field<any>["field_type"]["ui_config"]["options"] | undefined {
  return parent?.fields?.find(
    (field) => field.field_type?.tech_name === fieldName
  )?.field_type?.ui_config?.options;
}

export function getObjectFieldValue<K extends {}>(
  fields: Array<Field<any>>,
  objectName: string
): K | undefined {
  const objectField = fields?.find(
    (field) => field.field_type?.tech_name === objectName
  );

  if (!objectField) return undefined;

  if (!fieldIsObjectType(objectField)) {
    console.error(`Field is not an object type: ${objectName}`);
    return undefined;
  }

  if (!objectField.objectValue) {
    return undefined;
  }

  const values = getAllFieldValues(objectField.objectValue.fields) as K;

  return values;
}

export function getObjectSetFieldValue<K extends {}>(
  fields: Array<Field<any>>,
  objectSetName: string
): K[] | undefined {
  const objectSetField = fields?.find(
    (field) => field.field_type?.tech_name === objectSetName
  );

  if (!objectSetField) return undefined;

  if (!fieldIsObjectSetType(objectSetField)) {
    console.error(`Field is not an object set type: ${objectSetName}`);
    return undefined;
  }

  if (!objectSetField.objectSetValue) {
    return undefined;
  }

  const values = objectSetField.objectSetValue.map(
    (setField) => getAllFieldValues(setField.fields) as K
  );

  return values;
}
