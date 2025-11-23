import { Dispatch, SetStateAction } from "react";

export function createFormUpdater<FormType>(
  setForm: Dispatch<SetStateAction<FormType>>
) {
  return function updateForm<K extends keyof FormType>(
    key: K,
    value: FormType[K]
  ) {
    setForm((prev) => ({ ...prev, [key]: value }));
  };
}
