"use client";

import { Icon } from "@/components/ui/icon";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SubmitButton } from "@/components/ui/submit-button";
import { useFormState } from "react-dom";
import {
  createCategory,
  updateCategory,
  type CategorySchema,
} from "../manage-category/actions";

interface ManageCategoryFormProps {
  initialData: CategorySchema | null;
}

export default function ManageCategoryForm({
  initialData,
}: ManageCategoryFormProps) {
  const initialState = { message: null, errors: {} };
  const [state, dispatch] = useFormState(
    !initialData ? createCategory : updateCategory,
    initialState,
  );

  const BUTTON_CONTENT = !initialData ? "Add category" : "Edit category";
  const BUTTON_ICON = !initialData ? <Icon.plus /> : <Icon.edit />;

  return (
    <form action={dispatch}>
      <input type="hidden" name="id" defaultValue={initialData?.id} />
      <div className="grid grid-cols-2">
        <div className="flex flex-col gap-2">
          <Label htmlFor="name">Category name</Label>
          <Input
            name="name"
            defaultValue={initialData?.name}
            aria-describedby="name-error"
          />
          <div id="name-error" aria-live="polite">
            {state.errors?.name?.map((error: string) => (
              <p className="text-primary" key={error}>
                {error}
              </p>
            ))}
          </div>
          <div className="flex justify-end">
            <SubmitButton icon={BUTTON_ICON}>{BUTTON_CONTENT}</SubmitButton>
          </div>
        </div>
      </div>
    </form>
  );
}
