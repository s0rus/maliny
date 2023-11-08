"use client";

import { Icon } from "@/components/ui/icon";
import { capitalizeWord } from "@/lib/utils";

interface UseEntityActionResponseProps {
  isBeingEdited: boolean;
  entityName: string;
}

export function useEntityActionResponse({
  isBeingEdited,
  entityName,
}: UseEntityActionResponseProps) {
  return {
    MUTATION_METHOD: isBeingEdited ? "PUT" : "POST",

    TOAST_TITLE: `${capitalizeWord(entityName)} ${
      isBeingEdited ? "edited" : "added"
    }`,
    TOAST_DELETED_TITLE: `${capitalizeWord(entityName)} deleted`,
    TOAST_ERROR_TITLE: "Whoops! Something went wrong",

    TOAST_DESCRIPTION: (specificEntityName: string) =>
      `'${specificEntityName}' has been ${
        isBeingEdited ? "edited" : "added"
      } successfully!`,
    TOAST_DELETED_DESCRIPTION: (specificEntityName: string) =>
      `'${specificEntityName}' has been deleted successfully!`,
    TOAST_ERROR_DESCRIPTION: (specificEntityName: string) =>
      `'${specificEntityName}' could not be ${
        isBeingEdited ? "edited" : "added"
      }!`,
    TOAST_DELETION_ERROR_DESCRIPTION: (specificEntityName: string) =>
      `'${specificEntityName}' could not be deleted.`,

    BUTTON_ICON: isBeingEdited ? <Icon.edit /> : <Icon.plus />,
    BUTTON_TITLE: isBeingEdited
      ? `Edit ${entityName.toLowerCase()}`
      : `Add ${entityName.toLowerCase()}`,

    BUTTON_DELETE_ICON: <Icon.delete />,
    BUTTON_DELETE_TITLE: `Delete ${entityName.toLowerCase()}`,
  };
}
