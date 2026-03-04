import NextAuth, { NextAuthOptions } from "next-auth";
import AzureADProvider from "next-auth/providers/azure-ad";
import { db } from "@/db";
import { UsuarioTable } from "@/db/schemas/usuario";
import { eq } from "drizzle-orm";

// -----------------------------------------------------------------------------
// IMPORTANTE: DEBES MODIFICAR ESTA LISTA CON TUS DOMINIOS PERMITIDOS
// -----------------------------------------------------------------------------
const ALLOWED_DOMAINS = ["okalexiiisgmail.onmicrosoft.com"];

export const authOptions: NextAuthOptions = {
  providers: [
    AzureADProvider({
      clientId: process.env.AZURE_AD_CLIENT_ID!,
      clientSecret: process.env.AZURE_AD_CLIENT_SECRET!,
      tenantId: process.env.AZURE_AD_TENANT_ID!,
      authorization: {
        params: {
          scope: "openid profile email User.Read",
        },
      },
      // Añadir este bloque para mapear el perfil
      profile(profile) {
        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          image: null, // Opcional: si tienes una URL de imagen de perfil
        };
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async signIn({ user, account, profile }) {
      console.log(user, account, profile);
      if (!user.email) {
        console.error("No se recibió email del proveedor de autenticación.");
        return false;
      }

      const userDomain = user.email.split("@")[1];

      // 1. Verificar si el dominio está permitido
      if (!ALLOWED_DOMAINS.includes(userDomain)) {
        console.warn(
          `Intento de inicio de sesión bloqueado para dominio no permitido: ${userDomain}`,
        );
        return false;
      }

      // 2. Verificar si el usuario existe en la base de datos
      const userInDb = await db
        .select()
        .from(UsuarioTable)
        .where(eq(UsuarioTable.email, user.email.toLowerCase()));

      // Si el usuario no existe en la BD, no le permitimos iniciar sesión.
      if (userInDb.length === 0) {
        console.warn(
          `Intento de inicio de sesión bloqueado para usuario no registrado: ${user.email}`,
        );
        return false;
      }

      // Si pasa ambas validaciones, permitimos el inicio de sesión.
      return true;
    },

    async jwt({ token, user }) {
      // Este callback se ejecuta después de signIn.
      // Aquí, enriquecemos el token con el rol y el id de nuestra base de datos.
      if (user) {
        const userInDb = await db
          .select({
            id: UsuarioTable.id,
            rol: UsuarioTable.rol,
          })
          .from(UsuarioTable)
          .where(eq(UsuarioTable.email, user.email!.toLowerCase()));

        if (userInDb.length > 0) {
          token.id = userInDb[0].id;
          token.role = userInDb[0].rol;
        }
      }
      return token;
    },

    async session({ session, token }) {
      // Aquí pasamos los datos del token a la sesión del cliente.
      if (session.user) {
        session.user.id = token.id as number;
        session.user.role = token.role as string;
      }
      return session;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
