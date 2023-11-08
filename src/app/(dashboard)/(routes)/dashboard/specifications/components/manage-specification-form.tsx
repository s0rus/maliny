"use client";

import { Icon } from "@/components/ui/icon";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SubmitButton } from "@/components/ui/submit-button";
import { useFormState } from "react-dom";
import {
  createSpecification,
  updateSpecification,
  type SpecificationSchema,
} from "../manage-specifications/actions";

interface ManageCategoryFormProps {
  initialData: SpecificationSchema | null;
}

export default function ManageCategoryForm({
  initialData,
}: ManageCategoryFormProps) {
  const initialState = { message: null, errors: {} };
  const [state, dispatch] = useFormState(
    !initialData ? createSpecification : updateSpecification,
    initialState,
  );

  const BUTTON_CONTENT = !initialData ? "Add parameter" : "Edit parameter";
  const BUTTON_ICON = !initialData ? <Icon.plus /> : <Icon.edit />;

  return (
    <form action={dispatch}>
      <input type="hidden" name="id" defaultValue={initialData?.id} />
      <div className="grid grid-cols-2">
        <div className="flex flex-col gap-2">
          <Label htmlFor="name">Parameter name</Label>
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
          <Label htmlFor="unit">Parameter unit (optional)</Label>
          <Input
            name="unit"
            defaultValue={initialData?.unit}
            aria-describedby="unit-error"
          />
          <div id="unit-error" aria-live="polite">
            {state.errors?.unit?.map((error: string) => (
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
