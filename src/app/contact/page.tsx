import PageTransition from "@/components/PageTransition";
import ContactForm from "../../components/ContactForm";

export default function ContactPage() {
  return (
    <PageTransition>
      <main className="container mx-auto p-8">
        <h1 className="text-4xl font-bold text-center">Hablemos</h1>
        <p className="text-lg text-gray-600 text-center mt-2">
          ¿Tienes una idea o un proyecto en mente? Contáctame.
        </p>
        <ContactForm />
      </main>
    </PageTransition>
  );
}