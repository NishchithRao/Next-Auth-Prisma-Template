import { AuthError } from "next-auth";
import React from "react";
import { signIn } from "@/auth";

const SignIn = () => {
  return (
    <div>
      <form
        action={async () => {
          "use server";

          try {
            await signIn("github", { redirectTo: "/" });
            return;
          } catch (error) {
            console.log({ error });

            throw error;
          }
        }}
      >
        <button type="submit">Sign In with Github</button>
      </form>
    </div>
  );
};

export default SignIn;
