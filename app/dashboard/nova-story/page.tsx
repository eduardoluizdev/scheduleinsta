import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { createStory } from "@/app/actions/stories";

export default async function NovaStoryPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  async function handleSubmit(formData: FormData) {
    "use server";

    const content = formData.get("content") as string;
    const scheduledAt = formData.get("scheduledAt") as string;

    if (!content || !scheduledAt) {
      return;
    }

    await createStory({
      content,
      scheduledAt: new Date(scheduledAt),
    });

    redirect("/dashboard");
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 dark:from-gray-900 dark:via-purple-950 dark:to-gray-900">
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <Link href="/dashboard">
          <Button variant="ghost" className="mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar
          </Button>
        </Link>

        <Card>
          <CardHeader>
            <CardTitle>Agendar Nova Story</CardTitle>
          </CardHeader>
          <CardContent>
            <form action={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="content">Conteúdo da Story</Label>
                <Input
                  id="content"
                  name="content"
                  placeholder="Descrição ou texto da story..."
                  required
                />
                <p className="text-sm text-muted-foreground">
                  Descreva o conteúdo da sua story
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="scheduledAt">Data e Hora</Label>
                <Input
                  id="scheduledAt"
                  name="scheduledAt"
                  type="datetime-local"
                  required
                />
                <p className="text-sm text-muted-foreground">
                  Escolha quando sua story será publicada
                </p>
              </div>

              <div className="flex gap-4">
                <Button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                >
                  Agendar Story
                </Button>
                <Link href="/dashboard" className="flex-1">
                  <Button type="button" variant="outline" className="w-full">
                    Cancelar
                  </Button>
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="text-sm">ℹ️ Nota</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground space-y-2">
            <p>• Sua story será salva e agendada para o horário escolhido</p>
            <p>
              • Para publicar automaticamente no Instagram, você precisará
              configurar as permissões do Facebook/Instagram
            </p>
            <p>
              • Por enquanto, as stories ficam salvas no sistema para você
              gerenciar
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

