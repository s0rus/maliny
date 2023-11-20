"use client";

import { Icon } from "@/components/ui/icon";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SubmitButton } from "@/components/ui/submit-button";

export function AddressForm() {
  return (
    <form>
      <div>
        <div className="flex flex-col gap-2">
          <div className="flex gap-2">
            <div>
              <Label htmlFor="firstName">First name</Label>
              <Input name="firstName" aria-describedby="firstName-error" />
            </div>
            <div>
              <Label htmlFor="lastName">Last name</Label>
              <Input name="lastName" aria-describedby="lastName-error" />
            </div>
          </div>
          <div className="flex gap-2">
            <div>
              <Label htmlFor="zipcode">Zip-code</Label>
              <Input name="zipcode" aria-describedby="zipcode-error" />
            </div>
            <div>
              <Label htmlFor="city">City</Label>
              <Input name="city" aria-describedby="city-error" />
            </div>
          </div>
          <div></div>
          <div className="flex">
            <div>
              <Label htmlFor="phoneNumber">Phone number</Label>
              <Input name="phoneNumber" aria-describedby="phoneNumber-error" />
            </div>
          </div>
          <div className="flex">
            <div>
              <Label htmlFor="email">E-mail</Label>
              <Input name="email" aria-describedby="email-error" />
            </div>
          </div>
          <div className="mt-4 flex">
            <SubmitButton icon={<Icon.checkmark />}>Add address</SubmitButton>
          </div>
        </div>
      </div>
    </form>
  );
}
