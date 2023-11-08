"use client";

import { useEntityActionResponse } from "@/app/(dashboard)/hooks/use-entity-action-response";
import { Button } from "@/components/ui/button";
import { DropzoneFormField } from "@/components/ui/dropzone-form-field";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Icon } from "@/components/ui/icon";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { SubmitButton } from "@/components/ui/submit-button";
import { TypographyH4 } from "@/components/ui/typography/typography-h4";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { type Category, type Specification } from "@prisma/client";
import { useFormState } from "react-dom";
import { useFieldArray, useForm } from "react-hook-form";
import { createProduct, updateProduct } from "../manage-product/actions";
import { ProductSchema } from "../manage-product/schema";

interface AddProductFormProps {
  initialData: ProductSchema | null;
  categories: Category[];
  specParameters: Specification[];
}

export default function ManageProductForm({
  initialData,
  categories,
  specParameters,
}: AddProductFormProps) {
  const { BUTTON_TITLE } = useEntityActionResponse({
    entityName: "product",
    isBeingEdited: !!initialData,
  });

  const form = useForm<ProductSchema>({
    resolver: zodResolver(ProductSchema),
    defaultValues: initialData ?? {
      name: "",
      description: "",
      price: 0,
      stock: 0,
      categoryId: "",
      specifications: [
        {
          specId: "",
          value: "",
          unit: "N/A",
        },
      ],
      images: [],
    },
  });

  const {
    fields: specFields,
    append: appendSpecField,
    remove: removeSpecField,
  } = useFieldArray<ProductSchema>({
    name: "specifications",
    control: form.control,
  });

  const specArray = form.watch("specifications");

  const initialState = { message: null, errors: {} };
  const [, dispatch] = useFormState(
    !initialData ? createProduct : updateProduct,
    initialState,
  );

  return (
    <div className="mb-8 flex flex-col gap-8">
      <Form {...form}>
        <form
          action={() => dispatch(form.getValues() as unknown as FormData)}
          className="flex flex-col gap-8"
        >
          <div className="flex flex-col gap-2">
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price</FormLabel>
                    <FormControl>
                      <Input type="number" step="0.10" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="stock"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Stock</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="categoryId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category.id} value={category.id}>
                            {category.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DropzoneFormField<ProductSchema> withoutBigPreview />
            </div>
          </div>
          <Separator />
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-4">
              <TypographyH4>Specification</TypographyH4>
              <Button
                type="button"
                className="inline-flex gap-2"
                onClick={() =>
                  appendSpecField({ specId: "", value: "", unit: "N/A" })
                }
                disabled={specParameters.length === specFields.length}
              >
                <Icon.plus /> Add parameter
              </Button>
            </div>
            <div className="grid grid-cols-2">
              {specFields.map((specField, index) => (
                <div
                  key={specField.id}
                  className={cn(
                    "flex justify-between gap-4 py-2",
                    index % 2 === 0 ? "border-r-2 pr-4" : "pl-4",
                  )}
                >
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => removeSpecField(index)}
                    className="self-end"
                    disabled={specFields.length - 1 < 1}
                  >
                    <Icon.x />
                  </Button>
                  <FormField
                    control={form.control}
                    name={`specifications.${index}.specId`}
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormLabel>Spec parameter</FormLabel>
                        <Select
                          onValueChange={(e) => {
                            field.onChange(e);
                            form.setValue(
                              `specifications.${index}.unit`,
                              specParameters.find(
                                (v) =>
                                  v.id ===
                                  form.getValues(
                                    `specifications.${index}.specId`,
                                  ),
                              )?.unit ?? "N/A",
                            );
                          }}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {specParameters
                              .filter(
                                (specParameter) =>
                                  specParameter.id === field.value ||
                                  !specArray.some(
                                    (spec) => spec.specId === specParameter.id,
                                  ),
                              )
                              .map((specParameter) => (
                                <SelectItem
                                  key={specParameter.id}
                                  value={specParameter.id}
                                >
                                  {specParameter.name}{" "}
                                  {specParameter.unit && (
                                    <span>({specParameter.unit})</span>
                                  )}
                                </SelectItem>
                              ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`specifications.${index}.value`}
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormLabel>Spec parameter value</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`specifications.${index}.unit`}
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormLabel>Unit</FormLabel>
                        <FormControl>
                          <Input
                            readOnly
                            value={field.value ? field.value : "N/A"}
                            disabled
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <SubmitButton icon={<Icon.addProduct />}>
              {BUTTON_TITLE}
            </SubmitButton>
          </div>
        </form>
      </Form>
    </div>
  );
}
