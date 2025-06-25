import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { supabase } from "../../../../lib/supabase";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async signIn({ user }) {
      // Check if user exists in Supabase
      const { data, error } = await supabase
        .from("users")
        .select("id")
        .eq("email", user.email)
        .single();

      if (!data) {
        // Insert new user
        await supabase.from("users").insert([
          {
            email: user.email,
            name: user.name,
            image: user.image,
            created_at: new Date().toISOString(),
          },
        ]);
      }
      return true;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST }; 