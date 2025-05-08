import type { FormikConfig } from "formik";

export type SubmitFunction<K> = FormikConfig<K>["onSubmit"];
