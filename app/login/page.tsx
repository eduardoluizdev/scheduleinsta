import { signIn } from "@/auth";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Instagram } from "lucide-react";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-100 via-pink-50 to-orange-100 dark:from-purple-950 dark:via-pink-950 dark:to-orange-950 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-3xl font-bold tracking-tight">
            Schedule Stories
          </CardTitle>
          <CardDescription className="text-base">
            Agende suas stories do Instagram de forma simples e eficiente
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground text-center">
              Faça login com sua conta do Facebook para começar a agendar suas
              stories
            </p>
          </div>
          <form
            action={async () => {
              "use server";
              await signIn("facebook", { redirectTo: "/dashboard" });
            }}
          >
            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
              size="lg"
            >
              <Instagram className="mr-2 h-5 w-5" />
              Entrar com Facebook
            </Button>
          </form>
          <div className="text-xs text-center text-muted-foreground">
            <p>
              Ao fazer login, você concorda com nossos Termos de Serviço e
              Política de Privacidade
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
