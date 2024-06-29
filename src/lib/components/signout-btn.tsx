import { signOut } from "@/auth";

const SignOut = () => {
  return (
    <form
      action={async () => {
        "use server";
        try {
          await signOut();
          return;
        } catch (error) {
          throw error;
        }
      }}
    >
      <button type="submit">Sign out</button>
    </form>
  );
};

export default SignOut;
