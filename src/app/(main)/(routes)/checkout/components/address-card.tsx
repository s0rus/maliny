import { getAddressList } from "@/app/api/addresses/get-address-list";
import { ROUTES } from "@/app/api/routes";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Icon } from "@/components/ui/icon";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { AddressForm } from "./address-form";

export async function AddressCard() {
  const { userId } = auth();

  if (!userId) {
    redirect(ROUTES.HOME);
  }

  const addressList = await getAddressList({ userId });

  return (
    <Card>
      <CardHeader className="text-xl font-bold">Address</CardHeader>
      <CardContent>
        <div className="rounded-sm border border-primary px-4 py-2">
          {addressList.length <= 0 ? (
            <AddressForm />
          ) : (
            <>
              <div className="flex items-center justify-between">
                <p className="font-bold">Jan Kowalski</p>
                <Button size="sm" variant="ghost" className="inline-flex gap-2">
                  <Icon.pencil className="h-4 w-4" />
                  Change
                </Button>
              </div>
              <div>
                <p>Sigma 221</p>
                <p>69-420 Sigma</p>
                <p>696 969 420</p>
                <p>ligma@gmail.com</p>
              </div>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
