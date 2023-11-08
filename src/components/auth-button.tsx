import {
  ClerkLoaded,
  ClerkLoading,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import { Skeleton } from "./ui/skeleton";

export default function AuthButton() {
  return (
    <>
      <ClerkLoading>
        <Skeleton className="h-10 w-10 rounded-md" />
      </ClerkLoading>
      <ClerkLoaded>
        <SignedIn>
          <UserButton />
        </SignedIn>
        <SignedOut>
          <SignInButton />
        </SignedOut>
      </ClerkLoaded>
    </>
  );
}
