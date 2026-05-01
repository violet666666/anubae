import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Wedding from "@/components/Wedding";
import Multimedia from "@/components/Multimedia";
import Videotron from "@/components/Videotron";
import KatalogTabs from "@/components/KatalogTabs";
import KatalogFoto from "@/components/KatalogFoto";
import KatalogVideo from "@/components/KatalogVideo";
import ContactForm from "@/components/ContactForm";
import DynamicSection from "@/components/DynamicSection";
import Footer from "@/components/Footer";
import { supabase } from "@/integrations/supabase/client";

type DynSection = {
  id: string;
  title: string;
  content: string;
  layout_type: string;
  image_url: string | null;
  background: string;
  sort_order: number;
  is_active: boolean;
};

const Index = () => {
  const [dynSections, setDynSections] = useState<DynSection[]>([]);

  useEffect(() => {
    supabase
      .from("dynamic_sections")
      .select("*")
      .eq("is_active", true)
      .order("sort_order", { ascending: true })
      .then(({ data }) => {
        if (data) setDynSections(data as DynSection[]);
      });
  }, []);

  return (
    <main>
      <Header />
      <Hero />
      <About />

      <Wedding />
      <Multimedia />
      <Videotron />
      <KatalogTabs />
      <KatalogFoto />
      <KatalogVideo />

      {dynSections.map((sec) => (
        <DynamicSection key={sec.id} section={sec} />
      ))}

      <ContactForm />
      <Footer />
    </main>
  );
};

export default Index;
