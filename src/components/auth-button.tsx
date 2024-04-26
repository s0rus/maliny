import {
  ClerkLoaded,
  ClerkLoading,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import { Button } from "./ui/button";
import { Icon } from "./ui/icon";
import { Skeleton } from "./ui/skeleton";

export default function AuthButton() {
  return (
    <>
      <ClerkLoading>
        <Skeleton className="h-10 w-10 rounded-md" />
      </ClerkLoading>
      <ClerkLoaded>
        <SignedIn>
          <UserButton
            appearance={{
              elements: {
                userButtonAvatarBox: "w-10 h-10 rounded-md",
              },
            }}
          />
        </SignedIn>
        <SignedOut>
          <SignInButton mode="modal">
            <Button variant="outline" size="icon">
              <Icon.user />
            </Button>
          </SignInButton>
        </SignedOut>
      </ClerkLoaded>
    </>
  );
}
